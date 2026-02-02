"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Verificar si el usuario ya aceptó las cookies
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Mostrar después de un pequeño retraso
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-0 right-0 z-[60] px-4 pointer-events-none"
                >
                    <div className="max-w-4xl mx-auto pointer-events-auto">
                        <div className="bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                                    Valoramos tu privacidad
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Utilizamos cookies para mejorar tu experiencia y analizar el tráfico de nuestro sitio.
                                    Al continuar navegando, aceptas nuestra{" "}
                                    <Link href="/privacidad" className="text-primary hover:underline font-medium">
                                        política de privacidad
                                    </Link>.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleAccept}
                                    className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                                >
                                    Cerrar
                                </Button>
                                <Button
                                    variant="primary"
                                    size="md"
                                    onClick={handleAccept}
                                    className="px-8 shadow-primary/20"
                                >
                                    Aceptar
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
