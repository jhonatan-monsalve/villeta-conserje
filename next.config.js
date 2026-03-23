/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        loader: "custom",
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'www.transparenttextures.com',
            },
            {
                protocol: 'https',
                hostname: 'a0.muscache.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            }
        ],
    },
    transpilePackages: ["next-image-export-optimizer"],
    env: {
        nextImageExportOptimizer_imageFolderPath: "public/images",
        nextImageExportOptimizer_exportFolderPath: "out",
        nextImageExportOptimizer_quality: "80",
        nextImageExportOptimizer_storePicturesInWEBP: "true",
        nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
        nextImageExportOptimizer_generateAndUseBlurImages: "true",
        nextImageExportOptimizer_remoteImageCacheTTL: "86400",
    },
};

module.exports = nextConfig;

// NOTA SEO: La URL /auditoria fue renombrada a /valoracion (Mar 2026).
// Configura en tu hosting un redirect 301: /auditoria -> /valoracion
// Netlify: añade en public/_redirects -> /auditoria /valoracion 301
// Vercel: este redirect se maneja automáticamente con next.config redirects()
