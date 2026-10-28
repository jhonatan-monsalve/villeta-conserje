"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Mide los clics de contacto en todo el sitio sin tocar cada botón:
 * WhatsApp, Airbnb, teléfono y correo. Cada evento indica la sección de origen.
 */
function getLocation(el: Element): string {
    if (el.closest("header")) return "cabecera";
    if (el.closest("footer")) return "pie";
    if (el.closest("[data-track-location]")) {
        return el.closest("[data-track-location]")!.getAttribute("data-track-location") || "otro";
    }
    const section = el.closest("section[id], div[id]");
    return section?.id || "contenido";
}

export function ClickTracker() {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!link) return;
            const href = link.href;
            const params = {
                link_location: getLocation(link),
                link_text: (link.textContent || link.getAttribute("aria-label") || "").trim().slice(0, 80),
            };

            if (/wa\.me|api\.whatsapp\.com|whatsapp:/i.test(href)) {
                trackEvent("whatsapp_click", params);
            } else if (/airbnb\./i.test(href)) {
                trackEvent("airbnb_click", { ...params, link_url: href.split("?")[0] });
            } else if (href.startsWith("tel:")) {
                trackEvent("phone_click", params);
            } else if (href.startsWith("mailto:") || href.includes("/cdn-cgi/l/email-protection")) {
                trackEvent("email_click", params);
            }
        };
        // Fase de captura: se registra aunque el enlace abra otra pestaña o la app
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, []);

    return null;
}
