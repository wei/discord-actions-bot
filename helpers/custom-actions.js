const { bold, italic } = require('@discordjs/builders');
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
		for (const actionMessage of getAllActionMessages()) {
			const guild = await client.guilds.fetch(actionMessage.guildId);
			const channel = await guild.channels.fetch(actionMessage.channelId);
			await channel.messages.fetch(actionMessage.actionMessageId);
		}
	}

	/**
	 * Render Action React Message
	 *
	 * @param {import('../helpers/types').ActionMessage} actionMessage
	 */
	async function renderActionsReactMessage(actionMessage) {
		// Get all members of role
		const guild = client.guilds.cache.get(actionMessage.guildId);
		await guild.members.fetch();
		const role = await guild.roles.fetch(actionMessage.roleId);

		const channel = guild.channels.cache.get(actionMessage.channelId);
		const message = channel.messages.cache.get(actionMessage.actionMessageId);

		const usersInRole = role.members.map(m => m.user);
		const usersReacted = message.reactions.cache.get('✅').users.cache;

		// Get users who are yet to react
		const usersPending = usersInRole.filter(u => !usersReacted.has(u.id));

		if (usersPending.length === 0) {
			return `${bold(actionMessage.title)} ${role.toString()}\n${italic('✅ All Done!')}`;
		}
		else {
			return `${bold(actionMessage.title)} ${role.toString()}\n${italic('Pending:')}\n${usersPending.map(u => `:white_small_square: ${u.toString()}`).join('\n')}`;
		}
	}

	return {
		cacheExistingMessages,
		renderActionsReactMessage,
	};
}

module.exports = customActions;
