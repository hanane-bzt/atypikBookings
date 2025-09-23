// client/src/ssr.jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import axios from 'axios';
import 'dotenv/config'; // Pour charger les variables d'env

export async function render(url) {
  const initialData = {
    initialPlaces: [],
    initialUser: null,
    initialBookings: [],
    initialPerks: [],
    paginationData: { total: 0, page: 1, pages: 0 },
    env: {
      VITE_GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID,
      VITE_BASE_URL: process.env.VITE_BASE_URL,
    },
  };

  try {
    if (url === '/') {
      const API_URL = process.env.API_BASE_URL || 'http://localhost:4000' || 'https://atypikhouse-nd5q.onrender.com/';
      const res = await axios.get(`${API_URL}/api/places?page=1&limit=12`);
      const data = res.data;
      initialData.initialPlaces = data.places || [];
      initialData.paginationData = data.pagination || { total: 0, page: 1, pages: 0 };
      console.log('✅ SSR loaded places:', initialData.initialPlaces.length);
    }
  } catch (err) {
    console.error('❌ SSR error loading places:', err.message);
  }

  const html = renderToString(
    <StaticRouter location={url}>
      <App initialData={initialData} />
    </StaticRouter>
  );

  return {
    html,
    initialData,
  };
}
