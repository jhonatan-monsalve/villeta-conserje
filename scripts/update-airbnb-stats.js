const { createClient } = require('@supabase/supabase-js');

// 1. Validar variables de entorno necesarias
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

// 2. Inicializar cliente de Supabase con la Service Key (para evadir RLS de forma segura)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false
  }
});

// Función para extraer estadísticas de Airbnb desde el HTML
function extractAirbnbStats(html) {
  // Intentar primero a través de JSON-LD
  try {
    const jsonLdRegex = /<script [^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
    let match;
    while ((match = jsonLdRegex.exec(html)) !== null) {
      try {
        const json = JSON.parse(match[1]);
        const items = Array.isArray(json) ? json : [json];
        for (const item of items) {
          if (item['@type'] === 'AggregateRating' || (item['aggregateRating'] && item['aggregateRating']['@type'] === 'AggregateRating')) {
            const agg = item['aggregateRating'] || item;
            const rating = parseFloat(agg.ratingValue);
            const reviews = parseInt(agg.ratingCount, 10);
            if (!isNaN(rating) && !isNaN(reviews)) {
              return { rating, reviews, method: 'JSON-LD' };
            }
          }
        }
      } catch (e) {
        // Ignorar JSON malformado
      }
    }
  } catch (e) {
    // Ignorar fallos de JSON-LD
  }

  // Regex de respaldo 1: Estructura interna de Airbnb
  const ratingRegex = /"ratingValue":\s*([0-9.]+)\s*,\s*"ratingCount":\s*"([0-9]+)"/i;
  const match = html.match(ratingRegex);
  if (match) {
    const rating = parseFloat(match[1]);
    const reviews = parseInt(match[2], 10);
    return { rating, reviews, method: 'Regex 1' };
  }

  // Regex de respaldo 2: Otra variante de estructura
  const altRegex = /"AggregateRating",\s*"ratingValue":\s*([0-9.]+),\s*"ratingCount":\s*"([0-9]+)"/i;
  const altMatch = html.match(altRegex);
  if (altMatch) {
    const rating = parseFloat(altMatch[1]);
    const reviews = parseInt(altMatch[2], 10);
    return { rating, reviews, method: 'Regex 2' };
  }

  throw new Error("No se encontraron la calificación ni el conteo de reseñas en el HTML de Airbnb.");
}

// Función principal
async function run() {
  console.log('--- Iniciando actualización de estadísticas de Airbnb ---');

  try {
    // Obtener todos los listados de la base de datos
    const { data: listings, error: fetchError } = await supabase
      .from('airbnb_listings')
      .select('*');

    if (fetchError) {
      throw new Error(`Error obteniendo listados de Supabase: ${fetchError.message}`);
    }

    if (!listings || listings.length === 0) {
      console.log('No se encontraron propiedades en la tabla airbnb_listings para actualizar.');
      return;
    }

    console.log(`Se encontraron ${listings.length} propiedades a actualizar.`);

    for (const listing of listings) {
      console.log(`\nProcesando propiedad: "${listing.name}" (ID: ${listing.id})`);
      console.log(`URL: ${listing.url}`);

      try {
        // Realizar la petición HTTP con cabeceras para simular un navegador real
        const response = await fetch(listing.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
          }
        });

        if (!response.ok) {
          throw new Error(`Error en petición HTTP: Status ${response.status}`);
        }

        const html = await response.text();
        const stats = extractAirbnbStats(html);

        console.log(`Resultados extraídos exitosamente mediante ${stats.method}:`);
        console.log(`- Calificación: ${stats.rating}`);
        console.log(`- Reseñas: ${stats.reviews}`);

        // Actualizar base de datos
        const { error: updateError } = await supabase
          .from('airbnb_listings')
          .update({
            reviews_count: stats.reviews,
            rating: stats.rating,
            updated_at: new Date().toISOString()
          })
          .eq('id', listing.id);

        if (updateError) {
          throw new Error(`Error actualizando base de datos para ID ${listing.id}: ${updateError.message}`);
        }

        console.log(`Base de datos actualizada exitosamente para "${listing.name}".`);
      } catch (err) {
        console.error(`Error procesando propiedad "${listing.name}":`, err.message);
      }
    }
  } catch (err) {
    console.error('Error fatal durante la ejecución:', err.message);
    process.exit(1);
  }

  console.log('\n--- Finalizada la actualización de estadísticas de Airbnb ---');
}

run();
