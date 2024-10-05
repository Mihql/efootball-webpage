import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LeagueManagement = ()=> {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            const response = await axios.get('/api/leagues/getleague');
            console.log(response.data.league, "LEAGUE_INTEL")
            setLeagues(response.data.league);
        };

        fetchLeagues();
    }, []);

  return (
    <div>
      <h1>League Management</h1>
      <ul>
        {leagues.map((league) => (
          <li key={league._id}>
            <h2>NAME: {league.name} - SEASON: {league.season}</h2>
           
            <Link to={`/leagues/${league._id}`}>View League</Link>
            {/* <button onClick={() => handleDelete(league._id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeagueManagement;