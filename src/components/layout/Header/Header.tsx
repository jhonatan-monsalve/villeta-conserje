"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { HiMenu, HiX } from "react-icons/hi";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { href: "/#home", label: "Inicio", id: "home" },
    { href: "/#comparativa", label: "Comparativa", id: "comparativa" },
    { href: "/#servicios", label: "Servicios", id: "servicios" },
    { href: "/#reviews", label: "Testimonios", id: "reviews" },
    { href: "/#blog-preview", label: "Blog", id: "blog-preview" },
    { href: "/#auditoria", label: "Auditoría", id: "auditoria" },
    { href: "/#faq", label: "Preguntas", id: "faq" },
];

export function Header() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Si estamos en una ruta de blog, marcar el ítem de Blog como activo
        if (pathname === "/blog" || pathname.startsWith("/blog/")) {
            setActiveSection("blog-preview");
            return;
        }

        // Si es el Home, iniciar Scroll Spy
        if (pathname === "/") {
            const handleScroll = () => {
                if (window.scrollY < 100) {
                    setActiveSection("home");
                }
            };

            window.addEventListener("scroll", handleScroll);

            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -40% 0px',
                threshold: 0.1
            };

            const handleIntersection = (entries: IntersectionObserverEntry[]) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            };

            const observer = new IntersectionObserver(handleIntersection, observerOptions);

            const sectionIds = ["home", "comparativa", "servicios", "reviews", "blog-preview", "auditoria", "faq"];
            sectionIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });

            handleScroll();

            return () => {
                observer.disconnect();
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [pathname]);

    const handleLinkClick = (id: string) => {
        setActiveSection(id);
        setIsMenuOpen(false);
    };

    return (
        <div className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-surface-light/95 backdrop-blur-lg shadow-sm">
            <Container>
                <header className="flex items-center justify-between h-24">
                    {/* Logo con sus colores originales */}
                    <Link href="/#home" onClick={() => handleLinkClick("home")} className="flex items-center cursor-pointer py-1">
                        <Logo className="h-20 w-auto" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => handleLinkClick(link.id)}
                                className={`text-xs uppercase tracking-widest font-bold transition-all duration-300 ${activeSection === link.id
                                    ? "text-primary opacity-100 scale-105"
                                    : "text-zinc-500 hover:text-primary"
                                    }`}
                            >
                                {link.label}
                                {activeSection === link.id && (
                                    <span className="block h-[1px] bg-gold w-full mt-1"></span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/auditoria" className="hidden md:block">
                            <Button className="font-sans text-xs font-bold uppercase tracking-[0.15em] bg-primary text-white px-6 py-3 rounded-[4px] hover:bg-gold hover:text-white hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                                Auditoría
                            </Button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-zinc-800"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>
                </header>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 absolute top-full left-0 w-full px-4">
                        <nav className="flex flex-col gap-4 p-6 bg-surface-light text-zinc-800 rounded-lg border border-zinc-200 shadow-2xl backdrop-blur-xl">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-bold transition-colors uppercase tracking-widest ${activeSection === link.id ? "text-primary" : "text-zinc-600 hover:text-primary"
                                        }`}
                                    onClick={() => handleLinkClick(link.id)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link href="/auditoria" className="mt-2 text-center" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full font-sans text-xs font-bold uppercase tracking-[0.15em] bg-primary text-white px-6 py-3 rounded-[4px]">
                                    Solicitar Auditoría
                                </Button>
                            </Link>
                        </nav>
                    </div>
                )}
            </Container>
        </div>
    );
}
