"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_LINKS = [
    { href: "/#comparison", label: "Comparativa" },
    { href: "/#features", label: "Servicios" },
    { href: "/#reviews", label: "Testimonios" },
    { href: "/blog", label: "Blog" },
    { href: "/#faq", label: "Preguntas" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 w-full bg-surface-light/95 backdrop-blur-md border-b border-border dark:bg-surface-dark/95 dark:border-white/10">
            <Container>
                <header className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center cursor-pointer py-1">
                        <Logo className="h-20 w-auto" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium hover:text-primary transition-colors dark:text-white/80"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">


                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-text-main dark:text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>
                </header>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <nav className="flex flex-col gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-border shadow-lg">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                        </nav>
                    </div>
                )}
            </Container>
        </div>
    );
}
