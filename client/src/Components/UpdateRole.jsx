import React, {useState} from 'react'
import axios from 'axios'

const UpdateRole = () => {
    const[userId, setUserId] = useState('');
    const[role, setRole] = useState('player');
    const[message, setMessage] = useState('')

    const handelSubmit = async (e) => {
        e.preventDefault();

        try{
            const responce = await axios.post('/api/update-role', {userId, role});
            setMessage(responce.data.message);
        }
        catch (err) {
            setMessage("Error updating role");
        }
    };

  return (
    <div>
        <form onSubmit={handelSubmit}>
            <input type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder='User ID' 
            required/>

            <select value={role} onChange={(e)=> setRole(e.target.value)} name="" id="">
                <option value="player">Player</option>
                <option value="coach">Coach</option>
                <option value="admin">admin</option>
            </select>
            <button type="submit">Update Role</button>
        </form>
        {message && <p>{message}</p>}
    </div>
  )
}

export default UpdateRole;