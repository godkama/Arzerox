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
    .setName("gaw_reroll")
    .setDescription("Giveaway Reroll")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addStringOption((option) =>
      option.setName("giveaway").setRequired(true).setDescription("GAW ID")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const query = interaction.options.getString("giveaway");

    // try to found the giveaway with prize then with ID
    const giveaway =
      // Search with giveaway prize
      client.giveawaysManager.giveaways.find(
        (g) => g.prize === query && g.guildId === interaction.guild.id
      ) ||
      // Search with giveaway ID
      client.giveawaysManager.giveaways.find(
        (g) => g.messageId === query && g.guildId === interaction.guild.id
      );

    // If no giveaway was found
    if (!giveaway) {
      return interaction.reply({
        content: "Unable to find a giveaway for `" + query + "`.",
        ephemeral: true,
      });
    }

    if (!giveaway.ended) {
      return interaction.reply({
        content: "The giveaway is not ended yet.",
        ephemeral: true,
      });
    }

    // Reroll the giveaway
    client.giveawaysManager
      .reroll(giveaway.messageId)
      .then(() => {
        // Success message
        interaction.reply("Giveaway rerolled!");
      })
      .catch((e) => {
        interaction.reply({
          content: e,
          ephemeral: true,
        });
      });
  },
};
