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
  execute(interaction, client) {
    interaction.reply({
      content: `Client ${client.user.username} has ${client.ws.ping}ms ping.`,
      ephemeral: true,
    });
  },
};
