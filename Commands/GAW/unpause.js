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
    .setName("gaw_unpause")
    .setDescription("Giveaway UnPause")
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

    if (!giveaway.pauseOptions.isPaused) {
      return interaction.reply({
        content: "This giveaway is not paused.",
        ephemeral: true,
      });
    }

    // Edit the giveaway
    client.giveawaysManager
      .unpause(giveaway.messageId)
      // Success message
      .then(() => {
        // Success message
        interaction.reply("Giveaway unpaused!");
      })
      .catch((e) => {
        interaction.reply({
          content: e,
          ephemeral: true,
        });
      });
  },
};
