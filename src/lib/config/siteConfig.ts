/**
 * Configuración centralizada del sitio web.
 * Se utiliza para gestionar textos, enlaces y contactos en un solo lugar.
 */
export const SITE_CONFIG = {
    name: "Villeta Conserje",
    description: "Administración de Propiedades de Lujo en Airbnb - Villeta",
    url: "https://villetaconserje.com",

    // Legacy/General direct access (can be deprecated in favor of specific contacts below)
    whatsapp: "3204325845",
    email: "gerencia@villetaconserje.com",

    // Nueva Configuración Centralizada de Contactos por Rol
    contact: {
        // Contacto para Gerencia (Propietarios, Negocios importantes)
        manager: {
            name: "Gerencia",
            phone: "+57 320 432 5845", // Formato visual
            email: "gerencia@villetaconserje.com",
            // Enlace directo a WhatsApp con mensaje predefinido para Gerencia
            whatsappLink: "https://wa.me/573204325845?text=Hola%20Gerencia%2C%20soy%20propietario%20y%20quisiera%20hablar%20sobre%20mi%20propiedad.",
            // Enlace directo a Email (mailto)
            emailLink: "mailto:gerencia@villetaconserje.com?subject=Consulta%20Gerencia"
        },
        // Contacto para Soporte (Ayuda técnica, Dudas generales)
        support: {
            name: "Soporte Técnico",
            phone: "+57 320 432 5845", // Por ahora es el mismo
            email: "gerencia@villetaconserje.com", // Por ahora es el mismo
            // Enlace directo a WhatsApp con mensaje predefinido para Soporte
            whatsappLink: "https://wa.me/573204325845?text=Hola%20Soporte%2C%20necesito%20ayuda%20con%20mi%20cuenta%20o%20el%20panel.",
            // Enlace directo a Email (mailto)
            emailLink: "mailto:gerencia@villetaconserje.com?subject=Soporte%20T%C3%A9cnico"
        }
    },

    // Enlaces antiguos (mantener por compatibilidad si es necesario)
    links: {
        airbnb_listing: "https://www.airbnb.com.co/rooms/1402264507691687773",
        whatsapp_general: "https://wa.me/573204325845?text=Hola%20%F0%9F%91%8B%2C%20vengo%20desde%20su%20p%C3%A1gina%20web%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20el%20servicio%20de%20administraci%C3%B3n%20de%20fincas%20y%20publicaci%C3%B3n%20en%20Airbnb.",
    },

    // Estadísticas clave
    stats: {
        reviews: 24,
        rating: 5.0,
        isSuperhost: true,
        propertyType: "Casa Bambú",
        income_generated: "$180M+",
    }
};
