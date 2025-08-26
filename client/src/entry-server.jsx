// // // client/src/entry-server.jsx
// // import React from 'react';
// // import axios from 'axios';
// // import { renderToString } from 'react-dom/server';
// // import { StaticRouter } from 'react-router-dom/server';
// // import App from './App';
// // import './styles/index.css';
// // import { HelmetProvider } from 'react-helmet-async';

// // export async function render(url, initialData) {
// //   const helmetContext = {};
// //   let data = initialData;
// //   if (url === '/') {
// //     try {
// //       const api = process.env.API_BASE_URL || 'http://localhost:4000';
// //       const { data: placesData } = await axios.get(`${api}/api/places`);
// //       data = { ...data, places: placesData.places };
// //     } catch (e) {
// //       console.error('❌ SSR - erreur chargement places:', e.message);
// //       data = { ...data, places: [] };
// //     }
// //   }

// //   const appHtml = renderToString(
// //     <HelmetProvider context={helmetContext}>
// //       <StaticRouter location={url}>
// //         <App initialData={data} />
// //       </StaticRouter>
// //     </HelmetProvider>
// //   );

// //   const { helmet } = helmetContext;

// //   return {
// //     appHtml,
// //     helmet,
// //     initialData: data,
// //     modules: [],
// //   };
// // }

// // client/entry-server.jsx
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom/server';
// import App from './App';
// import axios from 'axios';

// export async function render(url, manifest, { initialData = {} } = {}) {
//   const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:4000';
//   let places = initialData.initialPlaces || [];

//   // 🔄 Charger les données depuis l’API si on est sur la page d’accueil
//   if (url === '/') {
//     try {
//       const response = await axios.get(`${apiBaseUrl}/api/places`);
//       places = response.data.places || [];
//       console.log("✅ SSR: données des places récupérées :", places.length);
//     } catch (error) {
//       console.error("❌ SSR: erreur de récupération des places :", error.message);
//     }
//   }

//   const appHtml = renderToString(
//     <StaticRouter location={url}>
//       <App
//         initialData={{
//           ...initialData,
//           initialPlaces: places
//         }}
//       />
//     </StaticRouter>
//   );

//   return {
//     html: appHtml,
//     initialData: {
//       ...initialData,
//       initialPlaces: places
//     }
//   };
// }
// client/entry-server.jsx
// import React from "react";
// import { StaticRouter } from "react-router-dom/server";
// import { renderToString } from "react-dom/server";
// import App from "./App";
// import { HelmetProvider } from "react-helmet-async";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { UserProvider } from "./providers/UserProvider";
// import { PlaceProvider } from "./providers/PlaceProvider";

// export async function render(url, initialData, res) {
//   const helmetContext = {};

//   const { initialUser = null, initialPlaces = [], env = {} } = initialData;

//   const modules = new Set();
//   const app = (
//     <HelmetProvider context={helmetContext}>
//       <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
//         <UserProvider initialUser={initialUser}>
//           <PlaceProvider initialPlaces={initialPlaces}>
//             <StaticRouter location={url}>
//               <App
//                 initialUser={initialUser}
//                 initialPlaces={initialPlaces}
//                 initialBookings={initialData.initialBookings || []}
//                 initialPerks={initialData.initialPerks  || []}
//               />
//             </StaticRouter>
//           </PlaceProvider>
//         </UserProvider>
//       </GoogleOAuthProvider>
//     </HelmetProvider>
//   );
//   console.log('DEBUG: initialData in entry-server:', initialData);
//   const appHtml = renderToString(app);
//   console.log('DEBUG: appHtml from renderToString:', appHtml ? appHtml.substring(0, 500) : 'null');

//   return {
//     appHtml,
//     helmet: helmetContext.helmet,
//     initialData,
//     modules: Array.from(modules)
//   };
// }

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
