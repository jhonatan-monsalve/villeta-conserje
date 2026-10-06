const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.resolve(__dirname, '..', 'gsc-credentials.json');
const ENV_PATH = path.resolve(__dirname, '..', '.env.local');

function loadSiteUrl() {
  const envContent = fs.readFileSync(ENV_PATH, 'utf8');
  const match = envContent.match(/GSC_SITE_URL=(.+)/);
  return match ? match[1].trim() : null;
}

async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  return auth;
}

async function checkIndexStatus() {
  const siteUrl = loadSiteUrl();
  if (!siteUrl) {
    console.error("GSC_SITE_URL no encontrada en .env.local");
    return;
  }

  const auth = await authenticate();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  // Obtenemos los sitemaps
  let urlsToCheck = [siteUrl + '/'];
  try {
    const sitemapsResponse = await searchconsole.sitemaps.list({ siteUrl });
    console.log("Revisando el sitemap para obtener URLs...");
    // Aunque podríamos parsear el XML del sitemap real, aquí probaremos algunas URLs clave
    urlsToCheck = [
      siteUrl + '/',
      siteUrl + '/valoracion',
      siteUrl + '/administracion-airbnb-villeta',
      siteUrl + '/blog',
      siteUrl + '/privacidad',
      siteUrl + '/terminos',
      siteUrl + '/blog/nuevo-estandar-airbnb-villeta',
      siteUrl + '/blog/duplicar-ingresos-finca-superhost',
      siteUrl + '/blog/semana-santa-villeta-2026-finca',
      siteUrl + '/blog/agroturismo-villeta-experiencias-finca'
    ];
  } catch(e) {
    console.log("No se pudieron listar sitemaps o URLs, usando lista por defecto.");
  }

  console.log(`\nVerificando estado de indexación de ${urlsToCheck.length} URLs en ${siteUrl}...\n`);

  for (const url of urlsToCheck) {
    try {
      const propertyUrl = siteUrl.endsWith('/') ? siteUrl : siteUrl + '/';
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: propertyUrl,
          languageCode: "es-CO"
        }
      });
      
      const result = res.data.inspectionResult.indexStatusResult;
      const verdict = result.verdict; // PASS, FAIL, NEUTRAL
      const coverageState = result.coverageState; // Estado específico, ej: Indexed, not submitted in sitemap
      
      let statusIcon = verdict === 'PASS' ? '✅' : (verdict === 'FAIL' ? '❌' : '⚠️');
      console.log(`${statusIcon} ${url}`);
      console.log(`   Estado: ${coverageState}`);
      if (verdict !== 'PASS') {
         console.log(`   Razón: ${result.robotstxtState}, ${result.indexingState}`);
      }
      
      // La API tiene una cuota estricta (aprox 2000 queries/dia, y limite por minuto)
      // Agregamos un pequeño delay
      await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      console.error(`❌ Error al inspeccionar ${url}:`, error.message);
    }
  }
}

checkIndexStatus().catch(console.error);
