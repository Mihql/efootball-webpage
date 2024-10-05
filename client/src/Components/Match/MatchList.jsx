import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Match/MatchList.css"; // Create and import relevant CSS

const MatchList = ({ leagueId }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fecthMatchList = async () => {
      try {
        const response = axios.get(`/api/matches/${leagueId}/matches`);
        setMatches(response.data);
        console.log(response.data, "MATCH RESPONSE");
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    fecthMatchList();
  }, [leagueId]);

  return (
    <div className="match-list">
      <h2>Match Fixture and Results</h2>
      {matches.map((match, index) => (
        <div key={index} className="match-item">
          <div className="match-details">
            <span>{match.homeTeam.username} vs {match.awayTeam.username} </span>
            <span>{new Date(match.date).toLocaleDateString()}</span>
          </div>
          <div className="match-score">
            {match.status === "compeleted" ? (
              <span></span>
            ) : (
              <span>Upcoming</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};


export default MatchList;
