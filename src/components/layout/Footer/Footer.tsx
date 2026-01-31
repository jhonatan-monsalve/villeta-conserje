import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-surface-light border-t border-zinc-200 pt-16 pb-12 text-zinc-600" style={{ colorScheme: 'light' }}>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Col 1: Brand */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="inline-block transition-transform hover:scale-105">
                            <Logo className="h-20 w-auto !filter-none" />
                        </Link>
                        <p className="text-sm leading-relaxed opacity-80 max-w-xs">
                            Elevamos el estándar de hospitalidad en Villeta. Gestión profesional de fincas enfocada en la excelencia y rentabilidad en Airbnb.
                        </p>
                    </div>

                    {/* Col 2: Navigation */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-display text-zinc-900 text-lg font-medium italic">Navegación</h4>
                        <nav className="flex flex-col gap-3 text-sm font-medium">
                            <Link href="/#home" className="hover:text-primary transition-colors">Inicio</Link>
                            <Link href="/#comparativa" className="hover:text-primary transition-colors">Comparativa</Link>
                            <Link href="/#servicios" className="hover:text-primary transition-colors">Nuestros Servicios</Link>
                            <Link href="/#reviews" className="hover:text-primary transition-colors">Testimonios Reales</Link>
                        </nav>
                    </div>

                    {/* Col 3: Contact */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-display text-zinc-900 text-lg font-medium italic">Contacto</h4>
                        <div className="flex flex-col gap-4 text-sm font-medium">
                            <a
                                href={SITE_CONFIG.links.whatsapp_general}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 hover:text-primary transition-colors group"
                            >
                                <FaWhatsapp className="text-xl text-gold" />
                                <span>+(57) {SITE_CONFIG.whatsapp}</span>
                            </a>
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="flex items-center gap-3 hover:text-primary transition-colors group"
                                title="Enviar un correo electrónico"
                            >
                                <FaEnvelope color="#C9A961" size={20} className="shrink-0" />
                                <span className="border-b border-transparent group-hover:border-primary transition-all">
                                    {SITE_CONFIG.email}
                                </span>
                            </a>
                            <div className="flex items-center gap-3 opacity-80 group">
                                <HiOutlineLocationMarker className="text-xl text-gold" />
                                <span>Villeta, Cundinamarca</span>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Status / Badge */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-display text-zinc-900 text-lg font-medium italic">Reconocimientos</h4>
                        <a
                            href="https://www.airbnb.com.co/users/profile/1470722789148483549?previous_page_name=PdpHomeMarketplace"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 bg-white border border-zinc-200 rounded-lg shadow-sm hover:border-primary transition-all group"
                        >
                            <div className="flex items-center gap-2 mb-2 text-gold">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            <p className="text-xs uppercase tracking-widest text-zinc-900 font-bold mb-1 group-hover:text-primary transition-colors">Superanfitrión Airbnb</p>
                            <p className="text-[11px] opacity-60 mb-3">14 Reservas atendidas con calificación perfecta.</p>
                        </a>
                    </div>
                </div>

                {/* Bottom Bar: Adjusted to prevent overlap with WhatsApp floating button */}
                <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-6 md:pr-24">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[11px] uppercase tracking-[0.2em] font-bold opacity-60">
                        <p>© {new Date().getFullYear()} {SITE_CONFIG.name}</p>
                        <div className="flex gap-4 text-[10px]">
                            <Link href="/privacidad" className="hover:text-primary transition-colors underline decoration-zinc-300 underline-offset-4">Privacidad</Link>
                            <Link href="/terminos" className="hover:text-primary transition-colors underline decoration-zinc-300 underline-offset-4">Términos</Link>
                        </div>
                    </div>

                    <a
                        href="https://techdetodos.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] opacity-40 hover:opacity-100 hover:text-primary transition-all uppercase tracking-[0.25em] font-black"
                    >
                        Desarrollado por Tech de Todos
                    </a>
                </div>
            </Container>
        </footer>
    );
}
