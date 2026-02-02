import ExportedImage from "next-image-export-optimizer";
import { Container } from "@/components/layout/Container";
import { getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { HiArrowRight, HiClock } from "react-icons/hi";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog para Dueños de Fincas en Villeta | Villeta Conserje",
    description: "Descubre estrategias profesionales para maximizar tus ingresos en Airbnb Villeta. Consejos de Superanfitriones sobre gestión, limpieza y rentabilidad de propiedades de lujo.",
    keywords: ["Airbnb Villeta", "Administración de fincas Villeta", "Superanfitrión Colombia", "Rentabilidad alquiler vacacional", "Gestión propiedades lujo"],
    openGraph: {
        title: "Blog de Gestión de Propiedades en Airbnb | Villeta Conserje",
        description: "Maximiza la rentabilidad de tu finca en Villeta con nuestros consejos expertos.",
        type: "website",
    }
};

export default function BlogPage() {
    const posts = getSortedPostsData();

    return (
        <main className="min-h-screen bg-background">
            <div className="py-20 lg:py-32">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-main dark:text-white mb-6">
                            Consejos para Propietarios Exclusivos
                        </h1>
                        <p className="text-text-sub dark:text-gray-400 text-lg">
                            Aprenda cómo maximizar la rentabilidad de su finca en Villeta y ofrecer experiencias 5 estrellas en Airbnb.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {posts.map((post) => (
                            <article key={post.slug} className="group cursor-pointer">
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-lg">
                                        <ExportedImage
                                            src={post.image}
                                            alt={post.title}
                                            width={600}
                                            height={400}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-xs text-text-sub font-medium">
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-border"></span>
                                            <span className="flex items-center gap-1"><HiClock /> {post.readTime}</span>
                                        </div>

                                        <h2 className="text-2xl font-display font-bold text-text-main dark:text-white group-hover:text-primary transition-colors leading-tight">
                                            {post.title}
                                        </h2>

                                        <p className="text-text-sub dark:text-gray-400 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <div className="pt-4 flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                                            Leer artículo <HiArrowRight />
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </Container>
            </div>
        </main>
    );
}
