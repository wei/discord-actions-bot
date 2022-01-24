const { SlashCommandBuilder, bold } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { upsertActionMessage } = require('../datastore');

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
  /**
	 * Executes the command.
	 *
	 * @param {CommandInteraction} interaction
	 */
  async execute(interaction) {
    const role = interaction.options.getRole('role');
    const title = interaction.options.getString('title');

    await interaction.reply(`📑${bold(title)} ${role.toString()}`);

    const message = await interaction.fetchReply();
    await message.react('✅');

    /** @type {import('../helpers/types').ActionMessage} */
    const actionMessage = {
      actionMessageId: message.id,
      actionMessageType: 'action-react',
      title,
      guildId: message.guildId,
      channelId: message.channelId,
      roleId: role.id,
      timestamp: message.createdTimestamp,
    };

    const renderedMessage = await interaction.client.customActions.renderActionReactMessage(actionMessage);
    await interaction.editReply(renderedMessage);
    await upsertActionMessage(actionMessage);
  },
};
