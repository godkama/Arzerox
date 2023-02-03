const { loadCommands } = require("../../Handlers/commandHandler");
const User = require("../../Models/User");
const DBD = require("discord-dashboard");
const Theme = require("dbd-soft-ui");

module.exports = {
  name: "ready",
  once: true,
  async execute(bloxiacrown, ActivityType) {
    if (bloxiacrown.maintenanced == true) {
      bloxiacrown.user.setPresence({
        activities: [
          {
            name: `Currently undergoing maintenance. || Dev By Kama`,
            type: "LISTENING",
          },
        ],
        status: "dnd",
      });
    } else {
      bloxiacrown.user.setPresence({
        activities: [
          {
            name: `${bloxiacrown.guilds.cache.size} Guilds || Dev By Kama`,
            type: ActivityType.LISTENING,
          },
        ],
        status: "online",
      });
    }
    //premium and shit
    const users = await User.find();
    users.forEach((user) => bloxiacrown.userSettings.set(user.Id, user));
    loadCommands(bloxiacrown);
    console.log(
      `Logged into ${bloxiacrown.user.tag}\n${bloxiacrown.user.username}'s ID is ${bloxiacrown.user.id}\nChange options in ./config.json\n${bloxiacrown.user.username} is now online.\nSuccesfully reloaded`
    );
  },
};
