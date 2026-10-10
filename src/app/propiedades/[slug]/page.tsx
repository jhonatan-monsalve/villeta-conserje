import ExportedImage from "next-image-export-optimizer";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { Metadata } from "next";
import { HiStar, HiArrowRight, HiOutlineShieldCheck, HiOutlineLocationMarker, HiCheckCircle } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import Link from "next/link";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return SITE_CONFIG.properties.map((property) => ({
        slug: property.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const property = SITE_CONFIG.properties.find((p) => p.slug === params.slug);
    if (!property) return {};

    return {
        title: `${property.name} | Finca de Lujo en Villeta - Villeta Conserje`,
        description: `${property.description} Alquila ${property.name} en Villeta con gestión VIP y hospitalidad 5 estrellas.`,
        alternates: {
            canonical: `/propiedades/${property.slug}`,
        },
        openGraph: {
            title: `${property.name} | Villeta Conserje`,
            description: property.description,
            url: `https://villetaconserje.com/propiedades/${property.slug}`,
            type: "website",
        },
    };
}

export default function PropertyPage({ params }: Props) {
    const property = SITE_CONFIG.properties.find((p) => p.slug === params.slug);

    if (!property) {
        notFound();
    }

    const whatsappBookingUrl = `https://wa.me/573204325845?text=Hola%20Yenifer%2C%20quisiera%20consultar%20disponibilidad%20y%20tarifas%20para%20alquilar%20${encodeURIComponent(property.name)}%20en%20Villeta.`;

    return (
        <main className="min-h-screen bg-background py-16 sm:py-24">
            <Container>
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm text-text-sub dark:text-gray-400">
                    <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                    <span>/</span>
                    <span className="text-text-main dark:text-white font-semibold">{property.name}</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-wider mb-3">
                            <MdVerified /> Propiedad Exclusiva Administrada
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-text-main dark:text-white mb-2">
                            {property.name}
                        </h1>
                        <p className="text-lg text-text-sub dark:text-gray-300 flex items-center gap-2">
                            <HiOutlineLocationMarker className="text-primary text-xl shrink-0" />
                            {property.tagline}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-primary/20 shadow-md">
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-[#C9A961]">
                                {[...Array(5)].map((_, i) => (
                                    <HiStar key={i} className="fill-current text-lg" />
                                ))}
                            </div>
                            <p className="text-xs font-bold text-text-sub dark:text-gray-400 mt-1">Calificación 5.0 Estrellas</p>
                        </div>
                        <div className="h-10 w-px bg-gray-200 dark:bg-zinc-800" />
                        <div className="text-left">
                            <p className="text-xl font-black text-primary">Superanfitrión</p>
                            <p className="text-xs text-text-sub dark:text-gray-400">Villeta Conserje</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left 2 Cols: Details & Features */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Gallery Placeholder / Banner */}
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-zinc-900">
                            <ExportedImage
                                src={property.images[0]}
                                alt={property.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <span className="bg-primary text-white text-xs font-black uppercase px-3 py-1 rounded-md tracking-wider">
                                    Villeta, Cundinamarca
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-bold font-display mt-2">{property.name}</h2>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                            <h3 className="text-2xl font-display font-bold text-text-main dark:text-white">
                                Descripción de la Propiedad
                            </h3>
                            <p className="text-text-sub dark:text-gray-300 leading-relaxed text-lg">
                                {property.description}
                            </p>
                            <p className="text-text-sub dark:text-gray-300 leading-relaxed">
                                Administrada con el estándar integral de **Villeta Conserje**, garantizando aseo impecable de 47 puntos, lencería de alta gama, protocolo de desinfección y atención directa para una estadía inigualable.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
                            <h3 className="text-2xl font-display font-bold text-text-main dark:text-white">
                                Amenidades y Características
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {property.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                        <HiCheckCircle className="text-primary text-2xl shrink-0" />
                                        <span className="font-semibold text-text-main dark:text-gray-200">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Booking Card */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border-2 border-primary/30 shadow-xl sticky top-28 space-y-6">
                            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                                <span className="text-xs font-black uppercase text-primary tracking-wider">Reserva Directa o Airbnb</span>
                                <h3 className="text-2xl font-display font-bold text-text-main dark:text-white mt-1">
                                    ¿Te gustaría hospedarte aquí?
                                </h3>
                                <p className="text-sm text-text-sub dark:text-gray-400 mt-2">
                                    Consulta disponibilidad inmediata con nuestro equipo de conserjería o reserva seguro en Airbnb.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href={whatsappBookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button variant="secondary" fullWidth className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-base shadow-lg gap-2">
                                        Reservar por WhatsApp <HiArrowRight className="text-lg" />
                                    </Button>
                                </a>

                                <a
                                    href={property.airbnbUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <Button variant="outline" fullWidth className="border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 text-base gap-2">
                                        Ver en Airbnb <HiArrowRight className="text-lg" />
                                    </Button>
                                </a>
                            </div>

                            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3 text-xs text-text-sub dark:text-gray-400">
                                <HiOutlineShieldCheck className="text-primary text-xl shrink-0" />
                                <span>Garantía de calidad Villeta Conserje: verificación previa y soporte 24/7 durante tu estadía.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
