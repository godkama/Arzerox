const {
  Message,
  PermissionFlagsBits,
  Client,
  SlashCommandBuilder,
} = require("discord.js");
const User = require("../../Models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rempremium")
    .setDescription("Remove premium")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    // Code
    if (message.author.id !== "OWNERID") return;
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
