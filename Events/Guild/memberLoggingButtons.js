const { ButtonInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const splitArray = interaction.customId.split("-");
    if (!splitArray[0] === "MemberLogging") return;

    const member = (await interaction.guild.members.fetch()).get(splitArray[2]);
    const Embed = new EmbedBuilder();
    const errorsArray = [];

    if (!interaction.member.permissions.has("KickMembers"))
      errorsArray.push("You don't have the right perms");

    if (!member) errorsArray.push("Member has left the guild.");

    if (!member.moderatable) errorsArray.push("User not moderatable by bot");

    if (errorsArray.length)
      return interaction.reply({
        embeds: [Embed.setDescription(errorsArray.join("\n"))],
        ephemeral: true,
      });

    switch (splitArray[1]) {
      case "Kick":
        {
          member
            .kick(`Kicked by ${interaction.user.tag}`)
            .then(() => {
              interaction.reply({
                embeds: [Embed.setDescription(`${member} has been kicked.`)],
              });
            })
            .catch(() => {
              interaction.reply({
                embeds: [Embed.setDescription(`${member} couldn't be kicked.`)],
                ephemeral: true,
              });
            });
        }
        break;
      case "Ban":
        {
          member
            .ban(`Banned by ${interaction.user.tag}`)
            .then(() => {
              interaction.reply({
                embeds: [Embed.setDescription(`${member} has been banned.`)],
              });
            })
            .catch(() => {
              interaction.reply({
                embeds: [Embed.setDescription(`${member} couldn't be banned.`)],
                ephemeral: true,
              });
            });
        }
        break;
    }
  },
};
