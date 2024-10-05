const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/auth");
const leagueRoutes = require("./routes/leagues");
const matchRoutes = require("./routes/matches");

app.use("/api", authRoutes);
app.use("/api/leagues", leagueRoutes);
app.use("/api/matches", matchRoutes);

mongoose.set("debug", true);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/footballDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
