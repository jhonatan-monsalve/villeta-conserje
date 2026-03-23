"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/layout/Container";
import { HiMenu, HiX, HiArrowRight } from "react-icons/hi";
import { usePathname } from "next/navigation";

// Links principales — sin duplicar el CTA de valoración
const NAV_LINKS = [
    { href: "/#servicios",   label: "Servicios",   id: "servicios" },
    { href: "/#comparativa", label: "Comparativa", id: "comparativa" },
    { href: "/#reviews",     label: "Testimonios", id: "reviews" },
    { href: "/blog",         label: "Blog",        id: "blog-preview" },
    { href: "/#faq",         label: "Preguntas",   id: "faq" },
];

export function Header() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState("home");
    const [isMenuOpen, setIsMenuOpen]       = useState(false);
    const [scrolled, setScrolled]           = useState(false);

    /* ── Detectar scroll para elevar el navbar ── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ── Scroll spy & detección de ruta ── */
    useEffect(() => {
        if (pathname === "/blog" || pathname.startsWith("/blog/")) {
            setActiveSection("blog-preview");
            return;
        }

        if (pathname === "/") {
            const observerOptions = {
                root: null,
                rootMargin: "-20% 0px -40% 0px",
                threshold: 0.1,
            };

            const handleIntersection = (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            };

            const observer = new IntersectionObserver(handleIntersection, observerOptions);
            const ids = ["home", "comparativa", "servicios", "reviews", "blog-preview", "valoracion", "faq"];
            ids.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });

            const onScroll = () => { if (window.scrollY < 100) setActiveSection("home"); };
            window.addEventListener("scroll", onScroll);

            return () => {
                observer.disconnect();
                window.removeEventListener("scroll", onScroll);
            };
        }
    }, [pathname]);

    const handleLinkClick = (id: string) => {
        setActiveSection(id);
        setIsMenuOpen(false);
    };

    return (
        <div
            className={`sticky top-0 z-50 w-full transition-all duration-500 ${
                scrolled
                    ? "bg-[#F8F6F3] shadow-[0_2px_24px_rgba(0,0,0,0.10)] border-b border-zinc-200"
                    : "bg-[#F8F6F3] border-b border-zinc-100"
            }`}
        >
            <Container>
                <header className="flex items-center justify-between h-[72px]">

                    {/* ── Logo ── */}
                    <Link
                        href="/#home"
                        onClick={() => handleLinkClick("home")}
                        className="flex items-center py-1 shrink-0"
                    >
                        <Logo className="h-16 w-auto" />
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.id;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => handleLinkClick(link.id)}
                                    className={`relative px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.12em] font-bold transition-all duration-300 ${
                                        isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-zinc-500 hover:text-primary hover:bg-primary/5"
                                    }`}
                                >
                                    {link.label}
                                    {/* Línea dorada animada */}
                                    <span
                                        className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gold rounded-full transition-all duration-300 ${
                                            isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                                        }`}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ── Actions ── */}
                    <div className="flex items-center gap-3">
                        {/* CTA principal — desktop */}
                        <Link href="/valoracion" className="hidden md:block" onClick={() => handleLinkClick("valoracion")}>
                            <span className="group inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.14em] bg-primary text-white pl-5 pr-4 py-2.5 rounded-full hover:bg-gold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-px">
                                Solicitar Valoración
                                <HiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                            </span>
                        </Link>

                        {/* Hamburgesa — mobile */}
                        <button
                            className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:border-primary hover:text-primary transition-all duration-200"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            <span className={`absolute transition-all duration-200 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
                                <HiX size={18} />
                            </span>
                            <span className={`absolute transition-all duration-200 ${isMenuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}>
                                <HiMenu size={18} />
                            </span>
                        </button>
                    </div>
                </header>

                {/* ── Mobile Menu ── */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <nav className="flex flex-col gap-1 px-2 pb-4 pt-1">
                        {/* Separador */}
                        <div className="h-px bg-zinc-100 mb-2" />

                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.id;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 ${
                                        isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-zinc-600 hover:text-primary hover:bg-zinc-50"
                                    }`}
                                    onClick={() => handleLinkClick(link.id)}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                                    )}
                                </Link>
                            );
                        })}

                        {/* CTA móvil */}
                        <div className="h-px bg-zinc-100 my-2" />
                        <Link
                            href="/valoracion"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.14em] bg-primary text-white px-6 py-3.5 rounded-xl hover:bg-gold transition-all duration-300 shadow-md mx-1"
                        >
                            Solicitar Valoración Gratuita
                            <HiArrowRight />
                        </Link>
                    </nav>
                </div>
            </Container>
        </div>
    );
}
