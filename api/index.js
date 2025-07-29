// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectWithDB = require('./config/db');
// const cookieSession = require('cookie-session');
// const cookieParser = require('cookie-parser');
// const cloudinary = require('cloudinary').v2;
// const adminRoutes = require('./routes/admin');

// // Connexion à la base de données
// connectWithDB();

// // Configuration de Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const app = express();

// // Gestion des cookies
// app.use(cookieParser());

// // Configuration unique de CORS
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );

// // Initialisation de cookie-session middleware
// app.use(
//   cookieSession({
//     name: 'session',
//     maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
//     keys: [process.env.SESSION_SECRET],
//     secure: true,
//     sameSite: 'none',
//     httpOnly: true,
//   })
// );

// // Middleware pour traiter le JSON
// app.use(express.json());

// // Utilisation des routes API
// app.use('/api/users', require('./routes/user'));
// app.use('/api/admin', adminRoutes);
// app.use('/api/places', require('./routes/place'));

// // Route de base
// app.use('/', require('./routes'));

// // Lancement du serveur
// app.listen(process.env.PORT || 8000, (err) => {
//   if (err) {
//     console.log('Erreur lors de la connexion au serveur: ', err);
//   }
//   console.log(`Le serveur fonctionne sur le port ${process.env.PORT}`);
// });

// module.exports = app;
//---------------------------
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectWithDB = require('./config/db');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { createServer: createViteServer } = require('vite');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const placeRoutes = require('./routes/place');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 4000;

// ✅ Connexion MongoDB
connectWithDB();

// ✅ Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Middlewares globaux
app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
    secure: true,
    sameSite: 'none',
    httpOnly: true,
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

// ✅ Routes API
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/places', placeRoutes);

// ✅ SSR (Server Side Rendering)
async function startServer() {
  const vite = await createViteServer({
    root: path.resolve(__dirname, '../client'),
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const templatePath = path.resolve(__dirname, '../client/index.html');
      let template = fs.readFileSync(templatePath, 'utf-8');

      template = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule('/src/ssr.jsx');
      const { html } = render(url);

      const finalHtml = template.replace('<!--ssr-outlet-->', html);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      console.error('❌ Erreur SSR :', err.stack);
      res.status(500).end(err.stack);
    }
  });

  app.listen(port, () => {
    console.log(`✅ Serveur lancé : http://localhost:${port}`);
  });
}

startServer();
