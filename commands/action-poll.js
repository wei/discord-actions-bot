const { SlashCommandBuilder, bold } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { upsertActionMessage } = require('../datastore');
const { getLetterEmoji } = require('../helpers/utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('action-poll')
		.setDescription('Create an action that requires a vote by reaction')
		.addRoleOption(option =>
			option.setName('role')
				.setDescription('Select a role that should complete the action')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('title')
				.setDescription('Enter the title of the vote')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('options')
				.setDescription('Enter available options of the vote separated by commas')
				.setRequired(true)),
	/**
	 * Executes the command.
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const title = interaction.options.getString('title');
		const rawOptions = interaction.options.getString('options');

		await interaction.reply(`📑${bold(title)} ${role.toString()}`);

		const message = await interaction.fetchReply();
		await message.react(getLetterEmoji(0));

		/** @type {import('../helpers/types').ActionMessage} */
		const actionMessage = {
			actionMessageId: message.id,
			actionMessageType: 'action-poll',
			title,
			commandInput: rawOptions,
			guildId: message.guildId,
			channelId: message.channelId,
			roleId: role.id,
			timestamp: message.createdTimestamp,
		};

		const renderedMessage = await interaction.client.customActions.renderActionPollMessage(actionMessage);
		await interaction.editReply(renderedMessage);
		await upsertActionMessage(actionMessage);

		// React with the option emojis in sequence
		const options = actionMessage.commandInput.trim().split(',').map(option => option.trim());
		for (let i = 0; i < options.length; i++) {
			const emoji = getLetterEmoji(i);
			if (emoji) {
				await message.react(emoji);
			}
		}
	},
};
