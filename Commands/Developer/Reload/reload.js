const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload Commands/Events")
    .addSubcommand((options) =>
      options.setName("events").setDescription("Reload your events.")
    )
    .addSubcommand((options) =>
      options.setName("commands").setDescription("Reload your commands.")
    ),
};
