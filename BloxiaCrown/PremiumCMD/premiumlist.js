const moment = require("moment");
const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "premiumlist",
  description: `show all premium users`,
  developer: true,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  async execute(message, args, commandName, client, Discord) {
    // Code

    let data = client.userSettings
      .filter((data) => data?.isPremium === true)
      .map((data) => {
        return `<@${data.Id}> **Plan** : \`${
          data.premium.plan
        }\` **Expire At** :  <t:${Math.floor(
          data.premium.expiresAt / 1000
        )}:F> `;
      });

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`All Premium Users`)
          .setColor("Blurple")
          .setDescription(data.join("\n") || "No Premium User Found"),
      ],
    });
  },
};
