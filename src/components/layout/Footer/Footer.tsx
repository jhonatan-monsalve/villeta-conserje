import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { MdVilla } from "react-icons/md";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-surface-light dark:bg-zinc-950 border-t border-border dark:border-white/5 py-12">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="font-bold text-sm text-text-main dark:text-white uppercase tracking-tight">{SITE_CONFIG.name}</span>
                    </Link>

                    <div className="text-sm text-text-sub dark:text-gray-500">
                        <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. Todos los derechos reservados.</p>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <Link href="/privacidad" className="text-text-sub hover:text-primary dark:text-gray-400 transition-colors">
                            Política de Privacidad
                        </Link>
                        <Link href="/terminos" className="text-text-sub hover:text-primary dark:text-gray-400 transition-colors">
                            Términos de Servicio
                        </Link>
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    <a
                        href="https://techdetodos.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] opacity-40 hover:opacity-100 hover:text-primary transition-all uppercase tracking-[0.2em] font-bold"
                    >
                        Desarrollado por Tech de Todos
                    </a>
                </div>
            </Container>
        </footer>
    );
}
