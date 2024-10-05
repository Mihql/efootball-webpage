import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const LeagueDetails = () => {
        const { leagueId } = useParams(); // Retrieve the league ID from the URL
    const [league, setLeague] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        const fetchLeague = async () => {
            try{
                const response = await axios.get(`/api/leagues/leagues/${leagueId}`)
                setLeague(response.data);
            }
            catch(err) {
                setError('Error fetching league details');
            }
        };

        fetchLeague();
    }, [leagueId]);

    if (error) {
        return <div>{error}</div>; // Display error message if there's an error
    }

    if (!league) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h1>League Details</h1>
            <p>Name: {league.name}</p>
            <p>Season: {league.season}</p>
            <p>MAX-TEAMS {league.maxTeams}</p>
            <p>RULES {league.rules}</p>
            <p>{league.pointsWins}:for win - {league.pointsDraw}:for draw - {league.pointsLoss}:for lose</p>
            {/* Add more details here as needed */}
        </div>
    );
};

export default LeagueDetails;