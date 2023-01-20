// Check the guide at the beginning if you don't understand paths.
const client = require("../../index");
const User = require("../../Models/User");

module.exports = {
  execute(client) {
    client.on("messageCreate", async (message) => {
      if (message.author.bot || !message.guild) return;
      let prefix = client.config.PREFIX;
      let args = message.content.slice(prefix.length).trim().split(/ +/);
      let cmd = args.shift()?.toLowerCase();
      const command = client.mcommands.get(cmd);
      if (!command) return;
      if (command) {
        let user = client.userSettings.get(message.author.id);
        // If there is no user, create it in the Database as "newUser"
        if (!user) {
          const findUser = await User.findOne({ Id: message.author.id });
          if (!findUser) {
            const newUser = await User.create({ Id: message.author.id });
            client.userSettings.set(message.author.id, newUser);
            user = newUser;
          } else return;
        }
        if (command.premium && user && !user.isPremium) {
          return message.reply({
            content: `> \`${message.author.username}\` You are Not Premium User`,
          });
        } else {
          command.run(client, message, args, prefix);
        }
      }
    });
  },
};
