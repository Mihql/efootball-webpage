import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateMatches = () => {
  const [leagueId, setLeagueId] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch leagues
    axios.get('/api/leagues/getleague')
      .then(response => {
        if (Array.isArray(response.data.league)) {
          setLeagues(response.data.league);
        } else {
          console.error('Leagues data is not an array:', response.data);
          setLeagues([]);
        }
      })
      .catch(error => {
        console.error('Error fetching leagues:', error);
        setLeagues([]);
      });

    // Fetch teams
    axios.get('/api/users')
    .then(response => {
      if (Array.isArray(response.data)) {
        setTeams(response.data);
      } else {
        console.error('Teams data is not an array:', response.data);
        setTeams([]);
      }
    })
    .catch(error => {
      console.error('Error fetching teams:', error);
      setTeams([]);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/matches/create-matches', { leagueId, teams: selectedTeams });
      console.log('Matches created:', response.data);
    } catch (error) {
      console.error('Error creating matches:', error);
    }
  };

  const handleTeamChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0, len = options.length; i < len; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedTeams(selected);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        League:
        <select value={leagueId} onChange={(e) => setLeagueId(e.target.value)} required>
          <option value="" disabled>Select a league</option>
          {leagues.map(league => (
            <option key={league._id} value={league._id}>{league.name}</option>
          ))}
        </select>
      </label>
      <label>
        Teams:
        <select multiple value={selectedTeams} onChange={handleTeamChange} required>
          {teams.map(team => (
            <option key={team._id} value={team.username}>{team.username}</option>
          ))}
        </select>
      </label>
      <button type="submit">Create Matches</button>
    </form>
  );
};

export default CreateMatches;
