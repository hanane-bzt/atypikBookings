// const express = require("express");
// const fs = require("fs");
// const { createServer: createViteServer } = require("vite");
// const { resolve } = require("path");

// const isProd = process.env.NODE_ENV === "production";
// const port = process.env.PORT || 4000;

// async function startServer() {
//   const app = express();
//   let vite;

//   if (!isProd) {
//     vite = await createViteServer({
//       root: resolve(__dirname, "../client"),
//       server: { middlewareMode: true },
//       appType: "custom",
//     });
//     app.use(vite.middlewares);
//   } else {
//     app.use(express.static(resolve(__dirname, "../client/dist")));
//   }

//   app.use("*", async (req, res) => {
//     try {
//       const url = req.originalUrl;
//       let template, render;

//       if (!isProd) {
//         template = fs.readFileSync(resolve(__dirname, "../client/index.html"), "utf-8");
//         template = await vite.transformIndexHtml(url, template);
//         render = (await vite.ssrLoadModule("/src/ssr.jsx")).render;
//       } else {
//         template = fs.readFileSync(resolve(__dirname, "../client/dist/index.html"), "utf-8");
//         render = require("../client/dist/server/ssr.js").render;
//       }

//       const appHtml = render(url).html;
//       const html = template.replace("<!--ssr-outlet-->", appHtml);
//       res.status(200).set({ "Content-Type": "text/html" }).end(html);
//     } catch (e) {
//       vite?.ssrFixStacktrace(e);
//       console.error("❌ Erreur SSR:", e.stack);
//       res.status(500).end("Erreur SSR");
//     }
//   });

//   app.listen(port, () => {
//     console.log(`✅ SSR actif sur http://localhost:${port}`);
//   });
// }

// startServer();

// require('dotenv').config();          // ☑️  variables d’env
// const express = require('express');
// const fs = require('fs');
// const { createServer: createViteServer } = require('vite');
// const { resolve } = require('path');

// const isProd = process.env.NODE_ENV === 'production';
// const port   = process.env.PORT || 4000;

// async function startServer () {
//   const app = express();
//   let vite;

//   if (!isProd) {
//     vite = await createViteServer({
//       root: resolve(__dirname, '../client'),
//       server: { middlewareMode: true },
//       appType: 'custom'
//     });
//     app.use(vite.middlewares);
//   } else {
//     app.use(express.static(resolve(__dirname, '../client/dist')));
//   }

//   app.use('*', async (req, res) => {
//     try {
//       const url = req.originalUrl;
//       let template, render;

//       if (!isProd) {
//         template = fs.readFileSync(
//           resolve(__dirname, '../client/index.html'), 'utf-8'
//         );
//         template = await vite.transformIndexHtml(url, template);
//         render   = (await vite.ssrLoadModule('/src/ssr.jsx')).render;
//       } else {
//         template = fs.readFileSync(
//           resolve(__dirname, '../client/dist/index.html'), 'utf-8'
//         );
//         render   = require('../client/dist/server/ssr.js').render;
//       }

//       // ⬇️  ATTENDRE le rendu si c’est une Promise
//       const { html: appHtml } = await render(url);

//       const html = template.replace('<!--ssr-outlet-->', appHtml);
//       res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
//     } catch (e) {
//       vite?.ssrFixStacktrace?.(e);
//       console.error('❌ Erreur SSR :', e.stack);
//       res.status(500).end('Erreur SSR');
//     }
//   });

//   app.listen(port, () => {
//     console.log(`✅ SSR actif ➜  http://localhost:${port}`);
//   });
// }

// startServer();

// api/server.js
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const { createServer: createViteServer } = require('vite');
const { resolve } = require('path');

const isProd = process.env.NODE_ENV === 'production';
const port   = process.env.PORT || 4000;

async function startServer () {
  const app = express();
  let vite;

  if (!isProd) {
    vite = await createViteServer({
      root: resolve(__dirname, '../client'),
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(resolve(__dirname, '../client/dist')));
  }

  app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl;
    let template, render;

    if (!isProd) {
      template = fs.readFileSync(
        resolve(__dirname, '../client/index.html'),
        'utf-8'
      );
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/ssr.jsx')).render;
    } else {
      template = fs.readFileSync(
        resolve(__dirname, '../client/dist/index.html'),
        'utf-8'
      );
      render = require('../client/dist/server/ssr.js').render;
    }

    // ⬇️ on récupère le HTML et les données
    const { html: appHtml, initialPlaces } = await render(url);   // 🔥

    const html = template
      .replace('<!--ssr-outlet-->', appHtml)
      .replace(
        '<!--initial-data-->',
        `<script>window.__INITIAL_DATA__ = { places: ${JSON.stringify(
          initialPlaces
        )} }</script>`
      ); // 🔥

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    vite?.ssrFixStacktrace?.(e);
    console.error('❌ Erreur SSR :', e.stack);
    res.status(500).end('Erreur SSR');
  }
});


  app.listen(port, () => {
    console.log(`✅ SSR actif ➜  http://localhost:${port}`);
  });
}

startServer();

