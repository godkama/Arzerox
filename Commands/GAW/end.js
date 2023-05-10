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
    .setName("gaw_end")
    .setDescription("Giveaway End")
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

    if (giveaway.ended) {
      return interaction.reply({
        content: "This giveaway is already ended.",
        ephemeral: true,
      });
    }

    // Edit the giveaway
    client.giveawaysManager
      .end(giveaway.messageId)
      // Success message
      .then(() => {
        // Success message
        interaction.reply("Giveaway ended!");
      })
      .catch((e) => {
        interaction.reply({
          content: e,
          ephemeral: true,
        });
      });
  },
};
