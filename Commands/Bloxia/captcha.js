const User = require("../../Models/User");
const {
  Client,
  Message,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const { Captcha } = require("captcha-canvas");

module.exports = {
  name: "captcha",
  description: `captcha`,
  developer: false,
  premium: false,
  owneronly: false,
  bloxia: false,
  /**
   *
   * @param {Message} message
   * @param {*} args
   * @param {Client} client
   */
  async execute(message, args, commandName, client, Discord) {
    const captcha = new Captcha();
    captcha.async = true;
    captcha.addDecoy();
    captcha.drawTrace();
    captcha.drawCaptcha();

    const captchaPNG = new AttachmentBuilder(await captcha.png);
    const captchaEmbed = new EmbedBuilder()

      .setDescription("Veuillez résoudre le captcha.")
      .setColor("DarkButNotBlack")
      .setDescription("Dev by Kama • play.bloxia.fr");
    message.channel.send({ embeds: [captchaEmbed], files: [captchaPNG] });
  },
};
