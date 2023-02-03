const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client, bloxiacrown) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "Command Outdated.",
        ephemeral: true,
      });

    const bloxiacommand = bloxiacrown.commands.get(interaction.commandName);
    if (command.bloxia && message.guild.id !== client.config.BLOXIAID) return;

    if (client.maintenanced && !command.maintenancebypass)
      return interaction.reply(":x: Maintenance mode is on !");

    if (command.developer && !client.config.DEVID.includes(interaction.user.id))
      return interaction.reply({
        content: ":x: This command is only available to developers.",
        ephemeral: true,
      });

    if (command.owneronly && interaction.user.id !== client.config.OWNERID)
      return interaction.reply({
        content: ":x: This command is only available to the owner.",
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
    bloxiacommand.execute(interaction, bloxiacrown);
  },
};
