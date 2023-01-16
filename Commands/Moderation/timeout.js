const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");
const Database = require("../../Schemas/Infractions");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Restrict ability to chat")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addUserOption((options) =>
      options
        .setName("target")
        .setDescription("Target to timeout.")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("time")
        .setDescription("Duration of the timeout.")
        .setRequired(true)
    )
    .addStringOption((options) =>
      options
        .setName("reason")
        .setDescription("Reason of the timeout")
        .setMaxLength(512)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options, guild, member } = interaction;

    const target = options.getMember("target");
    const time = options.getString("time");
    const reason = options.getString("reason") || "None provided";

    const errorsArray = [];

    const errorsEmbed = new EmbedBuilder()
      .setAuthor({ name: "Could not timeout member due to" })
      .setColor("Red");

    if (!target)
      return interaction.reply({
        embeds: [errorsEmbed.setDescription("Member left guild")],
        ephemeral: true,
      });
    if (!ms(time) || ms(time) > ms("28d"))
      errorsArray.push("Time is invalid or over 28d limit.");

    if (!target.manageable || !target.moderatable)
      errorsArray.push("Target not moderatable by bot.");

    if (member.roles.highest.position < target.roles.highest.position)
      errorsArray.push("Selected member has higher role than you.");

    if (errorsArray.length)
      interaction.reply({
        embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
      });

    target.timeout(ms(time), reason).catch((err) => {
      interaction.reply({
        embeds: [errorsEmbed.setDescription("An unexpected error happened.")],
      });
      return console.log("Error in timeout.js", err);
    });
  },
};
