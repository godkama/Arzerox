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
  ChannelType,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Initialize ticket message."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return;

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("button")
        .setEmoji("💌")
        .setLabel("Create ticket.")
        .setStyle(ButtonStyle.Secondary)
    );

    const embed = new EmbedBuilder()
      .setImage(
        "https://previews.123rf.com/images/robuart/robuart1605/robuart160500292/57494709-support-banner-concept-design-flat-style-poster-or-a-banner-of-support-and-technical-advising-for.jpg"
      )
      .setColor("DarkButNotBlack")
      .setTitle("Tickets Bloxia")
      .setDescription(
        "Click on the **Create Ticket** button to talk to Bloxia's Support !"
      )
      .setFooter({ text: "Dev by Kama" });

    await interaction.reply({ embeds: [embed], components: [button] });
    number = 0;
    const collector = interaction.channel.createMessageComponentCollector();

    collector.on("collect", async (i) => {
      number++;
      await i.update({ embeds: [embed], components: [button] });
      var parentCat = interaction.guild.channels.cache.find(
        (channel) =>
          channel.type === ChannelType.GuildCategory &&
          channel.name === "Ticket"
      );

      if (!parentCat) {
        const parentCat = await interaction.guild.channels.create({
          name: "Ticket",
          type: ChannelType.GuildCategory,
        });
      }

      const channel = await interaction.guild.channels.create({
        name: `ticket-${number}`,
        type: ChannelType.GuildText,
        parent: parentCat.setParent,
      });

      channel.permissionOverwrites.create(i.user.id, {
        ViewChannel: true,
        SendMessages: true,
      });
      channel.permissionOverwrites.create(channel.guild.roles.everyone, {
        ViewChannel: false,
        SendMessages: false,
      });
      channel.send(
        `Welcome ${i.user}, once you are finished, have an admin delete the channel.`
      );
      i.user
        .send(`Your ticket in ${i.guild.name} was successfully created.`)
        .catch((err) => {
          return;
        });
    });
  },
};
