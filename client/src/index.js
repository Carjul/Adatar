import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/Store/store'
import { Provider } from 'react-redux'

const {REACT_APP_DOMAIN,REACT_APP_CLIENT_ID}=process.env;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider domain={REACT_APP_DOMAIN} clientId={REACT_APP_CLIENT_ID} redirectUri={window.location.origin}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    </Auth0Provider>
  </React.StrictMode>
);


