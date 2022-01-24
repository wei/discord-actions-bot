module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    // Fetch all cached messages so messageReactionAdd will trigger
    client.customActions.cacheExistingMessages();
  },
};
