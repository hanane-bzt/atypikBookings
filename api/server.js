const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const connectWithDB = require("./config/db");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const Place = require("./models/Place.js");
const User = require("./models/User.js");
const adminRoutes = require("./routes/admin");
const { renderHTML } = require('./ssr/render.js');
const path = require("path");
const fs = require("fs");
const axios = require('axios');
 
dotenv.config();
 
// Connexion à la base de données
connectWithDB();
 
// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
const app = express();
 
// Middleware de compression pour optimiser les réponses
app.use(compression());
 
// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.VITE_BASE_URL ||'http://localhost:5173', 'https://atypikhouse-nd5q.onrender.com'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.options('*', cors());
app.use(
  cookieSession({
    name: "session",
    maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
    secure: true,
    sameSite: "none",
    httpOnly: true,
  })
);
app.use(express.json());
 
// Routes API
app.use("/api/users", require("./routes/user"));
app.use("/api/user", require("./routes/user"));
// app.use("/api/admin", require("./routes/admin"));
app.use("/api/admin", adminRoutes);
app.use("/api/places", require("./routes/place"));
app.use("/api/bookings", require("./routes/booking"));
app.use("/", require("./routes"));
const sitemapRoutes = require('./routes/sitemap');
app.use('/', sitemapRoutes);
 
const clientDistPath = path.join(__dirname, '../client/dist');
app.use('/assets', express.static(path.join(clientDistPath, 'assets')));
app.use('/googleaa2effcdefc4ebba.html',
  express.static(path.join(clientDistPath, 'googleaa2effcdefc4ebba.html')));
app.use('/manifest.json', express.static(path.join(clientDistPath, 'manifest.json')));
app.use('/favicon.ico', express.static(path.join(clientDistPath, 'favicon.ico')));
app.use('/robots.txt', express.static(path.join(clientDistPath, 'robots.txt')));

app.use('/service-worker.js', express.static(path.join(clientDistPath, 'service-worker.js')));
 
// Route de test pour /api
app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});
 
