# 🔧 Configuración de Google Search Console API

## Paso 1: Crear un proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en **"Crear proyecto"** (o selecciona uno existente)
3. Nombre sugerido: `villeta-conserje-gsc`
4. Haz clic en **Crear**

## Paso 2: Habilitar la API de Search Console

1. En el menú lateral, ve a **APIs y servicios > Biblioteca**
2. Busca **"Google Search Console API"**
3. Haz clic en **Habilitar**

## Paso 3: Crear una cuenta de servicio

1. Ve a **APIs y servicios > Credenciales**
2. Haz clic en **"Crear credenciales" > "Cuenta de servicio"**
3. Nombre: `gsc-analyzer`
4. Haz clic en **Crear y continuar**
5. En "Rol", selecciona **Propietario** (o déjalo en blanco si prefieres)
6. Haz clic en **Listo**

## Paso 4: Descargar la clave JSON

1. En la lista de cuentas de servicio, haz clic en la que acabas de crear
2. Ve a la pestaña **"Claves"**
3. Haz clic en **"Agregar clave" > "Crear clave nueva"**
4. Selecciona **JSON** y haz clic en **Crear**
5. Se descargará un archivo `.json` — **guárdalo como:**
   ```
   j:\INFORMACION\web\YENIFER MONSALVE\Villeta conserje\gsc-credentials.json
   ```

## Paso 5: Dar acceso a la cuenta de servicio en Search Console

1. Abre el archivo `gsc-credentials.json` y copia el campo `"client_email"`
   (será algo como `gsc-analyzer@tu-proyecto.iam.gserviceaccount.com`)
2. Ve a [Google Search Console](https://search.google.com/search-console)
3. Selecciona tu propiedad (ej: `https://www.villetaconserje.com`)
4. Ve a **Configuración > Usuarios y permisos**
5. Haz clic en **"Añadir usuario"**
6. Pega el `client_email` y selecciona **Propietario** o **Completo**
7. Haz clic en **Añadir**

## Paso 6: Configurar la URL del sitio

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Añade esta línea (reemplaza con tu dominio real):
   ```
   GSC_SITE_URL=https://www.villetaconserje.com
   ```

## Paso 7: Ejecutar el análisis

```bash
npm run gsc:analyze
```

---

> ⚠️ **IMPORTANTE:** Nunca subas el archivo `gsc-credentials.json` a Git.
> Ya se ha añadido al `.gitignore`.
