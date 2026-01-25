# Manual del Desarrollador - Villeta Conserje

Este documento técnico detalla las funcionalidades especiales, la lógica de negocio y las integraciones del proyecto para facilitar su mantenimiento y escalabilidad.

## 1. Configuración Centralizada (`src/lib/config/siteConfig.ts`)
Toda la información del negocio se gestiona desde un solo lugar. Si necesitas cambiar números de teléfono, enlaces de Airbnb o estadísticas globales, hazlo aquí.
- **WhatsApp**: Se utiliza un número centralizado y mensajes predefinidos codificados con `encodeURIComponent`.
- **Stats**: Controla el número de reseñas y el rating que se muestra en el Hero y Testimonios.

## 2. Formulario de Contacto e Ingesta de Datos (`ContactForm.tsx`)
El componente más complejo del sitio debido a su lógica de validación personalizada.

### Lógica de Validación
- **Activación**: Los errores no se muestran hasta que el usuario realiza el primer intento de envío (`hasAttemptedSubmit`).
- **Estados del Botón**: 
    - Fondo Blanco / Texto Verde: Indica que el formulario es inválido después de un intento.
    - Fondo Verde / Texto Blanco: Estado inicial y estado habilitado (cuando `isFormComplete` es true).
- **Validaciones Especiales**:
    - **Email**: Regex estricto para asegurar formato `usuario@dominio.com`.
    - **Teléfono**: Regex para estructura colombiana (10 dígitos, inicio con 3).
    - **URL Condicional**: Si `renting_status` es "Si" o "A veces", el campo `property_url` se vuelve obligatorio.

### Integración con EmailJS
Usa el servicio `emailService.ts` que centraliza la comunicación. Asegúrate de que las variables de entorno coincidan con las del portal de EmailJS.

## 3. Carrusel de Propiedades (`FeaturedProperty.tsx`)
Implementado sin librerías externas para maximizar el rendimiento y control.
- **Intervalo**: Configurado a 2000ms (2 segundos).
- **Transición**: Usa `opacity` con una duración de 500ms y un `ease-in-out` para suavidad.
- **Imágenes**: Usa URLs directas de Airbnb (`muscache.com`). Si las imágenes dejan de verse, verifica que el parámetro `im_w=1200` esté presente y que Airbnb no haya cambiado sus políticas de Hotlinking.

## 4. Animaciones Especiales
- **Heartbeat Button** (`Testimonials.tsx`): Animación personalizada vía `styled-jsx` que combina escalado (`scale`) y pulsación de sombra (`box-shadow`) para crear un efecto de latido real.
- **Framer Motion**: Se utiliza en secciones para efectos de `fade-in-up` al hacer scroll.

## 5. SEO y Accesibilidad
- Cada página cuenta con metadatos optimizados en su respectivo `page.tsx` o `layout.tsx`.
- Los logos están envueltos en componentes `<Link />` para facilitar la navegación al home.
- Las páginas de **Privacidad** y **Términos** siguen la Ley 1581 de 2012 (Colombia).

## 6. Recomendaciones para el Futuro
- **Imágenes**: Si el proyecto crece, se recomienda migrar las imágenes a un servicio como Cloudinary o AWS S3 para evitar depender del hotlinking de Airbnb.
- **TypeScript**: Mantener el modo estricto para evitar errores en el build de producción de Next.js.
- **Formularios**: Si se agregan más campos, considerar mover la lógica de validación a una librería como `Zod` junto a `react-hook-form`.

---
**Desarrollado por**: Tech de Todos
**Contacto**: [techdetodos.com](https://techdetodos.com)
