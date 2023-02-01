const User = require("../../Models/User");
const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rempremium",
  description: `remove premium from user`,
  developer: true,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  async execute(message, args, commandName, client, Discord) {
    // Code
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) {
      return message.reply({
        content: `> Mention a User `,
      });
    }
    let data = client.userSettings.get(user.id);
    if (!data?.isPremium) {
      return message.reply({
        content: `\`${user.user.username}\` is Not a Premium User`,
      });
    } else {
      await User.findOneAndRemove({ Id: user.id });
      await client.userSettings.delete(user.id);
      return message.reply({
        content: `Premium Removed From \`${user.user.username}\``,
      });
    }
  },
};
