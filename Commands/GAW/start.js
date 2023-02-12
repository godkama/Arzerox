const ms = require("ms");
const messages = require("../GAWUTILS/messages");

const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("gaw_add")
    .setDescription("Giveaway")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("duration")
        .setRequired(true)
        .setDescription("GAW Duration")
    )
    .addIntegerOption((option) =>
      option
        .setName("winners")
        .setDescription("Number of winners")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("prize")
        .setDescription("Prize of the giveaway")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel of the giveaway")
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const duration = interaction.options.getString("duration");
    const winnerCount = interaction.options.getInteger("winners");
    const prize = interaction.options.getString("prize");
    const channel = interaction.options.getChannel("channel");

    client.giveawaysManager
      .start(channel, {
        duration: ms(duration) * 1000,
        winnerCount: winnerCount,
        prize: prize,
        hostedBy: interaction.user.tag,
        messages,
      })
      .then((data) => {
        console.log(data); // {...} (messageId, end date and more)
      });
    interaction.reply(`Giveaway started in ${channel}`);
  },
};
