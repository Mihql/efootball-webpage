// Navigation.jsx

import React from 'react';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import '../styles/NavBar.css';

// import { auth } from '../firebase';

function NavBar() {
    // const [user, setUser] = useState(null);

    // useEffect( ()=>{
    //     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    //         setUser(currentUser)
    //     })

    //     return ()=> unsubscribe();
    // }, [])

    return (
    //   <Nav>
    //     <Logo>MyApp</Logo>
    //     <NavLinks>
    //       <NavLink to="/">Home</NavLink>
    //       <NavLink to="/profile">Profile</NavLink>
    //       <NavLink to="/logout">Logout</NavLink>
    //     </NavLinks>
    //   </Nav>
          <nav className="nav">
          <div className="efootballhub-net-by">
              <div className="icon-large" />
          </div>

          <div className="home">
              {/* <h1>Welcome to MyApp!</h1> */}
              {"" ? (
                  <>
                  </>

              ) : (
                  <Link to="/" className="navbar-link">Login</Link>
              )}
          </div>

          <div className="nav-links">
              <Link to="/" className="nav-link">Players</Link>
              <Link to="/" className="nav-link">Leagues</Link>

          </div>
      </nav>
    );
}

export default NavBar;

// const Nav = styled.nav`
//   background: #000;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 2rem;
// `;

// const Logo = styled.div`
//   color: #fff;
//   font-size: 1.5rem;
//   font-weight: bold;
// `;

// const NavLinks = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const NavLink = styled(Link)`
//   color: #fff;
//   text-decoration: none;
//   font-size: 1rem;
//   &:hover {
//     color: #f0f0f0;
//   }
// `;
