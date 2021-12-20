const { MessageReaction, User } = require('discord.js');
const { getActionMessageById } = require('../datastore');

module.exports = {
	name: 'messageReactionAdd',
	/**
	 * Executes the command.
	 *
	 * @param {MessageReaction} reaction
	 * @param {User} user
	 */
	async execute(reaction, user) {
		if (reaction.partial) {
			try {
				await reaction.fetch();
			}
			catch (error) {
				console.error(error);
				return;
			}
		}
		if (reaction.emoji.name === '✅' && !user.bot) {
			const actionMessage = getActionMessageById(reaction.message.id);
			if (actionMessage && actionMessage.actionMessageType === 'action-react') {
				const renderedMessage = await reaction.client.customActions.renderActionsReactMessage(actionMessage);
				reaction.message.edit(renderedMessage);
			}
		}
	},
};
