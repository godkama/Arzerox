const { model, Schema } = require("mongoose");

module.exports = model(
  "eventSchema",
  new Schema({
    eventType: String,
    economyType: String,
    PPID: String,
    PPSecret: String,
    return_url: String,
    cancel_url: String,
    GuildID: String,
    seatDisposition: String,
    eventCreator: String,
    eventDateTime: Date,
    channelType: String,
    customVideo: String,
  })
);
