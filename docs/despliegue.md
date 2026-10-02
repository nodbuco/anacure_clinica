# Despliegue en Coolify

Igual que el sitio del spa: un contenedor en el VPS de Nodbu (`2.25.185.60`), gestionado por Coolify
(`https://panel.nodbu.com`). El `Dockerfile` de la raíz construye la imagen (Next.js `standalone`, ≈150 MB).

## Dominio temporal: `clinicaanacure.nodbu.com`

Elegido el 2 oct 2026. **No** está bajo el comodín `*.agenda.nodbu.com`, así que necesita su propio registro en el
DNS de Hostinger (hPanel → Dominios → `nodbu.com` → DNS):

| Tipo | Nombre | Apunta a | TTL |
|---|---|---|---|
| A | `clinicaanacure` | `2.25.185.60` | 300 |

Comprobar con `dig +short clinicaanacure.nodbu.com` antes de desplegar: Let's Encrypt solo emite el certificado
cuando el nombre ya resuelve.

## Crear el recurso

En el proyecto del cliente (`spa_ana_cure`, entorno `production`), junto al sitio del spa:

1. **+ New Resource** → *Public Repository*: `https://github.com/nodbuco/anacure_clinica`, rama `main`.
2. **Build Pack: Dockerfile.** Puerto expuesto: `3000`.
3. Dominio `https://clinicaanacure.nodbu.com`, puerto `3000`. Borrar el dominio automático y cualquier `www.` que
   Coolify añada solo. Activar *Noindex* mientras sea temporal.
4. Variables (en Coolify 4 nacen como *build* y *runtime* a la vez; las `NEXT_PUBLIC_*` se incrustan en el build):

   | Variable | Valor |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://clinicaanacure.nodbu.com` |
   | `NEXT_PUBLIC_SPA_URL` | `https://anacure.agenda.nodbu.com` (luego `https://anacure.co`) |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `clinicaanacure.nodbu.com` |
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
