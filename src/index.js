import React from 'react';
import ReactDOM from 'react-dom';
import Keycloak from 'keycloak-js';
import App from './App';
import './index.css';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'master',
    clientId: 'postman-client',
    // clientSecret: 'c43af123-d35c-4e89-9f4b-73274725ba37' // اضافه کردن Client Secret جدید اینجا
});
keycloak.init({
    onLoad: 'login-required',
    redirectUri: 'http://localhost:3000/'
}).then(authenticated => {
    if (authenticated) {
        ReactDOM.render(
            <React.StrictMode>
                <App keycloak={keycloak} />
            </React.StrictMode>,
            document.getElementById('root')
        );
    } else {
        console.log('User is not authenticated');
        keycloak.login();
    }
}).catch(error => {
    console.error('Error initializing Keycloak:', error);
});
