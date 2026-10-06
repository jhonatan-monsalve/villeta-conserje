/**
 * 🔍 Google Search Console Analyzer
 * =================================
 * Conecta con la API de Google Search Console y genera un informe
 * completo de rendimiento SEO para tu sitio.
 *
 * Uso: node scripts/gsc-analyze.js [--days 28] [--pages] [--queries] [--devices] [--countries]
 *
 * Opciones:
 *   --days N       Número de días a analizar (por defecto: 28)
 *   --pages        Mostrar análisis de páginas
 *   --queries      Mostrar análisis de consultas/keywords
 *   --devices      Mostrar análisis por dispositivo
 *   --countries    Mostrar análisis por país
 *   --all          Mostrar todos los análisis
 *   --export       Exportar resultados a archivo JSON
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// ─── Configuración ──────────────────────────────────────────
const CREDENTIALS_PATH = path.resolve(__dirname, '..', 'gsc-credentials.json');
const ENV_PATH = path.resolve(__dirname, '..', '.env.local');

// Leer argumentos CLI
const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1;
};
const getArgValue = (name, defaultVal) => {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return defaultVal;
};

const DAYS = parseInt(getArgValue('days', '28'));
const SHOW_ALL = getArg('all');
const SHOW_PAGES = SHOW_ALL || getArg('pages');
const SHOW_QUERIES = SHOW_ALL || getArg('queries');
const SHOW_DEVICES = SHOW_ALL || getArg('devices');
const SHOW_COUNTRIES = SHOW_ALL || getArg('countries');
const EXPORT_JSON = getArg('export');

// Si no se especifica nada, mostrar todo
const SHOW_DEFAULT = !SHOW_PAGES && !SHOW_QUERIES && !SHOW_DEVICES && !SHOW_COUNTRIES;

// ─── Colores para la consola ────────────────────────────────
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  white: '\x1b[37m',
  bgBlue: '\x1b[44m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgRed: '\x1b[41m',
};

const c = (color, text) => `${colors[color]}${text}${colors.reset}`;

// ─── Utilidades de formato ──────────────────────────────────
function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function formatCTR(ctr) {
  return (ctr * 100).toFixed(2) + '%';
}

function formatPosition(pos) {
  return pos.toFixed(1);
}

function padRight(str, len) {
  return str.length >= len ? str.substring(0, len) : str + ' '.repeat(len - str.length);
}

function padLeft(str, len) {
  return str.length >= len ? str : ' '.repeat(len - str.length) + str;
}

function printSeparator(char = '─', len = 80) {
  console.log(c('dim', char.repeat(len)));
}

function printHeader(title) {
  console.log('');
  printSeparator('═');
  console.log(c('bright', `  📊  ${title}`));
  printSeparator('═');
}

function printSubHeader(title) {
  console.log('');
  console.log(c('cyan', `  ▸ ${title}`));
  printSeparator();
}

function printTable(headers, rows, widths) {
  // Header
  let headerLine = '  ';
  headers.forEach((h, i) => {
    headerLine += c('bright', padRight(h, widths[i])) + '  ';
  });
  console.log(headerLine);
  console.log('  ' + c('dim', '─'.repeat(widths.reduce((a, b) => a + b + 2, 0))));

  // Rows
  rows.forEach((row, rowIdx) => {
    let line = '  ';
    row.forEach((cell, i) => {
      const isNumeric = i > 0;
      const formatted = isNumeric ? padLeft(cell, widths[i]) : padRight(cell, widths[i]);

      // Color coding
      let colored = formatted;
      if (i === 0) colored = c('white', formatted);
      else colored = c('green', formatted);

      line += colored + '  ';
    });
    console.log(line);
  });
}

// ─── Funciones de la API ────────────────────────────────────
function loadSiteUrl() {
  if (!fs.existsSync(ENV_PATH)) {
    console.error(c('red', '❌ No se encontró .env.local'));
    console.error(c('yellow', '   Añade GSC_SITE_URL=https://tusitio.com a .env.local'));
    process.exit(1);
  }

  const envContent = fs.readFileSync(ENV_PATH, 'utf8');
  const match = envContent.match(/GSC_SITE_URL=(.+)/);
  if (!match) {
    console.error(c('red', '❌ GSC_SITE_URL no encontrada en .env.local'));
    console.error(c('yellow', '   Añade: GSC_SITE_URL=https://tusitio.com'));
    process.exit(1);
  }

  return match[1].trim();
}

async function authenticate() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(c('red', '❌ No se encontró gsc-credentials.json'));
    console.error(c('yellow', '   Sigue la guía en scripts/gsc-setup.md para crear las credenciales'));
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  return auth;
}

function getDateRange() {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3); // GSC tiene ~3 días de retraso

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - DAYS);

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
}

async function querySearchAnalytics(searchconsole, siteUrl, dimensions, rowLimit = 25) {
  const { startDate, endDate } = getDateRange();

  const response = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
      dataState: 'final',
    },
  });

  return response.data.rows || [];
}

async function getSitemaps(searchconsole, siteUrl) {
  const response = await searchconsole.sitemaps.list({ siteUrl });
  return response.data.sitemap || [];
}

// ─── Análisis ───────────────────────────────────────────────
function analyzeOverview(rows) {
  let totalClicks = 0;
  let totalImpressions = 0;
  let totalCTR = 0;
  let totalPosition = 0;
  let count = rows.length;

  rows.forEach((row) => {
    totalClicks += row.clicks;
    totalImpressions += row.impressions;
    totalCTR += row.ctr;
    totalPosition += row.position;
  });

  return {
    totalClicks,
    totalImpressions,
    avgCTR: count > 0 ? totalCTR / count : 0,
    avgPosition: count > 0 ? totalPosition / count : 0,
    totalQueries: count,
  };
}

function printOverview(overview) {
  printHeader(`RESUMEN GENERAL — Últimos ${DAYS} días`);

  console.log('');
  console.log(`  ${c('cyan', '🖱️  Clics totales:')}       ${c('bright', formatNumber(overview.totalClicks))}`);
  console.log(`  ${c('cyan', '👁️  Impresiones:')}         ${c('bright', formatNumber(overview.totalImpressions))}`);
  console.log(`  ${c('cyan', '📈 CTR promedio:')}          ${c('bright', formatCTR(overview.avgCTR))}`);
  console.log(`  ${c('cyan', '📍 Posición promedio:')}     ${c('bright', formatPosition(overview.avgPosition))}`);
  console.log(`  ${c('cyan', '🔎 Keywords detectadas:')}   ${c('bright', overview.totalQueries.toString())}`);

  // Indicadores de salud
  console.log('');
  printSubHeader('Indicadores de Salud SEO');

  const ctrStatus = overview.avgCTR > 0.05 ? '🟢 Bueno' : overview.avgCTR > 0.02 ? '🟡 Mejorable' : '🔴 Bajo';
  const posStatus = overview.avgPosition < 10 ? '🟢 Top 10' : overview.avgPosition < 20 ? '🟡 Página 2' : '🔴 Baja visibilidad';

  console.log(`  CTR:      ${ctrStatus}`);
  console.log(`  Posición: ${posStatus}`);
}

function printQueryAnalysis(rows) {
  printSubHeader('Top Keywords / Consultas de Búsqueda');

  if (rows.length === 0) {
    console.log(c('yellow', '  ⚠ No hay datos de consultas disponibles'));
    return;
  }

  const sorted = [...rows].sort((a, b) => b.clicks - a.clicks);
  const top = sorted.slice(0, 20);

  const tableRows = top.map((row, i) => [
    `${i + 1}. ${row.keys[0]}`,
    formatNumber(row.clicks),
    formatNumber(row.impressions),
    formatCTR(row.ctr),
    formatPosition(row.position),
  ]);

  printTable(
    ['Consulta', 'Clics', 'Impresiones', 'CTR', 'Posición'],
    tableRows,
    [45, 8, 12, 8, 8]
  );

  // Keywords con oportunidad (alta impresión, bajo CTR)
  const opportunities = sorted
    .filter((r) => r.impressions > 10 && r.ctr < 0.03 && r.position < 20)
    .slice(0, 10);

  if (opportunities.length > 0) {
    printSubHeader('💡 Oportunidades (alta impresión + bajo CTR)');
    const oppRows = opportunities.map((row, i) => [
      `${i + 1}. ${row.keys[0]}`,
      formatNumber(row.impressions),
      formatCTR(row.ctr),
      formatPosition(row.position),
    ]);
    printTable(
      ['Consulta', 'Impresiones', 'CTR', 'Posición'],
      oppRows,
      [45, 12, 8, 8]
    );
  }
}

function printPageAnalysis(rows) {
  printSubHeader('Top Páginas por Rendimiento');

  if (rows.length === 0) {
    console.log(c('yellow', '  ⚠ No hay datos de páginas disponibles'));
    return;
  }

  const sorted = [...rows].sort((a, b) => b.clicks - a.clicks);
  const top = sorted.slice(0, 15);

  const tableRows = top.map((row, i) => {
    const urlPath = row.keys[0].replace(/https?:\/\/[^/]+/, '') || '/';
    return [
      `${i + 1}. ${urlPath}`,
      formatNumber(row.clicks),
      formatNumber(row.impressions),
      formatCTR(row.ctr),
      formatPosition(row.position),
    ];
  });

  printTable(
    ['Página', 'Clics', 'Impresiones', 'CTR', 'Posición'],
    tableRows,
    [40, 8, 12, 8, 8]
  );

  // Páginas con problemas
  const issues = sorted.filter((r) => r.ctr < 0.01 && r.impressions > 50);
  if (issues.length > 0) {
    printSubHeader('⚠️  Páginas con bajo rendimiento (necesitan atención)');
    issues.slice(0, 5).forEach((row, i) => {
      const urlPath = row.keys[0].replace(/https?:\/\/[^/]+/, '') || '/';
      console.log(`  ${c('red', `${i + 1}.`)} ${urlPath}`);
      console.log(`     Impresiones: ${formatNumber(row.impressions)} | CTR: ${formatCTR(row.ctr)} | Pos: ${formatPosition(row.position)}`);
      console.log(`     ${c('yellow', '→ Sugerencia: Mejorar title y meta description para esta página')}`);
    });
  }
}

function printDeviceAnalysis(rows) {
  printSubHeader('Rendimiento por Dispositivo');

  if (rows.length === 0) {
    console.log(c('yellow', '  ⚠ No hay datos de dispositivos disponibles'));
    return;
  }

  const deviceNames = { DESKTOP: '🖥️  Escritorio', MOBILE: '📱 Móvil', TABLET: '📟 Tablet' };

  const tableRows = rows.map((row) => [
    deviceNames[row.keys[0]] || row.keys[0],
    formatNumber(row.clicks),
    formatNumber(row.impressions),
    formatCTR(row.ctr),
    formatPosition(row.position),
  ]);

  printTable(
    ['Dispositivo', 'Clics', 'Impresiones', 'CTR', 'Posición'],
    tableRows,
    [20, 8, 12, 8, 8]
  );
}

function printCountryAnalysis(rows) {
  printSubHeader('Rendimiento por País (Top 10)');

  if (rows.length === 0) {
    console.log(c('yellow', '  ⚠ No hay datos de países disponibles'));
    return;
  }

  const sorted = [...rows].sort((a, b) => b.clicks - a.clicks).slice(0, 10);

  const tableRows = sorted.map((row, i) => [
    `${i + 1}. ${row.keys[0]}`,
    formatNumber(row.clicks),
    formatNumber(row.impressions),
    formatCTR(row.ctr),
    formatPosition(row.position),
  ]);

  printTable(
    ['País', 'Clics', 'Impresiones', 'CTR', 'Posición'],
    tableRows,
    [20, 8, 12, 8, 8]
  );
}

function printSitemapStatus(sitemaps) {
  printSubHeader('Estado de Sitemaps');

  if (sitemaps.length === 0) {
    console.log(c('yellow', '  ⚠ No hay sitemaps registrados'));
    console.log(c('yellow', '  → Sugerencia: Envía un sitemap en Google Search Console'));
    return;
  }

  sitemaps.forEach((sm) => {
    const status = sm.errors === 0 ? c('green', '✅') : c('red', '❌');
    console.log(`  ${status} ${sm.path}`);
    if (sm.lastSubmitted) console.log(`     Último envío: ${new Date(sm.lastSubmitted).toLocaleDateString('es')}`);
    if (sm.errors > 0) console.log(`     ${c('red', `Errores: ${sm.errors}`)}`);
    if (sm.warnings > 0) console.log(`     ${c('yellow', `Advertencias: ${sm.warnings}`)}`);
  });
}

// ─── Exportar a JSON ────────────────────────────────────────
function exportResults(data) {
  const exportPath = path.resolve(__dirname, '..', `gsc-report-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(exportPath, JSON.stringify(data, null, 2));
  console.log('');
  console.log(c('green', `  ✅ Informe exportado a: ${exportPath}`));
}

// ─── Programa principal ─────────────────────────────────────
async function main() {
  console.log('');
  console.log(c('bgBlue', c('white', '                                                        ')));
  console.log(c('bgBlue', c('white', '    🔍 Google Search Console Analyzer                   ')));
  console.log(c('bgBlue', c('white', '    Villeta Conserje — Análisis SEO                     ')));
  console.log(c('bgBlue', c('white', '                                                        ')));

  // Cargar credenciales y URL
  const siteUrl = loadSiteUrl();
  console.log(`\n  ${c('dim', 'Sitio:')} ${c('cyan', siteUrl)}`);
  console.log(`  ${c('dim', 'Período:')} últimos ${DAYS} días`);

  // Autenticación
  console.log(`  ${c('dim', 'Autenticando...')}`);
  const auth = await authenticate();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  console.log(`  ${c('green', '✅ Conectado correctamente')}`);

  const exportData = {};

  try {
    // 1. Resumen general (siempre se muestra)
    console.log(`  ${c('dim', 'Obteniendo datos de consultas...')}`);
    const queryRows = await querySearchAnalytics(searchconsole, siteUrl, ['query'], 1000);
    const overview = analyzeOverview(queryRows);
    printOverview(overview);
    exportData.overview = overview;

    // 2. Top queries
    if (SHOW_DEFAULT || SHOW_QUERIES) {
      printHeader('ANÁLISIS DE KEYWORDS');
      printQueryAnalysis(queryRows);
      exportData.queries = queryRows;
    }

    // 3. Top pages
    if (SHOW_DEFAULT || SHOW_PAGES) {
      console.log(`  ${c('dim', 'Obteniendo datos de páginas...')}`);
      const pageRows = await querySearchAnalytics(searchconsole, siteUrl, ['page'], 100);
      printHeader('ANÁLISIS DE PÁGINAS');
      printPageAnalysis(pageRows);
      exportData.pages = pageRows;
    }

    // 4. Dispositivos
    if (SHOW_DEFAULT || SHOW_DEVICES) {
      console.log(`  ${c('dim', 'Obteniendo datos de dispositivos...')}`);
      const deviceRows = await querySearchAnalytics(searchconsole, siteUrl, ['device']);
      printHeader('ANÁLISIS POR DISPOSITIVO');
      printDeviceAnalysis(deviceRows);
      exportData.devices = deviceRows;
    }

    // 5. Países
    if (SHOW_DEFAULT || SHOW_COUNTRIES) {
      console.log(`  ${c('dim', 'Obteniendo datos de países...')}`);
      const countryRows = await querySearchAnalytics(searchconsole, siteUrl, ['country'], 25);
      printHeader('ANÁLISIS POR PAÍS');
      printCountryAnalysis(countryRows);
      exportData.countries = countryRows;
    }

    // 6. Sitemaps
    console.log(`  ${c('dim', 'Verificando sitemaps...')}`);
    const sitemaps = await getSitemaps(searchconsole, siteUrl);
    printHeader('SITEMAPS');
    printSitemapStatus(sitemaps);
    exportData.sitemaps = sitemaps;

    // 7. Recomendaciones finales
    printHeader('📋 RECOMENDACIONES');
    console.log('');

    if (overview.avgCTR < 0.03) {
      console.log(`  ${c('yellow', '⚠')} ${c('white', 'CTR bajo:')} Revisa tus títulos y meta descripciones para hacerlos más atractivos.`);
    }
    if (overview.avgPosition > 15) {
      console.log(`  ${c('yellow', '⚠')} ${c('white', 'Posición baja:')} Necesitas mejorar el contenido y los backlinks de tu sitio.`);
    }
    if (overview.totalImpressions < 100) {
      console.log(`  ${c('yellow', '⚠')} ${c('white', 'Pocas impresiones:')} Considera crear más contenido optimizado para SEO.`);
    }
    if (overview.totalClicks > 50 && overview.avgCTR > 0.05) {
      console.log(`  ${c('green', '✅')} ${c('white', 'Buen rendimiento general!')} Sigue creando contenido de calidad.`);
    }

    console.log(`  ${c('blue', 'ℹ')} ${c('white', 'Ejecuta con --all para ver todos los análisis detallados.')}`);
    console.log(`  ${c('blue', 'ℹ')} ${c('white', 'Ejecuta con --export para exportar resultados a JSON.')}`);
    console.log('');

    // Exportar si se solicitó
    if (EXPORT_JSON) {
      exportResults(exportData);
    }

  } catch (error) {
    if (error.code === 403) {
      console.error('');
      console.error(c('red', '  ❌ Error de permisos (403)'));
      console.error(c('yellow', '  La cuenta de servicio no tiene acceso a esta propiedad.'));
      console.error(c('yellow', '  Verifica que añadiste el client_email como usuario en Search Console.'));
      console.error(c('dim', `  Sitio: ${siteUrl}`));
    } else if (error.code === 401) {
      console.error('');
      console.error(c('red', '  ❌ Error de autenticación (401)'));
      console.error(c('yellow', '  Las credenciales son inválidas o han expirado.'));
      console.error(c('yellow', '  Regenera la clave JSON en Google Cloud Console.'));
    } else {
      console.error('');
      console.error(c('red', `  ❌ Error: ${error.message}`));
      if (error.errors) {
        error.errors.forEach((e) => console.error(c('yellow', `     ${e.message}`)));
      }
    }
    process.exit(1);
  }

  printSeparator('═');
  console.log(c('dim', `  Análisis completado: ${new Date().toLocaleString('es')}`));
  printSeparator('═');
  console.log('');
}

main().catch(console.error);
