import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const initialData = window.__INITIAL_DATA__ || {};

hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App initialData={initialData} />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
