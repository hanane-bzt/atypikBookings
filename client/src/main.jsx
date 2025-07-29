import React from 'react';
import { hydrateRoot } from 'react-dom/client'; // ⬅️ hydrateRoot au lieu de createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

hydrateRoot( // ⬅️ hydrateRoot ici
  document.getElementById('root'),
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Enregistrer le service worker
serviceWorkerRegistration.register();
