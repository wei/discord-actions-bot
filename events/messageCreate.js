const { Message } = require('discord.js');
const { getActionMessageById } = require('../datastore');

module.exports = {
	name: 'messageCreate',
	/**
	 * Executes the command.
	 *
	 * @param {Message} message
	 */
	async execute(message) {
		if (message.channel.isThread && !message.author.bot) {
			const actionMessage = await getActionMessageById(message.channel.id);
			if (actionMessage && actionMessage.actionMessageType === 'action-thread') {
				const renderedMessage = await message.client.customActions.renderActionsThreadMessage(actionMessage);

				const parentMessage = message.channel.messages.cache.get(actionMessage.actionMessageId);
				parentMessage.edit(renderedMessage);
			}
		}
	},
};
