const User = require("../../Models/User");
const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "globmaintenance",
  description: `toggle global maintenance`,
  developer: false,
  premium: false,
  owneronly: false,
  bloxia: false,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  async execute(message, args, commandName, client, Discord) {
    if (!args) return message.reply(":x: Specify maintenance status");
    if (args[0] !== "on" || args[0] !== "off")
      return message.reply(":x: Not a right status.");

    if (args[0] == "on") {
      client.maintenanced = true;
      message.channel.send(
        "The developers toggled global maintenance. During that time the commands cannot be used."
      );
    }
    if (args[0] == "off") {
      client.maintenanced = false;
      message.channel.send(
        "The developers disabled global maintenance. Commands can now be used again."
      );
    }
  },
};
