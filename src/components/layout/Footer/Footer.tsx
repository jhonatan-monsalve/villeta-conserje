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
                        <span className="font-bold text-text-main dark:text-white">{SITE_CONFIG.name}</span>
                    </Link>

                    <div className="text-sm text-text-sub dark:text-gray-500 flex flex-col items-center md:items-start">
                        <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. Todos los derechos reservados.</p>
                        <a
                            href="https://techdetodos.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] mt-1 opacity-50 hover:opacity-100 hover:text-primary transition-all uppercase tracking-widest font-medium"
                        >
                            Desarrollado por Tech de Todos
                        </a>
                    </div>

                    <div className="flex gap-6">
                        <Link href="/privacidad" className="text-text-sub hover:text-primary dark:text-gray-400 transition-colors">
                            Política de Privacidad
                        </Link>
                        <Link href="/terminos" className="text-text-sub hover:text-primary dark:text-gray-400 transition-colors">
                            Términos de Servicio
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
