const { bold, italic } = require('@discordjs/builders');
const fetch = require('isomorphic-fetch');
const { getAllActionMessages } = require('../datastore');
const templates = require('./templates');

async function getRandomGif() {
	try {
		const response = await fetch(`https://g.tenor.com/v1/random?q=celebrate&limit=1&key=${process.env.TENOR_API_KEY}`);
		const json = await response.json();
		return json.results[0].url;
	}
	catch (error) {
		return 'https://c.tenor.com/IErQHBRt6GIAAAAd/leonardo-dicaprio.gif';
	}
}

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

	/**
	 * Render Action React Message
	 *
	 * @param {import('../helpers/types').ActionMessage} actionMessage
	 */
	async function renderActionsReactMessage(actionMessage) {
		try {
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
				return `${bold(actionMessage.title)} ${role.toString()}\n${await getRandomGif()}`;
			}
			else {
				return `${bold(actionMessage.title)} ${role.toString()}\n${italic('Pending:')}\n${usersPending.map(u => `:white_small_square: ${u.toString()}`).join('\n')}`;
			}
		}
		catch (error) {
			console.error(error);
			return '';
		}
	}

	/**
	 * Render Action Thread Message
	 *
	 * @param {import('../helpers/types').ActionMessage} actionMessage
	 */
	async function renderActionsThreadMessage(actionMessage) {
		try {
		// Get all members of role
			const guild = client.guilds.cache.get(actionMessage.guildId);
			await guild.members.fetch();
			const role = await guild.roles.fetch(actionMessage.roleId);

			const channel = guild.channels.cache.get(actionMessage.channelId);
			const thread = channel.threads.cache.get(actionMessage.actionMessageId);

			const usersInRole = role.members.map(m => m.user);
			const messagesInThread = await thread.messages.fetch();
			const userIdsResponded = messagesInThread.map(m => m.author.id);

			// Get users who are yet to respond
			const usersPending = usersInRole.filter(u => !userIdsResponded.includes(u.id));

			const template = templates[actionMessage.templateId] ?? '\n';

			if (usersPending.length === 0) {
				return `📑${bold(actionMessage.title)} ${role.toString()}\n${await getRandomGif()}`;
			}
			else {
				return `📑${bold(actionMessage.title)} ${role.toString()}${template}${italic('Pending:')}\n${usersPending.map(u => `:white_small_square: ${u.toString()}`).join('\n')}`;
			}
		}
		catch (error) {
			console.error(error);
			return '';
		}
	}

	return {
		cacheExistingMessages,
		renderActionsReactMessage,
		renderActionsThreadMessage,
	};
}

module.exports = customActions;
