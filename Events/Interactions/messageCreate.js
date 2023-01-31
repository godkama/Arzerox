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
const { PREFIX } = require("../../config.json");
const premiumSchema = require("../../Models/premium");

module.exports = {
  name: "messageCreate",
  /**
   * @param {Client} client
   * @param {Message} message
   */
  async execute(message, client, Discord) {
    if (!message.content.startsWith(PREFIX) || message.author.bot) {
      return;
    }
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    if (!commandName) return;
    if (!command) return;

    if (
      command.premium &&
      !(await premiumSchema.findOne({ User: message.author.id }))
    )
      return message.reply({
        content: ":x: You need to be a premium user to use this command !",
        ephemeral: false,
      });

    if (command.developer && !client.config.DEVID.includes(message.author.id))
      return message.reply({
        content: ":x: This command is only available to developers.",
        ephemeral: true,
      });

    if (command.owneronly && message.author.id !== client.config.OWNERID)
      return message.reply({
        content: ":x: This command is only available to the owner.",
        ephemeral: true,
      });

    command.execute(message, args, commandName, Client, Discord);
  },
};
