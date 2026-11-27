# Despliegue en Coolify

Igual que el sitio del spa: un contenedor en el VPS de Nodbu (`2.25.185.60`), gestionado por Coolify
(`https://panel.nodbu.com`). El `Dockerfile` de la raíz construye la imagen (Next.js `standalone`, ≈110 MB de RAM en uso).

## Estado actual (27 nov 2026)

| | |
|---|---|
| URL | `https://clinicaanacure.nodbu.com` desde el 27 nov 2026 (registro A en Hostinger, certificado de Let's Encrypt, **indexable** desde ese día). `https://clinicaanacure.agenda.nodbu.com` sigue sirviendo la misma web, con *Noindex*, para que los enlaces viejos no se rompan |
| Buscadores | Coolify: dominio nuevo *Indexable*, redirección HTTP → HTTPS *Permanent* (301). Sitemap enviado en Google Search Console (propiedad de dominio `nodbu.com`, cuenta nodbuco) y «Correcto» con 10 páginas (27 nov 2026) |
| Recurso en Coolify | `anacure-clinica-web`, uuid `9hbyuxihyhe6r6zxv8jcpwes`, proyecto `spa_ana_cure`, entorno `production` |
| Origen | GitHub público `nodbuco/anacure_clinica`, rama `main`, build pack **Dockerfile**, puerto **3000** |
| Versión publicada | `e25215a` (el código de `0cbee1d` más la guía), desplegada el 27 nov 2026 con el dominio nuevo, indexable y con las fotos calentadas |

`clinicaanacure.nodbu.com` tiene su propio registro A (`→ 2.25.185.60`): bajo `nodbu.com` no hay comodín. El subdominio viejo cuelga del comodín `*.agenda.nodbu.com`.

Variables cargadas (en Coolify 4 nacen como *build* y *runtime* a la vez; las `NEXT_PUBLIC_*` se incrustan en el build):

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://clinicaanacure.nodbu.com` |
| `NEXT_PUBLIC_SPA_URL` | `https://anacure.nodbu.com` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `clinicaanacure.nodbu.com` |
| `NEXT_PUBLIC_PLAUSIBLE_HOST` | sin cargar hasta activar Plausible |

## Publicar un cambio

Un recurso *Public Repository* no tiene webhook: un push a `main` **no** despliega solo.

1. Push a `main`.
2. En Coolify, el recurso → **Redeploy**. Desde la terminal del servidor equivale a:

   ```bash
   docker exec coolify php artisan tinker --execute='$a = App\Models\Application::where("uuid","9hbyuxihyhe6r6zxv8jcpwes")->first(); $u = new_public_id(); queue_application_deployment(application: $a, deployment_uuid: $u, force_rebuild: false, is_api: true); echo $u;'
   ```

   El estado queda en la tabla `application_deployment_queues` de `coolify-db` (`in_progress` → `finished`). Tarda unos 2 a 3 minutos.
3. Calentar las fotos: cada despliegue empieza con la caché vacía y la primera visita a cada foto esperaría su
   conversión a AVIF.

   ```bash
   npm run calentar -- https://clinicaanacure.nodbu.com
   ```

## Al pasar al dominio definitivo

Apuntar el DNS del dominio al VPS (`A → 2.25.185.60`), añadirlo en el recurso (puerto `3000`, borrar el `www.` que
Coolify agrega solo si el DNS no lo cubre), cambiar las tres variables del dominio, quitar el *Noindex* y
redesplegar. Dejar el subdominio temporal unos días y luego borrarlo.
