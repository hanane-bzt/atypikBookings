// // client/src/ssr.jsx
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom/server';
// import App from './App';

// export function render(url, context = {}) {
//   const appHtml = renderToString(
//     <StaticRouter location={url}>
//       <App />
//     </StaticRouter>
//   );

//   return { html: appHtml };
// }


// // client/src/ssr.jsx
// import React from 'react';
// import axios from 'axios';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom/server';
// import App from './App';

// /**
//  * Rendu SSR.  
//  * - On pré-charge les données nécessaires selon l’URL  
//  * - On les renvoie pour que le serveur les injecte dans le HTML
//  */
// export async function render(url) {
//   let initialData = {};

//   // 👇 Exemple : pour la page d’accueil on charge les “places”
//   if (url === '/') {
//     try {
//       const api = process.env.API_BASE_URL || 'http://localhost:4000';
//       const { data } = await axios.get(`${api}/api/places`);
//       initialData.places = data.places;
//     } catch (e) {
//       console.error('SSR - erreur chargement places:', e.message);
//       initialData.places = [];
//     }
//   }

//   const appHtml = renderToString(
//     <StaticRouter location={url}>
//       <App initialData={initialData} />
//     </StaticRouter>
//   );

//   return { html: appHtml, initialData };
// }

// import React              from 'react';
// import axios              from 'axios';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter }   from 'react-router-dom/server';
// import App                from './App';

// /** Rendu + pré-chargement des données */
// export async function render(url) {
//   // ⇢ données que l’on veut transmettre au client
//   let initialPlaces = [];

//   if (url === '/') {
//     try {
//       const api =
//         process.env.API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:4000';
//       const { data } = await axios.get(`${api}/api/places`);
//       initialPlaces = data.places ?? [];
//     } catch (err) {
//       console.error('SSR: échec chargement /api/places ->', err.message);
//     }
//   }

//   const appHtml = renderToString(
//     <StaticRouter location={url}>
//       <App initialPlaces={initialPlaces} />   {/* 🔥 */}
//     </StaticRouter>
//   );

//   return { html: appHtml, initialPlaces };    // 🔥
// }

// client/src/ssr.jsx
import React from 'react';
import axios from 'axios';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export async function render(url) {
  let initialData = {};

  // Préchargement des lieux pour la page d'accueil
  if (url === '/') {
    try {
      const api = process.env.API_BASE_URL || 'http://localhost:4000';
      const { data } = await axios.get(`${api}/api/places`);
      initialData.places = data.places;
    } catch (e) {
      console.error('❌ SSR - erreur chargement places:', e.message);
      initialData.places = [];
    }
  }

  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App initialData={initialData} />
    </StaticRouter>
  );

  return {
    html: appHtml,
    initialPlaces: initialData.places,
  };
}
