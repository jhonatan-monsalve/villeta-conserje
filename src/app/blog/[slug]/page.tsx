import ExportedImage from "next-image-export-optimizer";
import { Container } from "@/components/layout/Container";
import { notFound } from "next/navigation";
import { HiClock, HiCalendar, HiUser, HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/Button";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { getPostData, getAllPostSlugs } from "@/lib/blog";

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

    return {
        title: `${post.title} | Villeta Conserje`,
        description: post.excerpt,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: url,
            images: [post.image],
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
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
        "image": post.image,
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
                "url": "https://www.villetaconserje.com/logotipo.png"
            }
        },
        "description": post.excerpt
    };

    return (
        <main className="min-h-screen bg-background text-black dark:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="py-20 lg:py-32">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-12 hover:gap-3 transition-all"
                        >
                            <HiArrowLeft /> Volver al Blog
                        </Link>

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
                                No deje su inversión al azar. Permítanos auditar su finca y diseñar una estrategia de Superanfitrión a su medida.
                            </p>
                            <Link href="/#auditoria">
                                <Button variant="primary" size="lg" className="px-10">
                                    Solicitar Mi Auditoría Gratuita
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </article>
        </main>
    );
}
