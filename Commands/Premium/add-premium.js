const premiumSchema = require("../../Models/premium");
const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  developer: true,
  name: "add-premium",
  aliases: ["premadd", "giftprem"],
  /**
   *
   * @param {Message} message
   * @param {String[]} args
   * @param {Client} client
   */
  async execute(message, args, commandName, client, Discord) {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member) return message.reply("Please specify a valid member");

    premiumSchema.findOne(
      {
        User: member.id,
      },
      async (err, data) => {
        if (data)
          return message.channel.send(
            "User has already access to premium features."
          );

        new premiumSchema({
          User: member.id,
        }).save();
        return message.channel.send(`Added ${User} to the database.`);
      }
    );
  },
};
