# Villeta Conserje - Gestión Premium en Airbnb

Sitio web profesional para la gestión de propiedades de lujo en Villeta, Cundinamarca. Enfocado 100% en optimización de rentabilidad para Airbnb bajo el estándar de Superanfitrión.

## 🚀 Tecnologías Principales

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router)
- **Despliegue**: Exportación Estática (Static HTML)
- **Optimización de Imágenes**: `next-image-export-optimizer`
- **Seguridad**: Cloudflare (TLS 1.2+ & CSP Headers)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) & CSS Transitions
- **Integraciones**: [EmailJS](https://www.emailjs.com/) para gestión de formularios

## 🛠️ Instalación y Desarrollo

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/jhonatan-monsalve/villeta-conserje.git
   ```

2. **Instalar dependencias**:
   ```bash
   # MUY IMPORTANTE: Usar este flag para evitar conflictos de versiones
   npm install --legacy-peer-deps
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```
   El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

4. **Construir para producción (Build)**:
   ```bash
   npm run build
   ```
   Este comando genera los archivos estáticos y optimiza todas las imágenes automáticamente.

## 📁 Estructura del Proyecto

- `src/app`: Rutas del sitio y páginas principales.
- `src/components`: Componentes organizados por `layout`, `sections` y `ui`.
- `src/lib`: Configuración centralizada (`siteConfig.ts`) y servicios.
- `public/images`: Almacenamiento de fotos locales para optimización automática.

## 📄 Documentación Detallada

Para mantenimiento técnico, configuración de Cloudflare o gestión de servidores, consulte el:
👉 [**MANUAL_DESARROLLADOR.md**](./MANUAL_DESARROLLADOR.md)

---
**Desarrollado por**: [Tech de Todos](https://techdetodos.com)
