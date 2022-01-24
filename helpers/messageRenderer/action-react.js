const { bold, italic } = require('@discordjs/builders');
const { Client, Message } = require('discord.js');
const { getRandomGif } = require('../utils');

/**
 *
 * @param {Client} client
 */
module.exports = function(client) {
  /**
	 * Render Action React Message
	 *
	 * @param {import('../helpers/types').ActionMessage} actionMessage
	 */
  return async function(actionMessage) {
    try {
      // Get all members of role
      const guild = client.guilds.cache.get(actionMessage.guildId);
      await guild.members.fetch();
      const role = await guild.roles.fetch(actionMessage.roleId);

      const channel = guild.channels.cache.get(actionMessage.channelId);
      /** @type {Message} */
      const message = await channel.messages.fetch(actionMessage.actionMessageId);

      const usersInRole = role.members.map(m => m.user).filter(u => !u.bot);
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
  };
};
