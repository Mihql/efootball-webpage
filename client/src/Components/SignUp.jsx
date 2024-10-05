import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/SignUp.css"

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('/api/register', {
        email,
        password,
        username,
      });
      
      console.log('User registered:', response.data);
      alert('Registration successful!');
      navigate('/')
      
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert(`Registration error: ${error.response?.data?.message || error.message}`);

      // Set error message to state to display it to the user
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className='signup-container'>
    <form className='signup-form' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
      <a className='login-link' href="/login">already have an account</a>
      {error && <p style={{ color: 'blue' }}>{error}</p>}
    </form>
    </div>
  );
};

export default SignUp;
