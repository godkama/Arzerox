const { loadCommands } = require("../../../Handlers/commandHandler");
const { loadEvents } = require("../../../Handlers/eventHandler");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload Commands/Events")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Type of reload")
        .addChoices(
          { name: "Commands", value: "commands" },
          { name: "Events", value: "events" }
        )
        .setRequired(true)
    ),
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const type = interaction.options.getString("type");
    if (type === "events") {
      for (const [key, value] of client.events) {
        loadEvents(client);
        client.removeListener(`${key}`, value, true);
        await interaction.reply({
          content: "Developer Reloaded Events",
          ephemeral: false,
        });
      }
    } else {
      loadCommands(client);
      await interaction.reply({
        content: "Developer Reloaded Commands",
        ephemeral: false,
      });
    }
  },
};
