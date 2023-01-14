module.exports = {
  name: "ready",
  once: true,
  execute(client, ActivityType) {
    client.user.setPresence({
      activities: [
        {
          name: `${client.guilds.cache.size} Guilds || Dev By Kama`,
          type: ActivityType.Watching,
        },
      ],
      status: "dnd",
    });
    console.log(`Logged in as ${client.user.username}`);
  },
};
