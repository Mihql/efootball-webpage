import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Match.css';

const MatchPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('/api/matches');
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="match-page">
      <h2>Upcoming Matches</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match._id}>
              <td>{new Date(match.date).toLocaleDateString()}</td>
              <td>{match.homeTeam}</td>
              <td>{match.awayTeam}</td>
              <td>{match.homeScore} - {match.awayScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchPage;
