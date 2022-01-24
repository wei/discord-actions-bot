const { bold, italic } = require('@discordjs/builders');
const { Client, Message, Collection } = require('discord.js');
const { getRandomGif, getLetterEmoji } = require('../utils');

/**
 *
 * @param {Client} client
 */
module.exports = function(client) {
  /**
	 * Render Action Poll Message
	 *
	 * @param {import('../helpers/types').ActionMessage} actionMessage
	 */
  return async function(actionMessage) {
    try {
      const options = actionMessage.commandInput?.trim().split(',').map(option => option.trim());
      const reactions = options.map((_, index) => getLetterEmoji(index)).filter(r => !!r);

      // Get all members of role
      const guild = client.guilds.cache.get(actionMessage.guildId);
      await guild.members.fetch();
      const role = await guild.roles.fetch(actionMessage.roleId);

      const channel = guild.channels.cache.get(actionMessage.channelId);
      /** @type {Message} */
      const message = await channel.messages.fetch(actionMessage.actionMessageId);

      const usersInRole = role.members.map(m => m.user).filter(u => !u.bot);
      const optionsToUserReactions = reactions.map((reaction) => message.reactions.cache.get(reaction)?.users.cache.filter(u => !u.bot) ?? new Collection());
      const optionsToVoteCount = optionsToUserReactions.map(r => r.size);
      const totalVoteCount = optionsToVoteCount.reduce((a, b) => a + b, 0);

      const usersReacted = new Map();
      for (const optionToUserReaction of optionsToUserReactions) {
        for (const [id, user] of optionToUserReaction) {
          if (!usersReacted.has(id)) {
            usersReacted.set(id, user);
          }
        }
      }

      // Get users who are yet to react
      const usersPending = usersInRole.filter(u => !usersReacted.has(u.id));

      const votesOutput = `${italic('Votes:')}\n${options.map((option, index) => `${getLetterEmoji(index)}${
        totalVoteCount ? ` ***${(optionsToVoteCount[index] / totalVoteCount * 100).toFixed(0) }%***` : ''
      } ${option}`).join('\n')}`;

      if (usersPending.length === 0) {
        return `${bold(actionMessage.title)} ${role.toString()}
${votesOutput}
${await getRandomGif()}
`;
      }
      else {
        return `${bold(actionMessage.title)} ${role.toString()}
${votesOutput}
${italic('Pending:')}\n${usersPending.map(u => `:white_small_square: ${u.toString()}`).join('\n')}
`;
      }
    }
    catch (error) {
      console.error(error);
      return '';
    }
  };
};
