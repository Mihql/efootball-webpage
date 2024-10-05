const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true,
    },
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming users represent teams
      required: true,
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true, default: Date.nows },

    location: { type: String, enum: ["home", "away"], required: true },

    score: {
      home: { type: Number, default: 0 },
      away: { type: Number, default: 0 },
    },

    status: {
      type: String,
      enum: ["scheduled", "compeleted"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Match", MatchSchema);
