import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = ({ keycloak }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log({keycloak});

    const fetchMessage = async () => {
      try {
        const response = await axios.get('http://localhost:5294/test', {
          headers: {
            Authorization: `bearer ${keycloak.token}`
          }
        });
        setMessage(response.data.message);
        console.log('success:', response.data.message);

      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessage();
  }, [keycloak]);

  return (
      <div className="App">
        <header className="App-header">
          <p>{message}</p>
        </header>
      </div>
  );
};

export default App;