const User = require("../../Models/User");
const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "globstop",
  description: `toggle global maintenance`,
  developer: false,
  premium: false,
  owneronly: false,
  bloxia: false,
  maintenancebypass: true,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  async execute(message, args, commandName, client, Discord) {
    const status = args[0];
    console.log(status);
    const statusValid = ["on", "off"];
    const channel = client.channels.cache.get(`980128496506515456`);
    if (!statusValid.includes(status))
      return message.reply(":x: Specify maintenance status");
    if (status === "on") {
      message.channel.send("Dev toggled maintenance mode, no commands working");
      client.maintenanced = true;
    }
    if (status === "off") {
      message.channel.send(
        "Dev toggled maintenance mode off, commands working again"
      );
      client.maintenanced = false;
    }
  },
};
