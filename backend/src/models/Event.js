const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    profiles: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true }
    ],
    timezone: { type: String, required: true }, 
    startUtc: { type: Date, required: true },
    endUtc: { type: Date, required: true },
    createdAtUtc: { type: Date, default: Date.now },
    updatedAtUtc: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

module.exports = mongoose.model("Event", eventSchema);
