const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responding with ping.")
    .setDMPermission(true),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, bloxiacrown) {
    interaction.reply({
      content: `Client ${bloxiacrown.user.username} has ${bloxiacrown.ws.ping}ms ping.`,
      ephemeral: true,
    });
  },
};
