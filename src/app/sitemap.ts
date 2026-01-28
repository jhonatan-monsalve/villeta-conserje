import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blogData'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.villetaconserje.com'

    // Base pages
    const routes = ['', '/blog', '/privacidad', '/terminos'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Blog posts
    const blogPosts = BLOG_POSTS.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date), // Note: Make sure post.date is a valid date string
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...routes, ...blogPosts]
}
