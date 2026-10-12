import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // /admin y /login no se bloquean aquí: llevan noindex y Google debe poder leerlo.
                disallow: ['/private/'],
            },
        ],
        sitemap: 'https://villetaconserje.com/sitemap.xml',
    }
}

