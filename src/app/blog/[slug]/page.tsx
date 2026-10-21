import ExportedImage from "next-image-export-optimizer";
import { Container } from "@/components/layout/Container";
import { notFound } from "next/navigation";
import { HiClock, HiCalendar, HiUser, HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/Button";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { getPostData, getAllPostSlugs, getSortedPostsData } from "@/lib/blog";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map(p => ({ slug: p.params.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPostData(params.slug);
    if (!post) return { title: "Artículo no encontrado" };

    const url = `${SITE_CONFIG.url}/blog/${post.slug}`;
    const rawImage = post.image || 'images/og-villeta-conserje.jpg';
    const imageUrl = rawImage.startsWith('http')
        ? rawImage
        : `${SITE_CONFIG.url}/${rawImage.replace(/^\/+/, '')}`;

    return {
        title: post.seoTitle || post.title,
        description: post.excerpt,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: url,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                }
            ],
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
    };
}

export default async function BlogPostDetail({ params }: Props) {
    const post = await getPostData(params.slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": new URL(post.image, `${SITE_CONFIG.url}/`).href,
        "datePublished": post.date,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Villeta Conserje",
            "logo": {
                "@type": "ImageObject",
                "url": "https://villetaconserje.com/logotipo.png"
            }
        },
        "description": post.excerpt
    };

    const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE_CONFIG.url },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_CONFIG.url}/blog` },
            { "@type": "ListItem", "position": 3, "name": post.seoTitle || post.title, "item": postUrl }
        ]
    };

    // Artículos relacionados: primero los de la misma categoría, luego los más recientes
    const others = getSortedPostsData().filter((p) => p.slug !== post.slug);
    const related = [
        ...others.filter((p) => p.category === post.category),
        ...others.filter((p) => p.category !== post.category),
    ].slice(0, 3);

    return (
        <main className="min-h-screen bg-background text-black dark:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <article className="py-20 lg:py-32">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <nav aria-label="Ruta de navegación" className="mb-12 text-sm">
                            <ol className="flex flex-wrap items-center gap-2 text-text-sub">
                                <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
                                <li aria-hidden="true">/</li>
                                <li>
                                    <Link href="/blog" className="inline-flex items-center gap-1 text-primary font-bold uppercase tracking-wider hover:gap-2 transition-all">
                                        <HiArrowLeft /> Blog
                                    </Link>
                                </li>
                            </ol>
                        </nav>

                        <header className="mb-12">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">
                                {post.category}
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-main dark:text-white leading-tight mb-8">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border dark:border-white/10 text-sm text-text-sub dark:text-gray-400">
                                <div className="flex items-center gap-2 font-medium">
                                    <HiUser className="text-primary" /> {post.author}
                                </div>
                                <div className="flex items-center gap-2 font-medium">
                                    <HiCalendar className="text-primary" /> {post.date}
                                </div>
                                <div className="flex items-center gap-2 font-medium">
                                    <HiClock className="text-primary" /> {post.readTime} de lectura
                                </div>
                            </div>
                        </header>

                        <div className="aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
                            <ExportedImage
                                src={post.image}
                                alt={post.title}
                                width={1200}
                                height={675}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>

                        <div
                            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-text-sub dark:prose-p:text-gray-300 prose-li:text-text-sub dark:prose-li:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div className="mt-20 p-8 sm:p-12 bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/20 text-center">
                            <h3 className="text-2xl font-display font-bold text-text-main dark:text-white mb-4">
                                ¿Quiere ver estos resultados en su propiedad?
                            </h3>
                            <p className="text-text-sub dark:text-gray-400 mb-8 max-w-lg mx-auto">
                                No deje su inversión al azar. Permítanos valorar su finca y diseñar una estrategia de Superanfitrión a su medida.
                            </p>
                            <p className="text-sm text-text-sub dark:text-gray-400 mb-8 -mt-4">
                                Conozca nuestro{" "}
                                <Link href="/administracion-airbnb-villeta" className="text-primary font-semibold underline underline-offset-4">servicio de administración de Airbnb en Villeta</Link>.
                            </p>
                            <Link href="/#valoracion">
                                <Button variant="primary" size="lg" className="px-10">
                                    Solicitar Mi Valoración Gratuita
                                </Button>
                            </Link>
                        </div>

                        {related.length > 0 && (
                            <section className="mt-20" aria-labelledby="relacionados">
                                <h2 id="relacionados" className="text-2xl font-display font-bold text-text-main dark:text-white mb-6">
                                    Artículos relacionados
                                </h2>
                                <ul className="grid gap-4 sm:grid-cols-3">
                                    {related.map((r) => (
                                        <li key={r.slug}>
                                            <Link
                                                href={`/blog/${r.slug}`}
                                                className="block h-full p-5 rounded-2xl border border-border hover:border-primary/40 hover:shadow-md transition-all"
                                            >
                                                <span className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">{r.category}</span>
                                                <span className="block font-semibold text-text-main dark:text-white leading-snug">{r.seoTitle || r.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </Container>
            </article>
        </main>
    );
}
