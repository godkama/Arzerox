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

    let timeError = false;
    await target.timeout(ms(time), reason).catch(() => (timeError = true));

    if (timeError)
      return interaction.reply({
        embeds: [
          errorsEmbed.setDescription(
            "Could not timeout user due to an uncommon error. Cannot take negative values"
          ),
        ],
        ephemeral: true,
      });

    const newInfractionsObject = {
      IssuerID: member.id,
      IssuerTag: member.user.tag,
      Reason: reason,
      Date: Date.now(),
    };

    let userData = await Database.findOne({ Guild: guild.id, User: target.id });
    if (!userData)
      userData = await Database.create({
        Guild: guild.id,
        User: target.id,
        Infractions: [newInfractionsObject],
      });
    else
      userData.Infractions.push(newInfractionsObject) &&
        (await userData.save());

    const successEmbed = new EmbedBuilder()
      .setAuthor({
        name: "Timeout Issued",
        iconURL: guild.iconURL(),
      })
      .setColor("Gold")
      .setDescription(
        [
          `${target} was issued a timeout for **${ms(ms(time), {
            long: true,
          })}** by ${member}`,
          `Their total infractions is now : **${userData.Infractions.length}**`,
          `Reason: ${reason}`,
        ].join("\n")
      );
    return interaction.reply({ embeds: [successEmbed] });
  },
};
