const fs = require('fs');
const path = require('path');

const LISTINGS = [
    {
        id: '1402264507691687773',
        folder: 'casa-bambu',
        prefix: 'bambu'
    },
    {
        id: '1787473188757920090',
        folder: 'casa-bellevue',
        prefix: 'bellevue'
    }
];

async function downloadPhoto(url, filepath) {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
}

async function processListing(listing) {
    console.log(`\n🔍 Extrayendo fotos reales de Airbnb para ${listing.folder} (ID: ${listing.id})...`);

    const url = `https://www.airbnb.es/rooms/${listing.id}`;
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'es-ES,es;q=0.9'
        }
    });

    const html = await res.text();

    // Extraer URLs de las fotos reales del hospedaje
    const regex = /https:\/\/a0\.muscache\.com\/im\/pictures\/[a-zA-Z0-9_\-\/\.]+\.jpeg/g;
    const allMatches = Array.from(new Set(html.match(regex) || []));

    const listingPhotos = allMatches.filter(img => 
        img.includes(`Hosting-${listing.id}`) || img.includes('Hosting-')
    );

    console.log(`📸 Encontradas ${listingPhotos.length} fotos en Airbnb.`);

    const targetDir = path.join(__dirname, '..', 'public', 'images', listing.folder);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const topPhotos = listingPhotos.slice(0, 10);

    for (let i = 0; i < topPhotos.length; i++) {
        const photoUrl = `${topPhotos[i]}?im_w=1200`;
        const fileName = `${listing.prefix}-${i + 1}.jpg`;
        const filePath = path.join(targetDir, fileName);

        console.log(`  └ Guardando foto ${i + 1}/10: ${fileName}...`);
        try {
            await downloadPhoto(photoUrl, filePath);
        } catch (err) {
            console.error(`     ❌ Error bajando foto ${i + 1}:`, err.message);
        }
    }

    console.log(`✅ ${listing.folder}: 10 fotos descargadas correctamente.`);
}

async function run() {
    for (const listing of LISTINGS) {
        await processListing(listing);
    }
}

run();