// Handler SSR placé tout à la fin
app.get("*", async (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
 
  // Serve static files directly if they match common asset extensions
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  if (req.url.match(/\.(js|css|png|jpg|svg|ico|json|txt|woff2?)$/)) {
    return next();
  }
 
  try {
    console.log('SSR Express: rendu SSR pour', req.originalUrl);
    // Pagination SSR : extraire page depuis query string
    const urlObj = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    const page = parseInt(urlObj.searchParams.get('page')) || 1;
    const limit = 12; // même valeur que côté client
    console.log('SSR: page demandée:', page, 'limit:', limit);
   
    // Fetch initial data for SSR selon l'URL
    let initialPlaces = [];
    let initialBookings = [];
    let initialPerks = [];
    let paginationData = { total: 0, page: 1, pages: 1 };
   
    // Si c'est la page d'accueil, récupérer les places avec pagination
    if (req.originalUrl === '/' || req.originalUrl.startsWith('/?page=')) {
      try {
        console.log('SSR: Récupération des places pour la page d\'accueil...');
        const skip = (page - 1) * limit;
        const [places, total] = await Promise.all([
          Place.find({ isActive: true }).skip(skip).limit(limit).lean(),
          Place.countDocuments({ isActive: true })
        ]);
        initialPlaces = places;
        paginationData = {
          total,
          page,
          pages: Math.ceil(total / limit)
        };
        console.log('SSR: places récupérées directement depuis DB:', initialPlaces.length, 'pour la page', page, 'total pages:', paginationData.pages);
      } catch (dbError) {
        console.error('SSR: Erreur DB:', dbError.message);
        initialPlaces = [];
        paginationData = { total: 0, page: 1, pages: 1 };
      }
    }
   
    // Si c'est une page admin, récupérer les données appropriées
    if (req.originalUrl.startsWith('/admin/')) {
      console.log('SSR: Page admin détectée:', req.originalUrl);
     
      // Pour admin/dashboard, récupérer les bookings
      if (req.originalUrl === '/admin/dashboard') {
        try {
          const bookingsResponse = await axios.get(`${process.env.VITE_BASE_URL}/api/admin/bookings`);
          initialBookings = bookingsResponse.data.data || [];
          console.log('SSR: bookings récupérées pour dashboard:', initialBookings.length);
        } catch (error) {
          console.error('SSR: Erreur récupération bookings:', error.message);
        }
      }
     
      // Pour admin/equipments, récupérer les perks
      if (req.originalUrl === '/admin/equipments') {
        try {
          console.log('SSR: Récupération des perks pour equipments...');
          const uniquePerks = await Place.distinct('perks');
          const allPerksSet = new Set();
         
          // Ajouter les perks de base
          const basePerks = ['wifi', 'parking', 'tv', 'radio', 'pets', 'enterence'];
          basePerks.forEach(perk => {
            allPerksSet.add(perk);
          });
         
          // Ajouter les perks uniques de la base de données
          uniquePerks.forEach(perk => {
            allPerksSet.add(perk);
          });
 
          initialPerks = Array.from(allPerksSet).map(name => ({ name }));
          console.log('SSR: perks récupérées pour equipments:', initialPerks.length);
        } catch (error) {
          console.error('SSR: Erreur récupération perks:', error.message);
          initialPerks = [];
        }
      }
     
      // Pour admin/properties, récupérer les places
      if (req.originalUrl === '/admin/properties') {
        try {
          const placesResponse = await axios.get(`${process.env.VITE_BASE_URL}/api/admin/places`);
          initialPlaces = placesResponse.data.data || [];
          console.log('SSR: places récupérées pour properties:', initialPlaces.length);
        } catch (error) {
          console.error('SSR: Erreur récupération places admin:', error.message);
        }
      }
     
      // Pour admin/contact-messages, récupérer les messages de contact
      if (req.originalUrl === '/admin/contact-messages') {
        try {
          const contactResponse = await axios.get(`${process.env.VITE_BASE_URL}/api/contact`);
          initialBookings = contactResponse.data || []; // Utilise initialBookings pour les messages de contact
          console.log('SSR: messages de contact récupérés:', initialBookings.length);
        } catch (error) {
          console.error('SSR: Erreur récupération messages de contact:', error.message);
        }
      }
     
      // Pour admin/comments, récupérer les commentaires
      if (req.originalUrl === '/admin/comments') {
        try {
          console.log('SSR: Récupération des commentaires...');
          const places = await Place.find({ "reviews.0": { $exists: true } })
            .populate("reviews.user", "name")
            .populate("reviews.replies.user", "name")
            .select("reviews")
            .lean()
            .exec();
         
          const allReviews = places.reduce(
            (acc, place) => [...acc, ...place.reviews],
            []
          );
         
          initialPerks = allReviews; // Utilise initialPerks pour les commentaires
          console.log('SSR: commentaires récupérés:', initialPerks.length);
        } catch (error) {
          console.error('SSR: Erreur récupération commentaires:', error.message);
          initialPerks = [];
        }
      }
    }
    let initialUser = null;
    if (req.session && req.session.userId) {
      try {
        initialUser = await User.findById(req.session.userId).lean();
      } catch (userError) {
        console.error("Error fetching user:", userError);
      }
    }
    const html = await renderHTML(req.originalUrl, {
      initialPlaces,
      initialUser,
      initialBookings,
      initialPerks,
      paginationData,
      env: {
        VITE_GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID,
        VITE_BASE_URL: process.env.VITE_BASE_URL,
      },
    });
    res.status(200).send(html);
  } catch (error) {
    console.error("❌ SSR error:", error);
    if (!res.headersSent) {
      res.status(500).send("Erreur interne du serveur lors du rendu SSR.");
    }
  }
});
 
console.log("🔍 ENV CHECK:", {
  VITE_BASE_URL: !!process.env.VITE_BASE_URL,
  CLOUDINARY_NAME: !!process.env.CLOUDINARY_NAME,
  SESSION_SECRET: !!process.env.SESSION_SECRET
});
 
 
const PORT = process.env.PORT || 4000;
if (require.main === module) {
  console.log(`🚀 Tentative de démarrage sur le port ${PORT}...`);
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Serveur lancé avec succès sur le port ${PORT}`);
  });
}
 
module.exports = app;
