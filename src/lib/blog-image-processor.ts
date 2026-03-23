import sharp from 'sharp';

/**
 * Interface defining the input required for processing a blog image.
 */
export interface ProcessImageInput {
    fileBuffer: Buffer;
    fileName: string; // The original filename (for logging or reference)
    keyword: string;  // The main keyword (H1) for SEO
    location: string; // The location or category context
    altText: string;  // Alt text for accessibility/SEO
    caption: string;  // Caption text
}

/**
 * Interface defining the result of the image processing.
 */
export interface ProcessedImageResult {
    fileName: string; // The new SEO-optimized filename
    buffer: Buffer;   // The processed image buffer (WebP)
    mimeType: string; // Always 'image/webp'
    size: number;     // Size in bytes
}

const MAX_SIZE_BYTES = 100 * 1024; // 100KB Limit

/**
 * Sanitizes a string for use in a filename (SEO friendly).
 * - Normalizes characters (removes accents/diacritics).
 * - Converts to lowercase.
 * - Replaces non-alphanumeric characters with hyphens.
 * - Trims leading/trailing hyphens.
 */
function sanitizeFilenamePart(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove combining diacritics
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
}

/**
 * Processes a blog image according to requirements:
 * 1. Validates mandatory metadata (Alt Text, Caption).
 * 2. Renames file to [keyword]-[location].webp.
 * 3. Converts to WebP format.
 * 4. Ensures file size is under 100KB by adjusting quality and/or dimensions.
 * 
 * @param input The image data and metadata.
 * @returns A promise resolving to the processed image result.
 * @throws Error if metadata is missing or processing fails.
 */
export async function processBlogImage(input: ProcessImageInput): Promise<ProcessedImageResult> {
    const { fileBuffer, keyword, location, altText, caption } = input;

    // 1. Validation Logic
    if (!altText || altText.trim() === '') {
        throw new Error("El texto alternativo (ALT) es obligatorio. Por favor, descríbalo para mejorar el SEO.");
    }
    if (!caption || caption.trim() === '') {
        throw new Error("El pie de foto (Caption) es obligatorio.");
    }
    if (!keyword || keyword.trim() === '') {
        throw new Error("La palabra clave (H1) es obligatoria para generar el nombre del archivo.");
    }
    if (!location || location.trim() === '') {
        throw new Error("La ubicación es obligatoria para generar el nombre del archivo.");
    }

    // 2. Generate SEO Filename
    const sanitizedKeyword = sanitizeFilenamePart(keyword);
    const sanitizedLocation = sanitizeFilenamePart(location);
    const newFileName = `${sanitizedKeyword}-${sanitizedLocation}.webp`;

    // 3. Image Processing
    // Start with a reasonable high quality (80) and a max width suitable for blogs (e.g., 1200px)
    let quality = 80;
    let currentBuffer: Buffer;

    // Initial processing
    currentBuffer = await sharp(fileBuffer)
        .resize({ width: 1200, withoutEnlargement: true }) // Standard blog width constraint
        .webp({ quality })
        .toBuffer();

    // 4. Size Enforcement Loop (< 100KB)
    // If file is too large, iteratively reduce quality
    while (currentBuffer.length > MAX_SIZE_BYTES && quality > 10) {
        quality -= 10;
        currentBuffer = await sharp(fileBuffer)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality })
            .toBuffer();
    }

    // If still too large after quality reduction, aggressively reduce dimensions
    if (currentBuffer.length > MAX_SIZE_BYTES) {
        let width = 1000;
        // Hard limit to avoid infinite loops, though 200px is very small.
        while (currentBuffer.length > MAX_SIZE_BYTES && width > 400) {
            width -= 100;
            currentBuffer = await sharp(fileBuffer)
                .resize({ width, withoutEnlargement: true })
                .webp({ quality: 10 }) // Use lowest acceptable quality
                .toBuffer();
        }
    }

    // Final check
    if (currentBuffer.length > MAX_SIZE_BYTES) {
        throw new Error(`No se pudo procesar la imagen a menos de 100KB. El archivo original es demasiado complejo o grande.`);
    }

    return {
        fileName: newFileName,
        buffer: currentBuffer,
        mimeType: 'image/webp',
        size: currentBuffer.length
    };
}
