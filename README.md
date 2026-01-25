# Villeta Conserje - Gestión Premium en Airbnb

Sitio web profesional para la gestión de propiedades de lujo en Villeta, Cundinamarca. Enfocado 100% en optimización de rentabilidad para Airbnb bajo el estándar de Superanfitrión.

## 🚀 Tecnologías Principales

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) & CSS Transitions
- **Iconos**: [React Icons](https://react-icons.github.io/react-icons/)
- **Integraciones**: [EmailJS](https://www.emailjs.com/) para gestión de formularios

## 🛠️ Instalación y Desarrollo

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/jhonatan-monsalve/villeta-conserje.git
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env.local` en la raíz con las credenciales de EmailJS:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
   ```

4. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```
   El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

- `src/app`: Rutas del sitio (Home, Privacidad, Términos).
- `src/components`: Componentes organizados por `layout`, `sections` y `ui`.
- `src/lib`: Configuración centralizada, servicios API y utilidades.
- `src/styles`: Configuraciones globales de diseño.

## 📄 Documentación Técnica
Para una comprensión profunda de las funcionalidades personalizadas (validaciones, carruseles, lógica de negocio), consulte el [MANUAL_DESARROLLADOR.md](./MANUAL_DESARROLLADOR.md).

---
**Desarrollado por**: [Tech de Todos](https://techdetodos.com)
