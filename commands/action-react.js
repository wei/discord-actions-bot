const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('action-react')
		.setDescription('Create an action that requires a reaction')
		.addRoleOption(option =>
			option.setName('role')
				.setDescription('Select a role that should complete the action')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('title')
				.setDescription('Enter the description of the action')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply('Actions React!');
	},
};
