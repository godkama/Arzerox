const { readdirSync } = require("fs");

module.exports = (client, Discord) => {
  const commandFolders = readdirSync(`./Commands/`);
  for (const folder of commandFolders) {
    const commands = readdirSync(`./Commands/${folder}`).filter((files) =>
      files.endsWith(".js")
    );
    for (const file of commands) {
      const command = require(`../Commands/${folder}/${file}`);
      client.commands.set(command.name, command);
    }
  }
};
const {
  Client,
  Message,
  MessageEmbed,
  Collection,
  PermissionFlagsBits,
} = require("discord.js");
const { PREFIX, BLOXIA_PREFIX } = require("../../config.json");
const User = require("../../Models/User");

module.exports = {
  name: "messageCreate",
  /**
   * @param {Client} client
   * @param {Message} message
   */
  async execute(message, client, bloxiacrown, Discord) {
    if (!message.content.startsWith(PREFIX) || message.author.bot) {
      return;
    }
    const args = message.content.slice(PREFIX.length).trim().split(/ + /);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    if (!commandName) return;
    if (!command) return;

    if (command.bloxia && message.guild.id !== client.config.BLOXIAID) return;
    if (command.developer && !client.config.DEVID.includes(message.author.id))
      return message.reply({
        content: ":x: This command is only available to developers.",
        ephemeral: true,
      });

    if (command.bloxia && message.content.startsWith(BLOXIA_PREFIX)) {
      command.execute(message, args, commandName, bloxiacrown, Discord);
    }

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
    if (client.maintenanced && !command.maintenancebypass)
      return message.reply(":x: Maintenance mode is on !");
    if (command.premium && user && !user.isPremium) {
      return message.reply({
        content: `> \`${message.author.username}\` You are Not Premium User`,
      });
    }

    if (command.owneronly && message.author.id !== client.config.OWNERID)
      return message.reply({
        content: ":x: This command is only available to the owner.",
        ephemeral: true,
      });

    command.execute(message, args, commandName, client, Discord);
  },
};
