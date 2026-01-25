export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
    author: string;
    readTime: string;
    category: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "nuevo-estandar-airbnb-villeta",
        title: "El Nuevo Estándar de Airbnb en Villeta: De Alquiler Casual a Experiencia de Lujo",
        excerpt: "¿Por qué algunas fincas siempre están llenas mientras otras luchan por una reserva al mes? La respuesta está en la profesionalización del servicio.",
        date: "25 Ene, 2026",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
        author: "Yenifer Monsalve",
        readTime: "5 min",
        category: "Gestión",
        content: `
      <p>Villeta ya no es solo el destino de fin de semana para los bogotanos; se ha convertido en un epicentro de turismo de lujo y retiros conscientes. Sin embargo, muchos propietarios siguen operando bajo el modelo tradicional: entregar llaves y esperar que todo salga bien.</p>
      
      <h3>El cambio de mentalidad</h3>
      <p>Hoy, el huésped de Airbnb no busca una casa; busca una historia y una experiencia sin fricciones. Desde el momento en que ven las fotos hasta el check-out, cada detalle cuenta para asegurar esa reseña de 5 estrellas que impulsará el algoritmo.</p>
      
      <h3>Puntos clave de la gestión moderna:</h3>
      <ul>
        <li><strong>Hospitalidad Proactiva:</strong> Anticiparse a las necesidades del huésped (hielo listo, jacuzzi caliente, wifi probado).</li>
        <li><strong>Estandarización de Limpieza:</strong> El "limpio" de una finca tradicional no es el "limpio" de un hotel 5 estrellas. Aplicamos protocolos de 47 puntos.</li>
        <li><strong>Comunicación Instantánea:</strong> Responder en menos de 15 minutos marca la diferencia entre ganar una reserva o perderla.</li>
      </ul>
      
      <p>La buena gestión no es un gasto, es la inversión que garantiza que su activo de 2.000 millones de pesos trabaje para usted, y no al revés.</p>
    `
    },
    {
        slug: "duplicar-ingresos-finca-superhost",
        title: "Cómo Duplicar los Ingresos de tu Finca: El Poder del Superanfitrión",
        excerpt: "Descubre cómo el algoritmo de Airbnb premia la excelencia y cómo esto se traduce directamente en millones adicionales de ingresos mensuales.",
        date: "20 Ene, 2026",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
        author: "Equipo Villeta Conserje",
        readTime: "4 min",
        category: "Rentabilidad",
        content: `
      <p>Muchos propietarios se preguntan por qué su finca, siendo más grande o bonita, genera menos dinero que la del vecino. La clave no está solo en los metros cuadrados, sino en el <strong>Yield Management</strong> y el estado de Superanfitrión.</p>
      
      <h3>¿Qué es el Yield Management?</h3>
      <p>Es la estrategia de ajustar precios en tiempo real según la demanda, eventos locales y temporada. Un algoritmo de precios dinámicos puede aumentar la facturación entre un 20% y un 40% anual.</p>
      
      <h3>El algoritmo de Airbnb te vigila</h3>
      <p>Airbnb premia a los anfitriones que:</p>
      <ul>
        <li>Tienen un ratio de respuesta cercano al 100%.</li>
        <li>Cero cancelaciones por parte del anfitrión.</li>
        <li>Consistencia en reseñas de 5 estrellas.</li>
      </ul>
      
      <p>Al alcanzar el estatus de <strong>Superhost</strong>, tu propiedad sube en los resultados de búsqueda, recibe un distintivo de confianza y atrae a los huéspedes que están dispuestos a pagar tarifas premium.</p>
      
      <p>En Villeta Conserje, transformamos su propiedad en una máquina de generar ingresos pasivos mediante la aplicación de estas estrategias de alto rendimiento.</p>
    `
    }
];
