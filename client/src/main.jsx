import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/Store/store'
import { Provider } from 'react-redux'
import App from './App';


const cliente=import.meta.env.VITE_APP_CLIENT_ID;
const domains =import.meta.env.VITE_APP_DOMAIN;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider domain={domains} clientId={cliente} redirectUri={window.location.origin}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
/* 
REACT_APP_API=http://139.144.177.216:3001
REACT_APP_DOMAIN=dev-35dy5wz22m0uql2f.us.auth0.com
REACT_APP_CLIENT_ID=DZkkkzyucPxIKzlNoH3ru3Al0NL8OzL1 */
