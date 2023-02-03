const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("emit")
    .setDescription("Emit the guildMemberAdd / Remove events")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    client.emit("guildMemberRemove", interaction.member);
    client.emit("guildMemberAdd", interaction.member);

    interaction.reply({
      content: "Emitted GuidlMemberAdd and GuildMemberRemove",
      ephemeral: true,
    });
  },
};
