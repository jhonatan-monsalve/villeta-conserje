import ExportedImage from "next-image-export-optimizer";
import { Container } from "@/components/layout/Container";
import { getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { HiArrowRight, HiClock } from "react-icons/hi";
import { Button } from "@/components/ui/buttons/Button";

export function BlogPreview() {
    // Only show the 2 most recent posts
    const posts = getSortedPostsData().slice(0, 2);

    return (
        <section className="py-16 sm:py-24 bg-zinc-50 dark:bg-zinc-950/50" id="blog-preview">
            <Container>
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Blog & Recursos</span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white leading-tight">
                            Estrategias para Dueños de Fincas en Airbnb
                        </h2>
                    </div>
                    <Link href="/blog" className="shrink-0">
                        <Button variant="outline" className="gap-2">
                            Ver todos los artículos <HiArrowRight />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border dark:border-white/5">
                            <Link href={`/blog/${post.slug}`} className="flex flex-col sm:flex-row h-full">
                                <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden">
                                    <ExportedImage
                                        src={post.image}
                                        alt={post.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-primary/90 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-[10px] text-text-sub font-bold uppercase tracking-tighter mb-3">
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-border"></span>
                                            <span className="flex items-center gap-1"><HiClock /> {post.readTime}</span>
                                        </div>

                                        <h3 className="text-lg font-display font-bold text-text-main dark:text-white group-hover:text-primary transition-colors leading-tight mb-3">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-text-sub dark:text-gray-400 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-4 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                                        Leer más <HiArrowRight />
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}
