import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// ✅ Récupérer les données injectées par le serveur
const initialData = window.__INITIAL_DATA__ || {};

hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <BrowserRouter>
      <App initialData={initialData} />
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
