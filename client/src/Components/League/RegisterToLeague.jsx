import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import "../../styles/League/RegisterToLeague.css";

function RegisterToLeague() {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeagueId, setSelectedLeagueId] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const currentUser = useSelector(state => state.user);
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchLeagues = async () => {
            try{
                const response = await axios.get('/api/leagues/getleague');
                setLeagues(response.data.league);
            }
            catch(err) {
                console.error('Error fetching leagues:', err);
                setError('Failed to load leagues. Please try again later.');
            }
        };

        fetchLeagues();
    }, []);

    const handelRegister = async () => {
        if (!selectedLeagueId) {
            setError('Please select a league.');
            return;
        }

        try{
            const response = await axios.post('/api/leagues/register', {
                leagueId: selectedLeagueId,
                userId: currentUser.id
            });
            // navigate('/');
            setSuccessMessage(response.data.message);
            setError(null);
        }
        catch(err) {
            console.error('Error registering for league:', err);
            setError('Failed to register for league. Please try again later.');
        }
    }

  return (
    <div className="register-to-league-container">
      <h1>RegisterToLeague</h1>
      {error && <p className='error-message'>{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <select onChange={(e) => setSelectedLeagueId(e.target.value)}>
        <option value="">Select a league</option>
        {leagues.map((league) => (
            <option key={league._id} value={league._id}>
                {league.name} -
                {league.season}
            </option>
        ))}
        </select>
        <button onClick={handelRegister}>Register</button>  
    </div>
  );
}

export default RegisterToLeague