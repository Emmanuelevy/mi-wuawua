# Mi Wuawua

**Mi Wuawua** es una enciclopedia de razas de perros (Wuawuas) para identificar qué Wuawua tienes.

- **365 razas** de perros, más la tarjeta de **Mestizo**: 366 tarjetas en total. La primera es el Chihuahua.
- Cada tarjeta tiene foto real, estatura y peso aproximados, origen, vida aproximada, colores y cuidados. Al tocarla se voltea.
- **Búsqueda** por nombre y por familia (por ejemplo "Pitbull", "Pastor" o "Retriever"), sin importar acentos ni mayúsculas.
- **Secciones por tamaño** según la estatura: Pequeños (hasta ~40 cm), Medianos (40–60 cm) y Grandes (más de 60 cm).
- **Cuestionario** para identificar a tu Wuawua por su tamaño, orejas, pelaje, colores, cola y boquita (hocico).
- **Tarjeta personal**: marca la patita de una raza y se llena sola con sus datos; sube la foto de tu Wuawua y escribe sus notas.
- **Demo** con los pasos para usar la app, temas claro, oscuro y del sistema en 5 colores, y donativo por CoDi.
- Todo el contenido vive dentro de la app, sin nube: las fotos y los datos son locales.

## Cómo correrlo

Requisitos: [Bun](https://bun.sh) 1.3 o superior.

```bash
bun install
bun run build
```

La app es un espacio TypeScript de Muse (`space.json`, runtime `typescript`): el cliente está en `client/` (React) y las acciones del servidor en `server/` (Drizzle + SQLite).

## Estructura

- `client/src/` — App React, catálogo de razas (`breeds.ts` y `breeds-extra.ts`) y fotos en `client/src/assets/` (razas en `breeds/` y `breeds2/`, foto de Tiny, Mestizo, QR CoDi y fuentes).
- `server/src/` — acciones del servidor y esquema de la base de datos.
- `drizzle/` — migraciones de la base de datos.

## Créditos

© 2026 Ing. Emmanuel Salomón Santiago Bustamante. Hecho en México.
