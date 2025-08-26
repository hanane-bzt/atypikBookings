const path = require('path');
const fs = require('fs');

const manifestPath = path.join(__dirname, '../../client/dist/.vite/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const templatePath = path.join(__dirname, '../../client/dist/index.html');

async function renderHTML(url, initialData) {
  try {
    const ssrAssetsDir = path.join(__dirname, '../../client/dist-ssr/assets');
    const entryServerFile = fs.readdirSync(ssrAssetsDir).find(f => f.startsWith('entry-server') && f.endsWith('.js'));
    if (!entryServerFile) throw new Error('Aucun fichier entry-server-*.js trouvé dans dist-ssr/assets');
    const entryServerPath = path.join(ssrAssetsDir, entryServerFile);
    const entryServerUrl = 'file://' + entryServerPath.replace(/\\/g, '/');

    const { render } = await import(entryServerUrl);
    const { appHtml, helmet, initialData: _initialData, modules } = await render(url, initialData);

    console.log('DEBUG: appHtml received from render:', appHtml ? appHtml.substring(0, 500) : 'null');

    let ssrContent = appHtml;
    if (!ssrContent || ssrContent.trim() === '') {
      ssrContent = '<!-- SSR_CONTENT_EMPTY -->';
    } else {
      ssrContent = `<!-- SSR_CONTENT_START -->${ssrContent}<!-- SSR_CONTENT_END -->`;
    }
    console.log('DEBUG: ssrContent length:', ssrContent ? ssrContent.length : 'null');
    console.log('DEBUG: ssrContent starts with:', ssrContent ? ssrContent.substring(0, 100) : 'null');

    const template = fs.readFileSync(templatePath, 'utf-8');

    const initialDataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(_initialData).replace(/</g, '\u003c')}</script>`;
    console.log(initialDataScript)
    const cssLinks = manifest['index.html']?.css?.map(file => `<link rel="stylesheet" href="/${file}">`).join('\n') || '';

    const clientEntry = manifest['client.html']?.file || manifest['index.html']?.file;
    const prodScripts = clientEntry ? `<script type="module" src="/${clientEntry}"></script>` : '';

    const html = template
      .replace('<!--ssr-outlet-->', ssrContent)
      .replace('<!--helmet-title-->', helmet?.title?.toString() || '')
      .replace('<!--helmet-meta-->', helmet?.meta?.toString() || '')
      .replace('<!--initial-data-->', initialDataScript)
      .replace('<!--preload-links-->', cssLinks)
      .replace('<!--prod-scripts-->', prodScripts);

    console.log('DEBUG: final html length:', html ? html.length : 'null');
    console.log('DEBUG: final html content (first 2000 chars):', html ? html.substring(0, 2000) : 'null');
    return html;

  } catch (error) {
    console.error("❌ renderHTML failed to render React:", error);
    throw error;
  }
}

module.exports = { renderHTML };