// main.jsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './providers/UserProvider';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { PlaceProvider } from './providers/PlaceProvider';

const initialData = window.__INITIAL_DATA__ || {};
const {
  initialUser = null,
  initialPlaces = [],
  initialBookings = [],
  initialPerks = [],
  env = {}
} = initialData;

hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <HelmetProvider>
      <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID || ''}>
        <UserProvider initialUser={initialUser}>
          <PlaceProvider initialPlaces={initialPlaces}>
            <BrowserRouter>
              <App
                initialUser={initialUser}
                initialPlaces={initialPlaces}
                initialBookings={initialBookings}
                initialPerks={initialPerks}
              />
            </BrowserRouter>
          </PlaceProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
