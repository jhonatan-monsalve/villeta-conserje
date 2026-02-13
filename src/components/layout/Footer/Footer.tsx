import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-surface-light to-white border-t border-zinc-200/60 pt-20 pb-8 text-[#1B4D3E]" style={{ colorScheme: 'light' }}>
            <Container>
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Col 1: Brand - Takes 3 columns on large screens */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <Link href="/" className="inline-block transition-transform hover:scale-105 w-fit">
                            <Logo className="h-24 w-auto !filter-none" />
                        </Link>
                        <p className="text-sm leading-relaxed opacity-75 max-w-xs font-light">
                            Elevamos el estándar de hospitalidad en Villeta. Gestión profesional de fincas enfocada en la excelencia y rentabilidad en Airbnb.
                        </p>
                    </div>

                    {/* Col 2: Navigation - Takes 2 columns */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <h4 className="font-display text-[#064e3b] text-base font-semibold tracking-wide">Navegación</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/#home" className="text-sm hover:text-primary transition-colors hover:translate-x-1 duration-200 w-fit">Inicio</Link>
                            <Link href="/#comparativa" className="text-sm hover:text-primary transition-colors hover:translate-x-1 duration-200 w-fit">Comparativa</Link>
                            <Link href="/#servicios" className="text-sm hover:text-primary transition-colors hover:translate-x-1 duration-200 w-fit">Servicios</Link>
                            <Link href="/#reviews" className="text-sm hover:text-primary transition-colors hover:translate-x-1 duration-200 w-fit">Testimonios</Link>
                            <Link href="/auditoria" className="text-sm hover:text-primary transition-colors hover:translate-x-1 duration-200 w-fit">Auditoría</Link>
                        </nav>
                    </div>

                    {/* Col 3: Contact & Map - Takes 4 columns */}
                    <div className="lg:col-span-4 flex flex-col gap-5">
                        <h4 className="font-display text-[#064e3b] text-base font-semibold tracking-wide">Contacto</h4>
                        <div className="flex flex-col gap-4">
                            <a
                                href={SITE_CONFIG.links.whatsapp_general}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 hover:text-primary transition-all group text-sm"
                            >
                                <FaWhatsapp className="text-xl text-gold group-hover:scale-110 transition-transform" />
                                <span className="font-medium">+(57) {SITE_CONFIG.whatsapp}</span>
                            </a>
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="flex items-center gap-3 hover:text-primary transition-all group text-sm"
                                title="Enviar un correo electrónico"
                            >
                                <FaEnvelope className="text-gold group-hover:scale-110 transition-transform" size={18} />
                                <span className="font-medium break-all">{SITE_CONFIG.email}</span>
                            </a>
                            <div className="flex items-start gap-3 opacity-75 text-sm">
                                <HiOutlineLocationMarker className="text-xl text-gold mt-0.5 flex-shrink-0" />
                                <span className="font-medium">Villeta, Cundinamarca</span>
                            </div>

                            {/* Map */}
                            <div className="w-full mt-3 rounded-xl overflow-hidden border border-zinc-200 shadow-md hover:shadow-lg transition-shadow">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15897.28639739564!2d-74.4862284675535!3d5.051939598273614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e409ba651239257%3A0x5a557850257a4072!2sVilleta%2C%20Cundinamarca!5e0!3m2!1ses!2sco!4v1716380000000!5m2!1ses-419!2sco"
                                    width="100%"
                                    height="160"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Mapa de Villeta, Cundinamarca"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Badge - Takes 3 columns */}
                    <div className="lg:col-span-3 flex flex-col gap-5">
                        <h4 className="font-display text-[#064e3b] text-base font-semibold tracking-wide">Reconocimientos</h4>
                        <a
                            href="https://www.airbnb.com.co/users/profile/1470722789148483549?previous_page_name=PdpHomeMarketplace"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-5 bg-white border border-zinc-200/80 rounded-xl shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-1.5 mb-3 text-gold text-lg">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>★</span>
                                ))}
                            </div>
                            <p className="text-xs uppercase tracking-widest text-[#064e3b] font-bold mb-2 group-hover:text-primary transition-colors">
                                Superanfitrión Airbnb
                            </p>
                            <p className="text-[11px] opacity-60 leading-relaxed">
                                15 Reservas atendidas con calificación perfecta.
                            </p>
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-200/60 flex flex-col md:flex-row justify-between items-center gap-6 md:pr-24">
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-[10px] uppercase tracking-wider font-semibold opacity-50">
                        <p>© {new Date().getFullYear()} {SITE_CONFIG.name}</p>
                        <div className="flex gap-4 text-[9px]">
                            <Link href="/privacidad" className="hover:text-primary hover:opacity-100 transition-all">Privacidad</Link>
                            <span className="opacity-30">•</span>
                            <Link href="/terminos" className="hover:text-primary hover:opacity-100 transition-all">Términos</Link>
                        </div>
                    </div>

                    <a
                        href="https://techdetodos.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[8px] opacity-30 hover:opacity-80 hover:text-primary transition-all uppercase tracking-[0.3em] font-black"
                    >
                        Desarrollado por Tech de Todos
                    </a>
                </div>
            </Container>
        </footer>
    );
}
