/**
 * Envía eventos a Google Tag Manager (dataLayer).
 * En GTM, un activador de "Evento personalizado" los reenvía a Google Analytics 4.
 */
type EventParams = Record<string, string | number | undefined>;

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

export function trackEvent(event: string, params: EventParams = {}) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}
