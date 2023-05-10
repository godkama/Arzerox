const User = require("../../Models/User");
const {
  Client,
  Message,
  EmbedBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  TextInputStyle,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sim2")
    .setDescription("Simulation 2"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setDescription("Click the **Test** button.")
      .setColor("Green");

    const button = new ActionRowBuilder();
    button.addComponents(
      new ButtonBuilder()
        .setCustomId("sim1button")
        .setStyle(ButtonStyle.Success)
        .setLabel("Click Button")
    );

    interaction.reply({ embeds: [embed], components: [button] });
  },
};
