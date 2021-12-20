const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('action-thread')
		.setDescription('Create an action that requires a reply in a thread')
		.addRoleOption(option =>
			option.setName('role')
				.setDescription('Select a role that should complete the action')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('title')
				.setDescription('Enter the description of the action')
				.setRequired(true)),
	/**
	 * Executes the command.
	 *
	 * @param {CommandInteraction} interaction
	 */
	async execute(interaction) {
		await interaction.reply('Actions Thread!');
	},
};
