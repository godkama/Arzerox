const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
const database = require("../../Schemas/MemberLog");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup_memberlog")
    .setDescription("Configure member logging system")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((options) =>
      options
        .setName("log_channel")
        .setDescription("select logging channel")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((options) =>
      options.setName("member_role").setDescription("set role for new member")
    )
    .addRoleOption((options) =>
      options.setName("bot_role").setDescription("set role for new bot")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { guild, options } = interaction;

    const logChannel = options.getChannel("log_channel").id;

    let memberRole = options.getRole("member_role")
      ? options.getRole("member_role").id
      : null;

    let botRole = options.getRole("bot_role")
      ? options.getRole("member_role").id
      : null;

    const guildConfigObject = {
      logChannel: logChannel,
      memberRole: memberRole,
      botRole: botRole,
    };

    await database.findOneAndUpdate(
      { Guild: guild.id },
      {
        logChannel: logChannel,
        memberRole: memberRole,
        botRole: botRole,
      },
      { new: true, upsert: true }
    );

    client.guildConfig.set(guild.id, {
      logChannel: logChannel,
      memberRole: memberRole,
      botRole: botRole,
    });

    const Embed = new EmbedBuilder()
      .setColor("DarkGreen")
      .setDescription(
        [
          `- Logging Channel Updated : <#${logChannel}>`,
          `- Member Auto-Role Updated : ${
            memberRole ? `<@${memberRole}>` : "Not Specified."
          }`,
          `- Bot Auto-Role Updated : ${
            botRole ? `<@${botRole}>` : "Not Specified."
          }`,
        ].join("\n")
      );

    return interaction.reply({ embeds: [Embed] });
  },
};
