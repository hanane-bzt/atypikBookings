const express = require('express');
const router = express.Router();
const Place = require('../models/Place'); // Assurez-vous d'importer votre modèle Place

router.get('/sitemap.xml', async (req, res) => {
  try {
    const places = await Place.find({}, '_id'); // Récupère seulement les IDs des lieux
    const baseUrl = 'https://atypikhouse-nd5q.onrender.com';

    let sitemap = `<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
  </url>
  <url>
    <loc>${baseUrl}/login</loc>
  </url>
  <url>
    <loc>${baseUrl}/register</loc>
  </url>
  <url>
    <loc>${baseUrl}/account</loc>
  </url>
  <url>
    <loc>${baseUrl}/account/places</loc>
  </url>
  <url>
    <loc>${baseUrl}/account/places/new</loc>
  </url>
  <url>
    <loc>${baseUrl}/account/bookings</loc>
  </url>
  <url>
    <loc>${baseUrl}/OwnerBenefitsPage</loc>
  </url>
  <url>
    <loc>${baseUrl}/legal</loc>
  </url>
  <url>
    <loc>${baseUrl}/admin/dashboard</loc>
  </url>
  <url>
    <loc>${baseUrl}/admin/users</loc>
  </url>
  <url>
    <loc>${baseUrl}/admin/equipments</loc>
  </url>
  <url>
    <loc>${baseUrl}/admin/properties</loc>
  </url>
  <url>
    <loc>${baseUrl}/admin/comments</loc>
  </url>
`;

    // Ajouter les URLs dynamiques des lieux
    places.forEach(place => {
      sitemap += `  <url>\n    <loc>${baseUrl}/place/${place._id}</loc>\n  </url>\n`;
    });

    sitemap += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error);
    res.status(500).send('Erreur lors de la génération du sitemap.');
  }
});

module.exports = router;