const express = require("express");
const router = express.Router();
const { createMatches, getMatches } = require("../controller/matchController");

router.post("/create-matches", createMatches);

router.get("/:leagueId/matches", getMatches);

// router.get("/creatematches");

module.exports = router;
