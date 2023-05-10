const eventSchema = new mongoose.Schema({
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
});
