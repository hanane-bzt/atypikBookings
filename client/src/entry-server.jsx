import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./providers/UserProvider";
import { PlaceProvider } from "./providers/PlaceProvider";
import axios from 'axios';

export async function render(url, initialData = {}, res) {
  const helmetContext = {};
  const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:4000';

  // Charger les données si on est sur la page d'accueil
  let initialPlaces = initialData.initialPlaces || [];

  if (url === '/') {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/places`);
      initialPlaces = response.data.places || [];
      console.log('✅ SSR: loaded', initialPlaces.length, 'places');
    } catch (err) {
      console.error('❌ SSR: error loading places:', err.message);
    }
  }

  const initialUser = initialData.initialUser || null;
  const helmetModules = new Set();

  const app = (
    <HelmetProvider context={helmetContext}>
      <GoogleOAuthProvider clientId={initialData.env?.VITE_GOOGLE_CLIENT_ID || ''}>
        <UserProvider initialUser={initialUser}>
          <PlaceProvider initialPlaces={initialPlaces}>
            <StaticRouter location={url}>
              <App
                initialUser={initialUser}
                initialPlaces={initialPlaces}
                initialBookings={initialData.initialBookings || []}
                initialPerks={initialData.initialPerks || []}
              />
            </StaticRouter>
          </PlaceProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );

  const appHtml = renderToString(app);

  return {
    appHtml,
    helmet: helmetContext.helmet,
    initialData: {
      ...initialData,
      initialPlaces
    },
    modules: Array.from(helmetModules),
  };
}
