# Despliegue en Coolify

Igual que el sitio del spa: un contenedor en el VPS de Nodbu (`2.25.185.60`), gestionado por Coolify
(`https://panel.nodbu.com`). El `Dockerfile` de la raíz construye la imagen (Next.js `standalone`, ≈110 MB de RAM en uso).

## Estado actual (2 oct 2026)

| | |
|---|---|
| URL temporal | `https://clinicaanacure.agenda.nodbu.com` (certificado de Let's Encrypt, *Noindex* activo) |
| Recurso en Coolify | `anacure-clinica-web`, uuid `9hbyuxihyhe6r6zxv8jcpwes`, proyecto `spa_ana_cure`, entorno `production` |
| Origen | GitHub público `nodbuco/anacure_clinica`, rama `main`, build pack **Dockerfile**, puerto **3000** |

El subdominio cuelga del comodín `*.agenda.nodbu.com`, que ya apunta al VPS: no hubo que tocar el DNS de Hostinger.

Variables cargadas (en Coolify 4 nacen como *build* y *runtime* a la vez; las `NEXT_PUBLIC_*` se incrustan en el build):

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://clinicaanacure.agenda.nodbu.com` |
| `NEXT_PUBLIC_SPA_URL` | `https://anacure.agenda.nodbu.com` (luego `https://anacure.co`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `clinicaanacure.agenda.nodbu.com` |
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
   npm run calentar -- https://clinicaanacure.agenda.nodbu.com
   ```

## Al pasar al dominio definitivo

Apuntar el DNS del dominio al VPS (`A → 2.25.185.60`), añadirlo en el recurso (puerto `3000`, borrar el `www.` que
Coolify agrega solo si el DNS no lo cubre), cambiar las tres variables del dominio, quitar el *Noindex* y
redesplegar. Dejar el subdominio temporal unos días y luego borrarlo.
