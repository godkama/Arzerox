const premiumSchema = require("../../Models/premium");
const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "del-premium",
  developer: true,
  aliases: ["premrem", "remgift"],
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
        if (!data)
          return message.channel.send(
            "User was previously not added to database."
          );

        data.delete();
        message.channel.send(`Removed ${User} from the database.`);
      }
    );
  },
};
