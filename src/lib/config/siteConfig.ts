/**
 * Configuración centralizada del sitio web.
 * Se utiliza para gestionar textos, enlaces y contactos en un solo lugar.
 */
export const SITE_CONFIG = {
    name: "Villeta Conserje",
    description: "Administración de Propiedades de Lujo en Airbnb - Villeta",
    url: "https://villetaconserje.com",
    ogImage: "https://villetaconserje.com/images/og-villeta-conserje.jpg",

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

    // Portafolio de Propiedades Administradas
    properties: [
        {
            id: "1402264507691687773",
            name: "Casa Bambú",
            slug: "casa-bambu",
            tagline: "Refugio en el Bosque | Río y Naturaleza",
            description: "Imagina despertar con el suave murmullo del río, la brisa cálida de Villeta y el canto de las aves en lugar del tráfico y el estrés de la ciudad. Casa Bambú es tu refugio privado de descanso y naturaleza en Cundinamarca, diseñado para desconectarte por completo y recargar energías en un clima inmejorable.\n\nDisfruta de amplias zonas verdes, piscina privada de aguas cristalinas bajo el sol templado, asador BBQ al aire libre y senderos de tranquilidad junto al río para compartir momentos memorables en familia o en pareja con total intimidad.\n\nCada rincón ha sido dispuesto bajo el estándar de hospitalidad 5 estrellas de Villeta Conserje: lencería hotelera de alta gama, protocolo de higiene de 47 puntos y anfitrión dedicado.\n\nLas fechas más solicitadas y fines de semana suelen reservarse con semanas de anticipación. Si sientes que ya es momento de regalarte este respiro, permítenos verificar disponibilidad para tus días ideales.",
            location: "Villeta, Cundinamarca",
            airbnbUrl: "https://www.airbnb.com.co/rooms/1402264507691687773",
            isSuperhost: true,
            defaultRating: 5.0,
            defaultReviewsCount: 27,
            capacity: {
                guests: 14,
                bedrooms: 4,
                beds: 10,
                bathrooms: 4,
            },
            // Ubicación de Google Maps: https://maps.app.goo.gl/L8btEiN8Pt1F58ti8
            geo: { latitude: 5.046077, longitude: -74.4549679 },
            features: [
                "Piscina privada",
                "Frente al río",
                "Asador BBQ & Zona verde",
                "Atención personalizada de anfitrión"
            ],
            images: [
                "/images/casa-bambu/bambu-1.jpg",
                "/images/casa-bambu/bambu-2.jpg",
                "/images/casa-bambu/bambu-3.jpg",
                "/images/casa-bambu/bambu-4.jpg",
                "/images/casa-bambu/bambu-5.jpg",
                "/images/casa-bambu/bambu-6.jpg",
                "/images/casa-bambu/bambu-7.jpg",
                "/images/casa-bambu/bambu-8.jpg",
                "/images/casa-bambu/bambu-9.jpg",
                "/images/casa-bambu/bambu-10.jpg",
            ]
        },
        {
            id: "1787473188757920090",
            name: "Casa Bellevue",
            slug: "casa-bellevue",
            tagline: "Piscina Infinita, Jacuzzi y Vista Panorámica",
            description: "Eleva tu descanso a otro nivel en una finca de gran lujo diseñada para cautivar todos tus sentidos. En Casa Bellevue, el atardecer sobre las montañas de Villeta se contempla desde una espectacular piscina infinita y un jacuzzi con hidromasaje privado que parecen flotar sobre el horizonte.\n\nSu arquitectura contemporánea fusiona espacios abiertos, iluminación natural y confort de categoría superior. Un santuario de paz a solo hora y media de Bogotá, ideal para quienes buscan privacidad absoluta, desconexión del ritmo urbano y una experiencia vacacional verdaderamente exclusiva.\n\nAdministrada con la excelencia integral de Villeta Conserje para que tu única preocupación al llegar sea relajarte y disfrutar de un descanso insuperable.\n\nLa exclusividad de esta propiedad hace que su calendario tenga alta demanda. Consulta disponibilidad hoy mismo y asegura tu estadía antes de que se agoten las fechas.",
            location: "Villeta, Cundinamarca",
            airbnbUrl: "https://www.airbnb.es/rooms/1787473188757920090",
            isSuperhost: true,
            defaultRating: 5.0,
            defaultReviewsCount: 1,
            capacity: {
                guests: 8,
                bedrooms: 4,
                beds: 4,
                bathrooms: 5.5, // 5 baños completos + 1 medio baño
            },
            // Ubicación de Google Maps: https://goo.gl/maps/6SDcRWrSqJZhjdjg6
            geo: { latitude: 5.032984, longitude: -74.442525 },
            features: [
                "Piscina infinita con vista",
                "Jacuzzi hidromasaje privado",
                "Diseño arquitectónico moderno",
                "Servicio de conserjería VIP"
            ],
            images: [
                "/images/casa-bellevue/bellevue-1.jpg",
                "/images/casa-bellevue/bellevue-2.jpg",
                "/images/casa-bellevue/bellevue-3.jpg",
                "/images/casa-bellevue/bellevue-4.jpg",
                "/images/casa-bellevue/bellevue-5.jpg",
                "/images/casa-bellevue/bellevue-6.jpg",
                "/images/casa-bellevue/bellevue-7.jpg",
                "/images/casa-bellevue/bellevue-8.jpg",
                "/images/casa-bellevue/bellevue-9.jpg",
                "/images/casa-bellevue/bellevue-10.jpg",
            ]
        }
    ],

    // Estadísticas clave
    stats: {
        reviews: 27,
        rating: 5.0,
        isSuperhost: true,
        propertyType: "Fincas de Lujo en Villeta",
        income_generated: "$180M+",
    }
};
