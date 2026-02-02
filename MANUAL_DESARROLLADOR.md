# Manual del Desarrollador - Villeta Conserje

Este documento técnico detalla las funcionalidades especiales, la lógica de negocio y las integraciones del proyecto para facilitar su mantenimiento y escalabilidad.

## 1. Configuración Centralizada (`src/lib/config/siteConfig.ts`)
Toda la información del negocio se gestiona desde un solo lugar. Si necesitas cambiar números de teléfono, estadísticas globales o enlaces, hazlo aquí.
- **WhatsApp**: Se utiliza un número centralizado y mensajes predefinidos.
- **Stats**: Controla estadísticas que se muestran en Hero y Testimonios.

## 2. Gestión de Imágenes y Optimización
Para garantizar una velocidad de carga "verde" en móviles (PageSpeed), usamos `next-image-export-optimizer`.

### Cómo añadir nuevas imágenes:
1.  **Directorio**: Guarda las imágenes en `public/images/`.
2.  **Formato**: Preferiblemente `.jpg` o `.png`. El optimizador las convertirá a `.webp` automáticamente al compilar.
3.  **Componente**: Usa siempre `ExportedImage` en lugar de `img` o `Image` de Next.js.
    ```tsx
    import ExportedImage from "next-image-export-optimizer";
    // ...
    <ExportedImage src="images/tu-foto.jpg" alt="..." width={500} height={300} />
    ```
4.  **Sharp**: La librería `sharp` es necesaria para la conversión de imágenes durante el build.

## 3. Servidor y Seguridad (`.htaccess` y Cloudflare)
El proyecto está optimizado para **LatinoAmérica Hosting** (Apache) y protegido por **Cloudflare**.

### Configuración `.htaccess` (en `public/`):
Este archivo es crítico y gestiona:
- **URLs Limpias**: Permite entrar a `/blog/artículo` en lugar de `/blog/artículo.html`.
- **Encabezados de Seguridad**: Incluye `HSTS`, `Content-Security-Policy (CSP)`, `X-Frame-Options` y `Permissions-Policy` (Calificación A en SecurityHeaders.com).
- **Error 404**: Redirige automáticamente errores al diseño personalizado en `src/app/not-found.tsx`.

### Configuración Cloudflare:
- **SSL/TLS**: Modo **"Completo"** (Full). No usar "Flexible" ya que causa bucles de redirección.
- **TLS**: Versión mínima **1.2** para máxima compatibilidad y seguridad (SSL Labs Grade A).
- **HTTPS**: Opción "Always use HTTPS" activada.

## 4. Formulario de Contacto e Ingesta de Datos (`ContactForm.tsx`)
El componente usa validación personalizada en tiempo real.
- **Activación**: Los errores no se muestran hasta que el usuario realiza el primer intento de envío (`hasAttemptedSubmit`).
- **Integración con EmailJS**: Usa `emailService.ts`. Asegúrate de que las variables de entorno estén configuradas en GitHub para que el deploy funcione.

## 5. Privacidad y Cookies
- **Consentimiento de Cookies** (`src/components/ui/CookieConsent.tsx`): Implementado para cumplir con normativas de privacidad. Aparece tras 2 segundos y se guarda en `localStorage` tras la aceptación.
- **Privacidad**: El sitio incluye una página de privacidad que sigue la Ley 1581 de 2012 (Colombia).

## 6. CI/CD y Despliegue (GitHub Actions)
El flujo de despliegue automático está en `.github/workflows/deploy.yml`.
- **IMPORTANTE**: Debido a conflictos de versiones con el optimizador de imágenes, el comando de instalación DEBE ser: `npm install --legacy-peer-deps`.
- **Servidor FTP**: En la configuración de GitHub, usa siempre la **IP del servidor** en la variable `FTP_SERVER`, no el dominio, para evitar bloqueos por el proxy de Cloudflare.

## 7. Animaciones Especiales
- **Scroll Reveal**: Se usa un componente envolvente que utiliza Framer Motion para animar la entrada de las secciones.
- **Heartbeat Button**: Animación personalizada vía `styled-jsx` para el botón de llamada a la acción en testimonios.

---
**Mantenimiento**: Tech de Todos
**Contacto**: [techdetodos.com](https://techdetodos.com)
