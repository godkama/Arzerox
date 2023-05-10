const { eventSchema } = require("../../Schemas/CinemaEvents");

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
    function generateLayout(layoutOfRow, numRows, premiumLine) {
      const maxGroups = 5;
      const seatGroups = Math.min(layoutOfRow.length, maxGroups);

      let layout = "";

      for (let row = 0; row < numRows; row++) {
        let line = "";

        for (let group = 0; group < seatGroups; group++) {
          line += layoutOfRow.substring(0, layoutOfRow[group]);
          layoutOfRow = layoutOfRow.substring(group + 1);

          // Add a space between groups of seats
          if (group !== seatGroups - 1) {
            line += " ";
          }
        }

        // Check if the current row is the premium line
        if (premiumLine && row === premiumLine - 1) {
          line = line.replace(/🪑/g, "💺");
        }

        layout += line + "\n";
      }

      return layout;
    }

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
    eventSchema.save((error, event) => {
      if (error) {
        console.error(error);
        message.reply("Error setting up the event.");
      } else {
        message.reply(`Event set up successfully with ID ${event_id}.`);
      }
    });
  },
};
