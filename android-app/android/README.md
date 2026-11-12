# Mi Wuawua para Android

Este proyecto empaqueta la app web Mi Wuawua como app de Android con
[Capacitor](https://capacitorjs.com/). El código de la app vive en la raíz
del repo (`client/`, `server/`); aquí, en `android-app/`, solo está el
envoltorio Android.

## Qué hay aquí

- `capacitor.config.json`: id de la app `com.emmanuel.miwuawua`, nombre
  "Mi Wuawua", carpeta web `www/`.
- `android/`: proyecto Android generado por Capacitor.
- `android/web-bundle.zip`: la app web ya construida (el contenido de
  `client/dist/`), lista para copiarse dentro del proyecto Android.
- `.github/workflows/android.yml` (en la raíz del repo): cada push a
  `main` que toque `android-app/` arma el APK de prueba
  automáticamente y lo deja descargable en la pestaña Actions.

## Armar el APK en tu computadora

1. Instala Node.js 20+, Java 17 y el Android SDK (API 34).
2. Copia la app web construida a `android-app/www/` (es el contenido de
   `client/dist/` después de compilar el proyecto en Muse).
3. Sincroniza y compila:

```bash
cd android-app
npm install
npx cap sync android
cd android
./gradlew assembleDebug
```

El APK queda en `android-app/android/app/build/outputs/apk/debug/app-debug.apk`.
Instálalo en el teléfono copiándolo y abriéndolo ahí.

## Publicar en Google Play (lo que falta)

1. Crear la cuenta de desarrollador de Google Play: $25 dólares, un
   solo pago, en https://play.google.com/console.
2. Crear la app en la consola con el id `com.emmanuel.miwuawua`.
3. Generar el AAB de lanzamiento firmado (release). Para eso se necesita
   un almacén de claves (keystore) propio: se crea una sola vez y hay
   que guardarlo muy bien, porque sin él no se pueden subir
   actualizaciones de la app.
4. Subir el AAB, llenar la ficha de la tienda (descripción, capturas,
   icono, política de privacidad) y enviar a revisión.

## Notas

- La app guarda el perfil personal (raza marcada, nombre, notas y foto)
  en el teléfono mismo cuando no hay servidor de Muse; en Muse sigue
  guardándose en el servidor como siempre.
- Cada vez que la app web cambie, hay que volver a copiar el contenido
  de `client/dist/` a `android-app/www/` y a
  `android-app/android/web-bundle.zip`, y correr `npx cap sync android`
  antes de compilar.
