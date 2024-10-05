import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/UserProfile.css";
// import styled from 'styled-components';

const UserProfile = () => {
      const { userId } = useParams();

    const [user, setUser] = useState(null);
    const [username, setUserName] = useState('');
    // const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/api/users/${userId}`);
          console.log(response.data.username, "RES DATA-USERNAME");
          setUser(response.data);
          setUserName(response.data.username);
        //   setEmail(response.data.email);
          setRole(response.data.role);
    
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
  
      fetchUser();
    }, [userId]);

    const handleUpdate = async () => {

        try{
           const response = await axios.post('/api/update-user', { userId, username, role });
           
            alert('User updated successfully!');
            setUser(response.data.user); // Update the user state with the new data
            navigate('/');
        }
        catch (err) {
            console.log("Error updating user", err);
        }
    }

    const handleDelete = async (userId) => {
      try {
          await axios.delete(`/api/usersDelete/${userId}`);
          // setUser(user.filter(user => user._id !== userId));
          alert('User deleted successfully');
          navigate('/');
      } catch (error) {
          console.error('Error deleting user:', error);
          alert('Error deleting user');
      }
  };

    if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h1>{user.username} Profile</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <h2>Update Details</h2>
      <form onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
        <div>
        <input type="text" value={username} onChange={e => setUserName(e.target.value)} placeholder="Name" />
        {/* <input type="email" value={email}  onChange={e => setEmail(e.target.value)} placeholder="Email" /> */}
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="player">Player</option>
          <option value="coach">Coach</option>
          <option value="admin">Admin</option>
        </select>
        </div>
        <button type="submit">Update</button>
      </form>
      <button onClick={() => handleDelete(user._id)}>Delete User</button>
    </div>
  );
};

export default UserProfile;

// const EditForm = styled.form`
//   background: #fff;
//   padding: 2rem;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   display: flex;
//   flex-direction: column;
//   width: 300px;
//   margin: auto;
// `;

// const InputField = styled.div`
//   margin-bottom: 1rem;

//   label {
//     display: block;
//     margin-bottom: 0.5rem;
//   }

//   input {
//     width: 100%;
//     padding: 0.5rem;
//     border-radius: 4px;
//     border: 1px solid #ccc;
//   }
// `;

// const SaveButton = styled.button`
//   background: #007bff;
//   color: #fff;
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     background: #0056b3;
//   }
// `;