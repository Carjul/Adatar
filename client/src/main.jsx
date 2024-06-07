import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/Store/store'
import { Auth0Provider } from '@auth0/auth0-react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider domain={import.meta.env.VITE_PUBLIC_DOMAIN} clientId={import.meta.env.VITE_PUBLIC_CLIENT_ID}	authorizationParams={{ redirect_uri: window.location.origin}}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
)
