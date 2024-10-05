import React, {useState} from 'react';
import axiox from 'axios';

const LeagueCreation = () => {
    const [name, setName] = useState('');
    const [season, setSeason] = useState('');
    const [maxTeams, setMaxTeams] = useState(''); 
    const [rules, setRules] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axiox.post('/api/leagues/create', {
                name, season, maxTeams, rules 
            });
            console.log(response.data, "LEAGUE DATA");
            alert("League created succesfully!");
        }
        catch(err) {
            console.error('Error creating league', err);
            alert('Error creating league');
        }
    }

    return (
        <form onSubmit={handelSubmit}>
            <input type="text" placeholder='League Name' value={name} onChange={(e) => setName(e.target.value)} name="" id="" />
            <input type="text" placeholder='Season' value={season} onChange={(e) => setSeason(e.target.value)} name="" id="" />
            <input type="number" placeholder='Max Teams' value={maxTeams} onChange={(e) => setMaxTeams(e.target.value)} />
            <textarea placeholder='Rules' value={rules} onChange={(e) => setRules(e.target.value)} name="" id=""></textarea>
            <button type="submit">Create League</button>
        </form>
    )
}

export default LeagueCreation;

