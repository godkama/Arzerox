const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "Command Outdated.",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== client.config.DEVID)
      return interaction.reply({
        content: ":x: This command is only available to developers.",
        ephemeral: true,
      });

    const subCommand = interaction.options.getSubcommand(false);
    if (subCommand) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${subCommand}`
      );
      if (!subCommand)
        return interaction.reply({
          content: "Subcommand Outdated.",
          ephemeral: true,
        });
      subCommandFile.execute(interaction, client);
    } else command.execute(interaction, client);
  },
};
