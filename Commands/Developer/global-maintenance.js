const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "globstop",
  description: `toggle global maintenance`,
  developer: false,
  premium: false,
  owneronly: true,
  bloxia: false,
  maintenancebypass: true,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  execute(message, args, commandName, client, Discord) {
    const status = args[0];
    console.log(`Maintenance status : ${status}`);
    if (status === "on") {
      client.maintenanced = true;
      message.reply("Client now maintenanced");
    } else if (status === "off") {
      client.maintenanced = false;
      message.reply("Maintenance off");
    }
  },
};
