# Villeta Conserje 🏡✨

> **Plataforma web de alto rendimiento para la administración integral, comercialización en Airbnb y gestión de hospitalidad de fincas de lujo en Villeta, Cundinamarca.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2_(App_Router)-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/jhonatan-monsalve/villeta-conserje/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#licencia)

---

## 📖 Tabla de Contenidos

1. [Visión General](#-visión-general)
2. [Propuesta de Valor y Características](#-propuesta-de-valor-y-características)
3. [Arquitectura y Stack Tecnológico](#-arquitectura-y-stack-tecnológico)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Módulos Destacados](#-módulos-destacados)
   - [Formulario de Valoración con Contingencia VIP WhatsApp](#1-formulario-de-valoración-con-contingencia-vip-whatsapp)
   - [Calculadora Interactiva de Ingresos](#2-calculadora-interactiva-de-ingresos)
   - [Motor de Blog y Contenidos SSG](#3-motor-de-blog-y-contenidos-ssg)
   - [Pipeline de Optimización de Imágenes WebP](#4-pipeline-de-optimización-de-imágenes-webp)
   - [Optimización para Motores de Búsqueda (SEO & GEO)](#5-optimización-para-motores-de-búsqueda-seo--geo)
6. [Instalación y Entorno Local](#-instalación-y-entorno-local)
7. [Variables de Entorno](#-variables-de-entorno)
8. [Scripts Disponibles](#-scripts-disponibles)
9. [Despliegue y CI/CD](#-despliegue-y-cicd)
10. [Seguridad y Rendimiento](#-seguridad-y-rendimiento)
11. [Créditos y Licencia](#-créditos-y-licencia)

---

## 🌟 Visión General

**Villeta Conserje** es una solución digital moderna diseñada para propietarios de fincas de recreo y casas campestres en Villeta y la región del Gualivá. La plataforma posiciona el modelo de negocio de gestión integral con estándar de **Superanfitrión en Airbnb**:

- Maximización de rentabilidad y ocupación en fines de semana y temporadas altas.
- Operación 360°: check-in/check-out personalizado, lencería de estándar hotelero, limpieza profunda de 47 puntos, mantenimiento de piscinas y zonas verdes.
- Atención de conserjería directa y soporte para huéspedes 24/7.
- Prospección y conversión ágil de nuevos propietarios interesados en delegar la administración de sus inmuebles.

El sitio está desarrollado bajo principios de **arquitectura Jamstack (Next.js SSG)**, combinando generación estática ultrarrápida, diseño responsivo premium con estética de hospitalidad de lujo, e integraciones fluidas con WhatsApp Business y EmailJS.

---

## 🚀 Propuesta de Valor y Características

| Característica | Beneficio para el Usuario / Negocio |
| :--- | :--- |
| **Generación Estática (SSG)** | Tiempos de carga menores a 1 segundo y puntuación verde en Core Web Vitals móviles. |
| **Formulario Resiliente** | Envía solicitudes vía EmailJS con fallback inteligente a WhatsApp precargado con datos del usuario. |
| **Calculadora de Ingresos** | Proyecta el potencial económico de fincas según capacidad y ocupación estimada. |
| **SEO Local & GEO Ready** | Datos estructurados JSON-LD, metadatos canónicos, Open Graph 1200x630 y favicons optimizados para Google Search. |
| **Motor de Blog Markdown** | Publicación de artículos educativos sobre agroturismo, tributación, RNT y rentabilidad vacacional. |
| **Panel de Administración** | Módulo de gestión para propietarios, blog y métricas de analítica (Search Console). |

---

## 🛠️ Arquitectura y Stack Tecnológico

### Frontend & Core
- **Framework:** [Next.js 14.2](https://nextjs.org/) (App Router, Server & Client Components)
- **Biblioteca Base:** [React 18](https://react.dev/)
- **Lenguaje:** [TypeScript 5.x](https://www.typescriptlang.org/) (tipado estricto en toda la aplicación)
- **Estilos:** [Tailwind CSS 3.4](https://tailwindcss.com/) con paleta personalizada de hospitalidad y lujo campestre
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/) para micro-interacciones suaves
- **Iconografía:** [React Icons](https://react-icons.github.io/react-icons/) (FontAwesome y Material Design Icons)
- **Tipografía:** [Google Fonts](https://fonts.google.com/) (`Playfair Display` para títulos editoriales y `Montserrat` para textos de interfaz)

### Servicios, APIs & Backend
- **Email Delivery:** [EmailJS Browser SDK](https://www.emailjs.com/) para ingesta de clientes potenciales
- **BaaS / Database:** [Supabase JS Client](https://supabase.com/) para autenticación y persistencia de datos
- **Optimización de Imágenes:** [next-image-export-optimizer](https://github.com/Niels-IO/next-image-export-optimizer) + [Sharp](https://sharp.pixelplumbing.com/) (generación de formatos `.webp` adaptativos)
- **Analítica & Google APIs:** Integración con Google Search Console API v3 para monitoreo orgánico

---

## 📂 Estructura del Proyecto

```text
villeta-conserje/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Pipeline de CI/CD para compilación y despliegue automatizado
├── content/
│   └── blog/                       # Artículos del blog en Markdown con frontmatter
│       ├── agroturismo-villeta-experiencias-finca.md
│       ├── cuanto-cuesta-administrar-una-finca-en-villeta.md
│       ├── duplicar-ingresos-finca-superhost.md
│       ├── inmobiliarias-alquiler-inmuebles-fincas-villeta.md
│       ├── nuevo-estandar-airbnb-villeta.md
│       ├── requisitos-legales-airbnb-villeta-rnt.md
│       └── semana-santa-villeta-2026-finca.md
├── public/
│   ├── images/                     # Fotografías y banners de propiedades
│   │   └── og-villeta-conserje.jpg # Banner Open Graph para redes sociales (1200x630 px)
│   ├── .htaccess                   # Reglas de Apache, CSP, HSTS y reescritura de URLs limpias
│   ├── favicon-48x48.png           # Favicon específico para Google Search
│   ├── favicon.ico                 # Favicon clásico multiplataforma
│   ├── icon-192.png                # Icono PWA / Android
│   └── apple-touch-icon.png        # Icono táctil para dispositivos iOS
├── scripts/
│   ├── generate-favicons.js        # Generador de favicons multirresolución
│   ├── generate-og-image.js        # Generador del banner oficial de Open Graph
│   └── gsc-analyze.js              # Analizador de rendimiento en Google Search Console
├── src/
│   ├── app/                        # Rutas de Next.js App Router
│   │   ├── admin/                  # Panel de administración, blog y CRM
│   │   ├── administracion-airbnb-villeta/ # Landing page específica de captación
│   │   ├── blog/                   # Catálogo y lector dinámico de artículos [slug]
│   │   ├── propiedades/            # Ficha de propiedades administradas [slug]
│   │   ├── valoracion/             # Página dedicada a la solicitud de valoración
│   │   ├── layout.tsx              # Layout raíz con metadatos, fuentes y JSON-LD
│   │   ├── page.tsx                # Página de inicio principal
│   │   ├── sitemap.ts              # Generador dinámico de mapa del sitio XML
│   │   └── robots.ts               # Directivas dinámicas para rastreadores web
│   ├── components/
│   │   ├── auth/                   # Componentes de autenticación y rutas protegidas
│   │   ├── layout/                 # Header, Footer, Container y Navegación
│   │   ├── sections/               # Secciones de la landing page
│   │   │   ├── Calculator/         # Calculadora interactiva de rentabilidad
│   │   │   ├── Contact/            # Formulario de valoración y modal WhatsApp
│   │   │   ├── FeaturedProperty/   # Exhibición de casos de éxito (Casa Bambú)
│   │   │   ├── Hero/               # Sección principal con propuesta de valor
│   │   │   ├── Solution/           # Comparativa: Por qué delegar en Villeta Conserje
│   │   │   └── Testimonials/       # Testimonios reales de propietarios
│   │   └── ui/                     # Botones, modales y selector de consentimiento de cookies
│   └── lib/
│       ├── api/                    # Adaptadores de servicios externos (EmailJS, Supabase)
│       ├── config/                 # Configuración global del sitio (siteConfig.ts)
│       └── blog.ts                 # Parser de Markdown, lectura de slugs y cálculo de lectura
├── tailwind.config.ts              # Configuración de diseño, tipografías y tokens de color
├── tsconfig.json                   # Configuración del compilador TypeScript
└── package.json                    # Dependencias y scripts de ejecución
```

---

## 💎 Módulos Destacados

### 1. Formulario de Valoración con Contingencia VIP WhatsApp
Ubicado en `src/components/sections/Contact/ContactForm.tsx`. Diseñado bajo principios de UX de hospitalidad de lujo:
- **Validación no intrusiva:** Valida campos requeridos (nombre, teléfono móvil colombiano de 10 dígitos, ubicación y correo electrónico). La casilla de URL o anuncio de Airbnb es opcional.
- **Cero alertas técnicas de error:** Si el servicio de mensajería experimenta intermitencia de red o cuotas agotadas, el sistema no muestra errores alarmantes al usuario.
- **Transición suave a WhatsApp:** Despliega una ventana modal con la **ficha de datos ingresados por el propietario** y un botón de acción principal para continuar la conversación con Yenifer Monsalve con un solo clic.

```text
Hola Yenifer 👋, quiero solicitar la valoración gratuita de mi finca en Villeta:

• Nombre: Carlos Propietario
• Teléfono: 300 123 4567
• Condominio / Vereda: Condominio La Cascada
• Renta actualmente: Si
• Email: carlos@ejemplo.com

Quedo atento(a) a coordinar la visita diagnóstica. ¡Muchas gracias!
```

### 2. Calculadora Interactiva de Ingresos
Ubicada en `src/components/sections/Calculator/Calculator.tsx`. Permite a los propietarios ajustar dinámicamente:
- Capacidad máxima de huéspedes de la finca.
- Tarifa promedio estimada por noche.
- Noches ocupadas al mes (fines de semana vs. festivos).
- Visualización de la proyección de ingresos brutos anuales y el impacto del estándar Superanfitrión.

### 3. Motor de Blog y Contenidos SSG
Ubicado en `src/app/blog/` y `content/blog/`:
- Los artículos se redactan en Markdown con metadatos YAML frontmatter (`title`, `description`, `author`, `date`, `tags`, `image`).
- Genera páginas estáticas optimizadas mediante `generateStaticParams`.
- Cálculo automático de tiempo de lectura y esquema JSON-LD tipo `Article` para cada publicación.

### 4. Pipeline de Optimización de Imágenes WebP
- Implementación de `next-image-export-optimizer` para sitios exportados estáticamente.
- Convierte automáticamente todas las imágenes a formatos `.webp` en múltiples resoluciones (`10, 16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840 px`).
- Evita el bloqueo del renderizado y optimiza la métrica Largest Contentful Paint (LCP).

### 5. Optimización para Motores de Búsqueda (SEO & GEO)
- **Metadatos Canónicos y Open Graph:** Banner `1200x630 px` con encuadre protegido para recorte 1:1 en previsualizaciones de WhatsApp, LinkedIn, Facebook y Twitter Cards.
- **Favicons compatibles con directrices de Google:** Archivos en múltiplos exactos de 48 px (`48x48`, `96x96`, `192x192 px`) garantizando la aparición del logotipo oficial en los fragmentos enriquecidos de la Búsqueda de Google.
- **Datos Estructurados (JSON-LD):** Esquemas `RealEstateAgent`, `LocalBusiness`, `BreadcrumbList` y `FAQPage` embebidos para reconocimiento por agentes y motores de búsqueda generativa (GEO / AI Overviews).

---

## 💻 Instalación y Entorno Local

### Prerrequisitos
- **Node.js:** Versión 18.17.0 o superior (recomendado Node 20 LTS).
- **Gestor de paquetes:** `npm` (incluido con Node.js).

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jhonatan-monsalve/villeta-conserje.git
   cd villeta-conserje
   ```

2. **Instalar dependencias:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configurar variables de entorno:**
   Copia el archivo de ejemplo y completa tus credenciales locales:
   ```bash
   cp .env.example .env.local
   ```

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para interactuar con la aplicación.

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con la siguiente estructura:

```env
# URL Canónica del Proyecto
NEXT_PUBLIC_SITE_URL=https://villetaconserje.com

# Servicio de Correo (EmailJS)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key

# Base de Datos y Autenticación (Supabase - Opcional para panel admin)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_supabase

# Credenciales de Google Search Console (Solo para scripts de análisis)
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-servicio@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## 📜 Scripts Disponibles

En el archivo `package.json` dispones de los siguientes comandos:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:3000`. |
| `npm run build` | Compila la aplicación Next.js y ejecuta la optimización de imágenes WebP. |
| `npm run start` | Inicia el servidor de producción optimizado. |
| `npm run lint` | Ejecuta ESLint para analizar la calidad y consistencia del código. |
| `npm run gsc:analyze` | Ejecuta el script de auditoría y rendimiento de Google Search Console. |
| `npm run gsc:queries` | Muestra las consultas con mayor número de impresiones y clics en Google. |
| `npm run gsc:export` | Exporta un informe detallado de tráfico orgánico a formato JSON. |

---

## 🚀 Despliegue y CI/CD

El repositorio cuenta con integración continua configurada mediante **GitHub Actions** (`.github/workflows/deploy.yml`):

1. **Trigger:** Cada `push` a la rama `main` activa el pipeline automático.
2. **Build:** Instala dependencias con `npm install --legacy-peer-deps`, compila Next.js en modo estático y procesa las imágenes optimizadas.
3. **Deploy:** Sincroniza los artefactos generados directamente en el servidor de hosting vía FTPS seguro.
4. **Cloudflare & Apache:** El servidor procesa el archivo `.htaccess` garantizando compresión Gzip/Brotli, encabezados HSTS y URLs amigables.

---

## 🛡️ Seguridad y Rendimiento

- **Cabeceras HTTP Seguras:** Configuración estricta en `.htaccess` incluyendo:
  - `Strict-Transport-Security (HSTS)`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- **Gestión de Privacidad:** Banner de cookies conforme con la Ley 1581 de 2012 de Protección de Datos Personales en Colombia.
- **Rutas Protegidas:** Módulos de administración protegidos con verificación de sesión y permisos.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más información.

---

<div align="center">
  <sub>Desarrollado con dedicación para <strong>Villeta Conserje</strong>. Impulsando la hospitalidad y rentabilidad del turismo campestre en Colombia.</sub>
</div>
