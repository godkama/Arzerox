const { Schema, model } = require("mongoose");

module.exports = model(
  "Ticket",
  new Schema({
    TicketParent: String,
    memberRole: String,
    botRole: String,
  })
);
