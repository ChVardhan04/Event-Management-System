const mongoose = require("mongoose");

const eventLogSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  changes: {
    type: Object,
    required: true,
  },
  createdAtUtc: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EventLog", eventLogSchema);
