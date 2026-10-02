# Despliegue en Coolify

Igual que el sitio del spa: un contenedor en el VPS de Nodbu (`2.25.185.60`), gestionado por Coolify
(`https://panel.nodbu.com`). El `Dockerfile` de la raíz construye la imagen (Next.js `standalone`, ≈150 MB).

## Crear el recurso

1. Proyecto → **+ New Resource** → *Public Repository*: `https://github.com/nodbuco/anacure_clinica`, rama `main`.
2. **Build Pack: Dockerfile.** Puerto expuesto: `3000`.
3. Dominio. Mientras no exista el definitivo sirve un subdominio del comodín `*.agenda.nodbu.com`
   (por ejemplo `https://clinica.agenda.nodbu.com`), que ya resuelve sin tocar DNS. Borrar el `www.` que Coolify
   añade solo: el comodín no lo cubre y el certificado falla. Activar *Noindex* mientras sea temporal.
4. Variables (en Coolify 4 nacen como *build* y *runtime* a la vez; las `NEXT_PUBLIC_*` se incrustan en el build):

   | Variable | Valor |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | el dominio del paso 3 |
   | `NEXT_PUBLIC_SPA_URL` | `https://anacure.agenda.nodbu.com` (luego `https://anacure.co`) |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | el mismo dominio, sin `https://` |
   | `NEXT_PUBLIC_PLAUSIBLE_HOST` | vacío hasta activar Plausible |

5. *Health check*: `/robots.txt` (el `Dockerfile` trae uno equivalente). **Deploy.**

Un recurso *Public Repository* no tiene webhook: cada push necesita *Redeploy* (o la GitHub App de Coolify).

## Después de cada despliegue

```bash
npm run calentar -- https://<dominio>
```

Pide cada tamaño de cada foto para que ninguna visitante espere la primera conversión a AVIF.

## Al pasar al dominio definitivo

Apuntar el DNS (`A @ → 2.25.185.60`), añadir el dominio en Coolify, cambiar las tres variables del dominio,
quitar el *Noindex* y redesplegar.
