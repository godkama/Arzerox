const messages = require("../GAWUTILS/messages");
const ms = require("ms");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gaw_fast")
    .setDescription("Drop Giveaway")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
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
    const giveawayChannel = interaction.options.getChannel("channel");
    const giveawayWinnerCount = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");

    if (!giveawayChannel.isTextBased()) {
      return interaction.reply({
        content: ":x: Selected channel is not text-based.",
        ephemeral: true,
      });
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The number of winners for this drop
      winnerCount: giveawayWinnerCount,
      // The prize of the giveaway
      prize: giveawayPrize,
      // Who hosts this giveaway
      hostedBy: interaction.user.author,
      // specify drop
      isDrop: true,
      // Messages
      messages,
    });

    interaction.reply(`Giveaway started in ${giveawayChannel}!`);
  },
};
