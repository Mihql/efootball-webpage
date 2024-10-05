const mongoose = require("mongoose");
const User = require("../models/User");

const LeagueSchema = new mongoose.Schema({
  name: String,
  season: String,
  maxTeams: Number,
  rules: String,
  pointsWins: { type: Number, default: 3 },
  pointsDraw: { type: Number, default: 1 },
  pointsLoss: { type: Number, default: 0 },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }], // Array of match references
  standings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      logo: {
        type: String,
        default:
          "https://c.animaapp.com/QXbFrOOV/img/efhub24-icon-large-alpha-png@2x.png",
      },
      matchPlayed: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
      goalsFor: { type: Number, default: 0 },
      goalsAgainst: { type: Number, default: 0 },
      goalDifference: { type: Number, default: 0 },
      points: { type: Number, default: 0 },
      last5: ["W", "W", "W", "W", "W"],
    },
  ],
});

module.exports = mongoose.model("League", LeagueSchema);
