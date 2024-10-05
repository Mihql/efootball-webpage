// src/components/UserProfile.jsx

import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector((state)=> state.user)
  return (
    // <ProfileContainer>
    //   <ProfileCard>
    //     <ProfileImage src="https://via.placeholder.com/150" alt="User Avatar" />
    //     <ProfileInfo>
    //       <h2>{user.name}</h2>
    //       <p>Email: {user.email}</p>
    //       <p>Role: {user.role}</p>
    //       <EditButton>Edit Profile</EditButton>
    //     </ProfileInfo>
    //   </ProfileCard>
    // </ProfileContainer>
    <Card>
      <Avatar src="https://c.animaapp.com/QXbFrOOV/img/efhub24-icon-large-alpha-png@2x.png" alt="User Avatar" />
      <Details>
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
        <Role>{user.role}</Role>
      </Details>
      <EditButton>Edit Profile</EditButton>
    </Card>
  );
};

export default UserProfile;

// const ProfileContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 2rem;
// `;

// const ProfileCard = styled.div`
//   background: #fff;
//   padding: 2rem;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ProfileImage = styled.img`
//   border-radius: 50%;
//   width: 150px;
//   height: 150px;
//   margin-bottom: 1rem;
// `;

// const ProfileInfo = styled.div`
//   text-align: center;
// `;

// const EditButton = styled.button`
//   background: #007bff;
//   color: #fff;
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   cursor: pointer;
//   margin-top: 1rem;
//   &:hover {
//     background: #0056b3;
//   }
// `;

const Card = styled.div`
  background: #1a1a1a;
  color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Details = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  margin: 0;
`;

const Email = styled.p`
  margin: 0.5rem 0;
`;

const Role = styled.p`
  margin: 0;
  font-weight: bold;
`;

const EditButton = styled.button`
  background: #fff;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;
