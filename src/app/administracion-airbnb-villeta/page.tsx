import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/sections/Contact/ContactForm";
import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import Script from "next/script";
import {
    MdCalendarMonth, MdCleaningServices, MdEngineering, MdCampaign,
    MdAccountBalance, MdCheckCircle, MdStar, MdLocationOn,
    MdTrendingUp, MdPersonOff, MdAccessTime, MdThumbDown
} from "react-icons/md";
import { HiStar } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

/* ─── SEO Metadata ─── */
export const metadata: Metadata = {
    title: "Administración de Airbnb en Villeta Cundinamarca | Villeta Conserje",
    description: "Gestionamos tu Airbnb en Villeta Cundinamarca. Aumenta tus ingresos sin preocuparte por nada. Servicio completo de administración.",
    keywords: [
        "administración airbnb villeta",
        "gestión airbnb villeta cundinamarca",
        "administrador airbnb villeta",
        "alquilar finca villeta airbnb",
        "servicio airbnb villeta",
    ],
    alternates: {
        canonical: "/administracion-airbnb-villeta",
    },
    openGraph: {
        title: "Administración de Airbnb en Villeta Cundinamarca | Villeta Conserje",
        description: "Gestionamos tu Airbnb en Villeta Cundinamarca. Aumenta tus ingresos sin preocuparte por nada.",
        url: "https://villetaconserje.com/administracion-airbnb-villeta",
        type: "website",
        images: [
            {
                url: "/images/hero-bg.jpg",
                width: 1200,
                height: 630,
                alt: "Administración de Airbnb en Villeta - Villeta Conserje",
            },
        ],
    },
};

/* ─── Servicios incluidos ─── */
const SERVICIOS = [
    { icon: MdCampaign, title: "Publicación y Optimización", desc: "Creamos y optimizamos tu anuncio en Airbnb con fotografía profesional, copywriting de conversión y pricing estratégico." },
    { icon: MdCalendarMonth, title: "Gestión de Reservas", desc: "Administramos tu calendario, confirmamos reservas y filtramos huéspedes para garantizar la mejor experiencia." },
    { icon: MdAccessTime, title: "Atención al Cliente 24/7", desc: "Respondemos a los huéspedes en minutos, todos los días del año. Tu propiedad nunca está sola." },
    { icon: MdCheckCircle, title: "Check-in y Check-out", desc: "Recibimos y despedimos a cada huésped con un protocolo de bienvenida personalizado y revisión de la propiedad." },
    { icon: MdCleaningServices, title: "Limpieza Profesional", desc: "Protocolo de 47 puntos: sábanas de lujo, desinfección completa, reposición de amenidades antes de cada llegada." },
    { icon: MdEngineering, title: "Mantenimiento General", desc: "Supervisión semanal de jardín, piscina y estado general. Reparaciones urgentes en menos de 24 horas." },
    { icon: MdAccountBalance, title: "Optimización de Precios", desc: "Yield management dinámico según temporada, demanda y competencia para maximizar tus ingresos cada mes." },
];

/* ─── Para quién es ─── */
const PARA_QUIEN = [
    { icon: MdLocationOn, text: "Tienes una finca o casa en Villeta y no vives allí" },
    { icon: MdPersonOff, text: "No tienes tiempo para gestionar reservas" },
    { icon: MdTrendingUp, text: "Quieres ingresos pasivos sin complicaciones" },
    { icon: MdThumbDown, text: "Has intentado alquilar y no obtienes buenos resultados" },
];

/* ─── FAQs ─── */
const FAQS = [
    {
        q: "¿Cuánto cuesta el servicio de administración?",
        a: "Trabajamos con una comisión del 15% sobre las reservas generadas. Sin costos fijos ni sorpresas. Solo ganamos cuando tú ganas.",
    },
    {
        q: "¿Tengo que encargarme de algo?",
        a: "No. Nosotros nos encargamos de toda la operación: desde la publicación hasta la limpieza, mantenimiento y atención al huésped.",
    },
    {
        q: "¿Puedo usar mi propiedad cuando quiera?",
        a: "Sí, por supuesto. Bloqueamos las fechas según tu disponibilidad personal y las coordinamos con el calendario de reservas.",
    },
];

/* ─── Schema FAQPage ─── */
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
};

/* ─── Schema Service ─── */
const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Administración de Airbnb en Villeta Cundinamarca",
    provider: {
        "@type": "LodgingBusiness",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
    },
    areaServed: {
        "@type": "City",
        name: "Villeta",
        containedInPlace: { "@type": "AdministrativeArea", name: "Cundinamarca" },
    },
    description: "Servicio completo de administración de propiedades en Airbnb en Villeta Cundinamarca. Gestión de reservas, limpieza, mantenimiento y optimización de ingresos.",
    serviceType: "Property Management",
};

export default function AdministracionAirbnbVilletaPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Schema Markup */}
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

            {/* ═══════════════════════════════════════════
                HERO — Fondo oscuro premium
            ═══════════════════════════════════════════ */}
            <section className="relative bg-surface-dark pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                {/* Patrón decorativo */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-white/5 backdrop-blur-md border border-white/10 text-gray-100 text-xs font-medium mb-8 tracking-widest uppercase shadow-lg">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                            Servicio Profesional en Villeta
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
                            Administración de Airbnb en{" "}
                            <span className="italic text-gold font-serif">Villeta Cundinamarca</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl font-light leading-relaxed">
                            Convierte tu propiedad en un Airbnb rentable sin complicaciones.
                            Gestionamos tu finca de principio a fin: desde la publicación
                            hasta la atención al huésped, limpieza y mantenimiento.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#contacto">
                                <button className="w-full sm:w-auto font-sans font-semibold uppercase tracking-[0.15em] bg-primary text-white px-10 py-5 rounded-[4px] hover:bg-gold hover:-translate-y-1 transition-all duration-500 shadow-xl text-sm">
                                    Solicitar Estimación Gratuita
                                </button>
                            </a>
                            <a
                                href={SITE_CONFIG.links.whatsapp_general}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="w-full sm:w-auto font-sans font-semibold uppercase tracking-[0.15em] text-white bg-transparent border border-white/30 px-10 py-5 rounded-[4px] hover:bg-white hover:text-black hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm text-sm flex items-center justify-center gap-2">
                                    <FaWhatsapp className="text-lg" />
                                    Hablar por WhatsApp
                                </button>
                            </a>
                        </div>

                        <div className="flex items-center gap-3 mt-8">
                            <div className="flex text-gold" role="img" aria-label="Calificación: 5 estrellas">
                                {[...Array(5)].map((_, i) => (
                                    <HiStar key={i} className="text-lg" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-400">
                                {SITE_CONFIG.stats.rating} estrellas · {SITE_CONFIG.stats.reviews} reseñas en Airbnb
                            </span>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════
                SERVICIOS INCLUIDOS
            ═══════════════════════════════════════════ */}
            <section className="py-16 lg:py-24 bg-white border-b border-border" id="servicios">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Gestión Completa</span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main mb-4">
                            ¿Qué incluye nuestro servicio de administración?
                        </h2>
                        <p className="text-text-sub text-lg">
                            Ofrecemos una gestión integral para que no tengas que preocuparte por nada.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {SERVICIOS.map((s, i) => (
                            <div
                                key={i}
                                className="bg-surface-light p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 text-primary group-hover:scale-110 transition-transform duration-300">
                                    <s.icon className="w-7 h-7" />
                                </div>
                                <h3 className="font-bold text-lg text-text-main mb-2">{s.title}</h3>
                                <p className="text-text-sub text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════
                BENEFICIOS — Gana más
            ═══════════════════════════════════════════ */}
            <section className="py-16 lg:py-24 bg-surface-light border-b border-border">
                <Container>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Resultados Reales</span>
                            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main mb-6 leading-tight">
                                Gana más con tu Airbnb en Villeta
                            </h2>
                            <p className="text-text-sub text-lg mb-8 leading-relaxed">
                                Villeta es una zona turística con alta demanda. Una buena gestión marca
                                la diferencia entre una propiedad vacía y una altamente rentable.
                            </p>
                            <div className="space-y-5">
                                {[
                                    { label: "Aumentas la ocupación", value: "Hasta 85% mensual" },
                                    { label: "Mejoras las valoraciones", value: "5.0 estrellas promedio" },
                                    { label: "Incrementas tus ingresos", value: "Entre $8M y $15M/mes" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <MdCheckCircle className="text-primary w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-text-main">{item.label}</p>
                                            <p className="text-sm text-text-sub">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-primary rounded-2xl p-10 text-white text-center shadow-2xl">
                            <p className="text-sm text-green-100 mb-2 uppercase tracking-wider font-semibold">Ingresos promedio mensual</p>
                            <p className="text-5xl font-display font-bold mb-4">$8M - $15M</p>
                            <p className="text-green-100 text-sm mb-6 leading-relaxed">
                                Las propiedades que gestionamos en Villeta generan ingresos constantes con una ocupación promedio del 85%.
                            </p>
                            <a href="#contacto">
                                <button className="w-full py-4 bg-white text-primary font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                    Solicitar Estimación Gratuita
                                </button>
                            </a>
                            <p className="text-[10px] text-white/60 mt-3">*Basado en datos reales de propiedades gestionadas en Villeta.</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════
                ¿PARA QUIÉN ES?
            ═══════════════════════════════════════════ */}
            <section className="py-16 lg:py-24 bg-white border-b border-border">
                <Container>
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">¿Es para ti?</span>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main mb-4">
                            ¿Para quién es este servicio?
                        </h2>
                        <p className="text-text-sub text-lg">
                            Nuestro servicio es ideal si te identificas con alguna de estas situaciones:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {PARA_QUIEN.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 bg-surface-light p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <item.icon className="text-primary w-6 h-6" />
                                </div>
                                <p className="text-text-main font-medium pt-2.5">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════
                ¿POR QUÉ ELEGIRNOS?
            ═══════════════════════════════════════════ */}
            <section className="py-16 lg:py-24 bg-surface-dark text-white">
                <Container>
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <div className="flex justify-center mb-4" role="img" aria-label="5 estrellas">
                            {[...Array(5)].map((_, i) => (
                                <HiStar key={i} className="text-gold text-2xl" />
                            ))}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                            ¿Por qué elegir Villeta Conserje?
                        </h2>
                        <p className="text-gray-400 text-lg">
                            No solo administramos, transformamos propiedades en experiencias de 5 estrellas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { title: "Experiencia Local", desc: "Conocemos Villeta, sus temporadas, su público y sus condominios como nadie." },
                            { title: "Atención Personalizada", desc: "Cada propiedad tiene un plan único adaptado a sus características y ubicación." },
                            { title: "Enfocados en Resultados", desc: "Nuestro éxito se mide en tus ingresos. Solo ganamos cuando tú ganas." },
                            { title: "Cuidado Integral", desc: "Tu propiedad siempre en las mejores condiciones, como si vivieras allí." },
                        ].map((item, i) => (
                            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════
                UBICACIÓN
            ═══════════════════════════════════════════ */}
            <section className="py-16 lg:py-20 bg-white border-b border-border">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <MdLocationOn className="text-primary text-4xl mx-auto mb-4" />
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main mb-4">
                            Cobertura de Servicio
                        </h2>
                        <p className="text-text-sub text-lg mb-8">Prestamos servicio en las siguientes zonas:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Villeta Cundinamarca", "Guaduas", "Sasaima", "La Vega", "Nocaima", " La Magdalena"].map((zona) => (
                                <span
                                    key={zona}
                                    className="px-5 py-2.5 bg-primary/5 text-primary font-semibold rounded-full text-sm border border-primary/10 hover:bg-primary/10 transition-colors"
                                >
                                    📍 {zona}
                                </span>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════
                PREGUNTAS FRECUENTES
            ═══════════════════════════════════════════ */}
            <section className="py-16 lg:py-24 bg-surface-light border-b border-border" id="faq">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Resolvemos Tus Dudas</span>
                            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-main mb-4">
                                Preguntas Frecuentes
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {FAQS.map((faq, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl border border-border p-8 hover:shadow-md transition-all duration-300"
                                >
                                    <h3 className="font-bold text-lg text-text-main mb-3 flex items-start gap-3">
                                        <span className="text-primary text-xl mt-0.5">❓</span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-text-sub leading-relaxed pl-9">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════
                CTA FINAL — WhatsApp
            ═══════════════════════════════════════════ */}
            <section className="py-16 lg:py-20 bg-primary text-white text-center">
                <Container>
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                            Empieza Hoy
                        </h2>
                        <p className="text-green-100 text-lg mb-8 leading-relaxed">
                            Convierte tu propiedad en una fuente de ingresos constante con nuestro servicio
                            de administración de Airbnb en Villeta Cundinamarca.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={SITE_CONFIG.links.whatsapp_general}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="w-full sm:w-auto px-10 py-5 bg-white text-primary font-bold rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-lg">
                                    <FaWhatsapp className="text-2xl text-[#25D366]" />
                                    Escríbenos por WhatsApp
                                </button>
                            </a>
                            <a href="#contacto">
                                <button className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary transition-all duration-300">
                                    Solicitar Estimación Gratuita
                                </button>
                            </a>
                        </div>
                        <p className="text-white/60 text-sm mt-6">Te asesoramos sin compromiso · Respuesta en menos de 24h</p>
                    </div>
                </Container>
            </section>

            {/* ═══════════════════════════════════════════
                FORMULARIO DE CONTACTO (reutilizado)
            ═══════════════════════════════════════════ */}
            <div id="contacto">
                <ContactForm />
            </div>
        </main>
    );
}
