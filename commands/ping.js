const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  /**
	 * Executes the command.
	 *
	 * @param {CommandInteraction} interaction
	 */
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
