import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = ({ keycloak }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5294/userinfo', {
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        });
        setUserInfo(response.data);
        console.log(`Bearer ${keycloak.token}`)
        console.log(`Data`, userInfo)
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (keycloak && keycloak.token) {
      fetchUserInfo();
    }
  }, [keycloak]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome, {userInfo.username}{userInfo.name}</h1>
          <p>User ID: {userInfo.UserId}</p>
          <p>Email Verified: {userInfo.EmailVerified}</p>
        </header>
      </div>
  );
};

export default App;
