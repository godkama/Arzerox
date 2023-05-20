const { joinVoiceChannel } = require("@discordjs/voice");
const User = require("../../Models/User");
const {
  Client,
  Message,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");

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
   *
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
        const connection = joinVoiceChannel({
          channelId: "1060478291053649965",
          guildId: message.guildId,
          adapterCreator: message.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();
        const resource = createAudioResource(createReadStream(attachment.url), {
          inlineVolume: true,
        });
        player.play(resource);
        connection.subscribe(player);

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
