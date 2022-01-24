const { Client } = require('discord.js');
const { getAllActionMessages } = require('../datastore');

/**
 *
 * @param {Client} client
 */
function customActions(client) {
	/**
	 * We need to do this in order to trigger messageReactionAdd and messageReactionRemove events.
	 */
	async function cacheExistingMessages() {
		for (const actionMessage of await getAllActionMessages()) {
			try {
				const guild = await client.guilds.fetch(actionMessage.guildId);
				const channel = await guild.channels.fetch(actionMessage.channelId);
				await channel.messages.fetch(actionMessage.actionMessageId);
			}
			catch (error) {
				// ignore if messages are deleted
			}
		}
	}

	return {
		cacheExistingMessages,
		renderActionReactMessage: require('./messageRenderer/action-react')(client),
		renderActionThreadMessage: require('./messageRenderer/action-thread')(client),
		renderActionPollMessage: require('./messageRenderer/action-poll')(client),
	};
}

module.exports = customActions;
