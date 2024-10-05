import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/Home.css";
// import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import { setUser } from '../reducer/userSlice';

const Home = () => {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  // console.log(user);
 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
        console.log('ROLE:', user.role)
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user.role]);

  return (
    <div className="home-container">
      <h1>Registered Users</h1>
      <div className="user-list">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <p style={{color: 'red'}}>{user.role}</p>
            <Link to={`/user/${user._id}`}>View Profile</Link>
            <p>{}</p>
          </div>
        ))}
      </div>
      {user.id ? <div>Welcome, {user.name} {user.role ? <div>{user.role}</div> : <div></div>}</div> : <div>Please log in.</div>}
    </div>
  );
};

export default Home;

// const Card = styled.div`
//   background: #1a1a1a;
//   color: #fff;
//   padding: 2rem;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   display: flex;
//   align-items: center;
//   gap: 2rem;
// `;

// const Avatar = styled.img`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
// `;

// const Details = styled.div`
//   flex: 1;
// `;

// const Name = styled.h2`
//   margin: 0;
// `;

// const Email = styled.p`
//   margin: 0.5rem 0;
// `;

// const Role = styled.p`
//   margin: 0;
//   font-weight: bold;
// `;

// const EditButton = styled.button`
//   background: #fff;
//   color: #000;
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   cursor: pointer;
//   &:hover {
//     background: #f0f0f0;
//   }
// `;
