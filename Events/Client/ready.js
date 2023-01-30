const { loadCommands } = require("../../Handlers/commandHandler");
const User = require("../../Models/User");

module.exports = {
  name: "ready",
  once: true,
  async execute(client, ActivityType) {
    client.user.setPresence({
      activities: [
        {
          name: `${client.guilds.cache.size} Guilds || Dev By Kama`,
          type: ActivityType.LISTENING,
        },
      ],
      status: "dnd",
    });
    loadCommands(client);
    console.log(
      `Logged into ${client.user.tag}\n${client.user.username}'s ID is ${client.user.id}\nChange options in ./config.json\n${client.user.username} is now online.\nSuccesfully reloaded`
    );
  },
};
