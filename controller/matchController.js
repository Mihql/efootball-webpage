const Match = require("../models/Match");
const League = require("../models/League");
const User = require("../models/User");

exports.getMatches = async (req, res) => {
  try {
    console.log(req.params.leagueId, "LEAGUE-ID");
    const leagueId = req.params.leagueId;
    const match = await Match.findById(leagueId);

    match.league = leagueId;
    match.score.home = homeScore;
    match.score.away = awayScore;
    match.status = "compeleted";
    await match.save();

    res.json(match);
  } catch (err) {
    res.status(500).send("Server error", err);
  }
};

exports.createMatches = async (req, res) => {
  try {
    const { leagueId, teams } = req.body;
    console.log(teams, "----SElECTED TEAMS-------------------");

    if (!leagueId || !teams) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const league = await League.findById(leagueId);
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    // Create matches in a round-robin format
    const matches = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const homeTeam = await User.findOne({ username: teams[i] }); // Home match
        const awayTeam = await User.findOne({ username: teams[j] }); // away match

        if (!homeTeam || !awayTeam) {
          return res
            .status(400)
            .json({ message: "home team and away team not found" });
        }

        // Home match
        const homeMatch = new Match({
          league: leagueId,
          homeTeam: homeTeam._id,
          awayTeam: awayTeam._id,
          date: new Date(), // You can customize the date logic
          location: "home",
          status: "scheduled",
        });

        // // Away match
        const awayMatch = new Match({
          league: leagueId,
          homeTeam: awayTeam._id,
          awayTeam: homeTeam._id,
          date: new Date(), // Customize the date logic if necessary
          location: "away",
          status: "scheduled",
        });
      }
    }

    // Save matches to the database

    res.status(201).json();
  } catch (error) {
    console.log("Error creating matches!!!!!!!!!!", error);
    res.status(500).json({
      message: "Error creating matches!!!!!!!!!!",
      error: error.message,
    });
  }
};

exports.updateMatchesResult = async () => {
  const { matchId, homeScore, awayScore } = req.body;

  try {
    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({ msg: "Match not found" });
    }

    match.score.home = homeScore;
    match.score.away = awayScore;
    match.status = "compeleted";
    await match.save();

    // Update standing (updateMatches functions)
    await updateStandings(
      match.league,
      match.homeTeam,
      match.awayTeam,
      homeScore,
      awayScore
    );

    res.status(200).json({ message: "Match update successfully", match });
  } catch (err) {
    res.status(500).send("Error updating match", err);
  }
};

exports.createHome = async (req, res) => {
  const intel = req.body;
  try {
  } catch (err) {}
};
exports.createMatch = async (res, req) => {
  const { homePlayer, awayPlayer, leagueId } = req.body;

  try {
    const match = new Match({
      homePlayer,
      awayPlayer,
      league: leagueId,
    });
    await match.save();

    const league = await League.findById(leagueId);

    league.matches.push(leagueId);
    league.save();
    res.json(match);
  } catch (err) {
    res.status(500).send("Server error", err);
  }
};
