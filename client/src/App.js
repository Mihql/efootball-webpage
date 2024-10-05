import "./App.css";

import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
// import Match from "./Components/Match";
import UpdateRole from "./Components/UpdateRole";
import UserProfile from "./Components/UserProfile";
import UserProfileInfo from "./Components/UserProfileInfo";
// import GlobalStyle from "./Components/GlobalStyle";
import LeagueCreation from "./Components/League/LeagueCreation";
import LeagueManagement from "./Components/League/LeagueManagement";
import LeagueDetails from "./Components/League/LeagueDetails";
import RegisterToLeague from "./Components/League/RegisterToLeague";
import LeagueTable from "./Components/League/LeagueTable";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MatchList from "./Components/Match/MatchList";
import CreateMatches from "./Components/Match/CreateMatches";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <GlobalStyle /> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/userProfile" element={<UserProfileInfo />} />
          <Route path="/update-role" element={<UpdateRole />} />
          <Route path="/create" element={<LeagueCreation />} />
          <Route path="/getleague" element={<LeagueManagement />} />
          <Route path="/leagues/:leagueId" element={<LeagueDetails />} />
          <Route path="/register" element={<RegisterToLeague />} />
          <Route
            path="/:leagueId/table"
            element={<LeagueTable leagueId="667dc8bfbffbadc586a6650c" />}
          />
          <Route
            path="/:leagueId/matches"
            element={<LeagueTable leagueId="667dc8bfbffbadc586a6650c" />}
          />

          <Route path="/creatematches" element={<CreateMatches />} />

          <Route
            path="/:leagueId/matches"
            element={<MatchList leagueId="667dc8bfbffbadc586a6650c" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
