const {
  Message,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("premiumlist")
    .setDescription("Get list of premium users")
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
