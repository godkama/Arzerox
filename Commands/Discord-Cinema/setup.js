module.exports = {
  name: "cinema-setup",
  description: `Setup an event`,
  developer: true,
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
    let filter = (m) => m.author.id === message.author.id;
    message.channel.send(``).then(() => {
      message.channel
        .awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ["time"],
        })
        .then((message) => {
          message = message.first();
        })
        .catch((collected) => {
          message.channel.send("Timeout");
        });
    });
    event.save((error, event) => {
      if (error) {
        console.error(error);
        message.reply("Error setting up the event.");
      } else {
        message.reply(`Event set up successfully with ID ${event._id}.`);
      }
    });
  },
};
