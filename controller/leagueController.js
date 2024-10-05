const League = require("../models/League");
const User = require("../models/User");

exports.updateStandings = async (leagueId, userId, wins, draws, losses) => {
  try {
    const league = await League.findById(leagueId);
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    const existingStanding = league.standings.find(
      (standings) => standings.user.toString() === userId
    );

    if (existingStanding) {
      existingStanding.matchPlayed = draws + wins;
      existingStanding.wins = wins;
      existingStanding.draws = draws;
      existingStanding.losses = losses;
      existingStanding.goalsFor = goalsFor;
      existingStanding.goalsAgainst = goalsAgainst;
      existingStanding.goalDifference = goalsFor - goalsAgainst;
      existingStanding.points = wins * 3 + draws;
    } else {
      league.standings.push({
        user: userId,
        matchPlayed: draws + wins + losses,
        wins,
        draws,
        losses,
        goalsFor,
        goalsAgainst,
        goalDifference: goalsFor - goalsAgainst,
        points: wins * 3 + draws,
      });
    }

    await league.save();
    res.status(200).json({
      message: "Standing updated successfully",
      standings: league.standings,
    });
    console.log("Updated standings:", league.standings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating standings", error: err.message });
    console.error("Error updating standings:", err);
  }
};

exports.getLeagueTable = async (req, res) => {
  try {
    console.log(req.params.leagueId, "LEAGUE-ID");
    const leagueId = req.params.leagueId;
    const userId = "6677f7489f5bb29e09da877a";
    const league = await League.findById(leagueId).populate(
      "standings.user",
      "username email"
    );

    if (!league) {
      return res.status(400).json({ message: "League not found" });
    }

    league.standings.sort(
      (a, b) =>
        b.points - a.points ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor
    );

    res.status(200).json(league.standings);
    console.log(league.standings, "LEAGUE-STANDINGS");
  } catch (err) {
    console.error("Error fetching league table:", err);
    res
      .status(500)
      .json({ message: "Error fetching league table", error: err.message });
  }
};

exports.registerUserToLeague = async (req, res) => {
  const { leagueId, userId } = req.body;
  try {
    // Find league by ID
    const league = await League.findById(leagueId);
    // console.log(league.users, "LEAGUE-users DATA");
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    if (!Array.isArray(league.users)) {
      league.users = [];
    }

    if (league.users.length >= league.maxTeams) {
      return res.status(200).json({ message: "League is full" });
    }

    if (league.users.includes(userId)) {
      return res
        .status(200)
        .json({ message: `{userId} already registered to this league` });
    }

    // Add user to league
    league.users.push(userId);
    await league.save();

    const GF = 25,
      GA = 13,
      win = 7,
      draw = 3,
      losse = 0;

    const newStanding = {
      user: userId,
      matchPlayed: draw + win + losse,
      wins: win,
      draws: draw,
      losses: losse,
      goalsFor: GF,
      goalsAgainst: GA,
      goalDifference: GF - GA,
      points: win * 3 + draw,
    };

    league.standings.push(newStanding);
    await league.save();

    res.status(200).json({ message: "Successfully registered for the league" });
  } catch (err) {
    console.error("Error registering user to league:", err);
    res.status(500).json({ message: "Error registering for league" });
  }
};

exports.createLeagues = async (req, res) => {
  try {
    const { name, season, maxTeams, rules } = req.body;

    const newleague = new League({ name, season, maxTeams, rules });

    await newleague.save();
    res
      .status(201)
      .json({ message: "League created succesfully", league: newleague });
  } catch (err) {
    console.error("Error creating league:", err);
    res.status(500).json({ message: "Error creating league" });
  }
};

exports.getLeagues = async (req, res) => {
  const leagueId = "667bfcdfa23873cd3add93e4";

  try {
    const league = await League.find({});
    res.status(201).json({ message: "League", league: league });
  } catch (err) {
    res.status(500).send("Error fetching league", err);
  }
};

exports.getLeagueById = async (req, res) => {
  const { leagueId } = req.params;
  console.log(leagueId, "LEAGUE_ID");

  try {
    const league = await League.findById(req.params.leagueId);
    // Error fetching league: StrictPopulateError: Cannot populate path `user` because it is not in your schema. Set the `strictPopulate` option to false to override.
    // .populate(
    //   "user",
    //   "username, email"
    // );
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    res.json(league);
  } catch (err) {
    console.error("Error fetching league:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.joinLeagues = async (req, res) => {
  const { leagueId, userId } = req.body;

  try {
    const league = await League.findById(leagueId);
    if (!league) {
      return res.status(404).json({ msg: "League not found" });
    }

    if (league.players.includes(userId)) {
      return res.status(400).json({ msg: "Already joined this league" });
    }

    league.players.push(userId);
    await league.save();

    res.json(league);
  } catch (err) {
    res.status(500).send("Server error", err);
  }
};
