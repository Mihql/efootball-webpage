const express = require("express");
const router = express.Router();
const {
  createLeagues,
  getLeagues,
  // joinLeagues,
  getLeagueById,
  registerUserToLeague,
  getLeagueTable,
} = require("../controller/leagueController");

router.post("/create", createLeagues);
router.get("/getleague", getLeagues);

router.get("/leagues/:leagueId", getLeagueById);
router.get("/:leagueId/table", getLeagueTable);
router.post("/register", registerUserToLeague);

// router.post("/join", joinLeagues);

module.exports = router;
