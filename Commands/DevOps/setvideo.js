const User = require("../../Models/User");
const {
  Client,
  Message,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
{joinVoiceChannel} = require("@discordjs/voice")

module.exports = {
  name: "setvideo",
  description: `command description`,
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
    const attachment = message.attachments.first();

    if (attachment && attachment.contentType === "video/mp4") {
      const voiceChannel = message.member.voice.channel;

      if (!voiceChannel) {
        return message.reply(
          "You need to be in a voice channel to set the video."
        );
      }

      try {
        const connection = await voiceChannel.join();
        connection.play(attachment.url);
        message.reply("Video set successfully!");
      } catch (error) {
        console.error(error);
        message.reply("Error occurred while setting the video.");
      }
    } else {
      message.reply("Please attach an MP4 file to set as the video.");
    }
  },
};
