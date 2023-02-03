const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "power",
  aliases: ["testcmd", "pwr"],
  developer: true,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  execute(message, args, commandName, client, Discord) {
    message.channel.send("Power switch is working.");
  },
};
