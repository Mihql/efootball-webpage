import React, { useState, useEffect } from "react";
import axios from "axios";
// import { DataGrid } from '@mui/x-data-grid';
// import { Box } from "@mui/material";
import "../../styles/League/LeagueTable.css";

const LeagueTable = ({ leagueId }) => {
  // handeling the league standing from in redux leagueSlice in state
  const [standings, setStandings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] =useState(null);
  
  useEffect(() => {
    const FetchLeagueTable = async () => {
      try {
        const response = await axios.get(`/api/leagues/${leagueId}/table`);
        console.log(response.data, "LEAGUETABLE");
        setStandings(response.data);
      } catch (error) {
        setError('Error fetching league standings');
        console.error("Error fetching league table", error);
      }
      finally {
        setLoading(false);
      }
    };

    FetchLeagueTable();
  }, [leagueId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  } 

  if (!standings) {
    return <div>No standings available</div>
  }

  // const columns = [
  //   { field: 'username', headerName: 'team', width: 150, },
  //   { field: 'wins', headerName: 'W', width: 50 },
  //   { field: 'draws', headerName: 'D', width: 50 },
  //   { field: 'losses', headerName: 'L', width: 50 },
  //   { field: 'goalsFor', headerName: 'GF', width: 50 },
  //   { field: 'goalsAgainst', headerName: 'GA', width: 50 },
  //   { field: 'goalDifference', headerName: 'GD', width: 50 },
  //   { field: 'points', headerName: 'Pts', width: 50 },
  // ];

  // return (
  //   <Box sx={{ height: 400, width: '100%' }}>
  //      <DataGrid
  //         rows={standings.map((standing, index) => ({ ...standing, id: index + 1 }))}
  //         columns={columns}
  //         pageSize={5}
  //         rowsPerPageOptions={[5]}
  //       />
  //   </Box>
  // );

  return (
    <div className="league-table-container">
      <h2>LeagueTable</h2>
      <table className="league-table">
        <thead>
          <tr>
            <th>pos</th>
            <th>team</th>
            <th>MP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
            <th>Last 5</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="team-cell">
                {" "}
                <img
                  src={team.logo}
                  alt={""}
                  className="team-logo"
                />{" "}
                {team.user.username}
              </td>
              <td>{team.matchPlayed}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalDifference}</td>
              <td>{team.points}</td>
              <td className="last5-cell">
                {team.last5.map((result, idx) => (
                  <span key={idx} className={`result ${result}`}>
                    {result}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
