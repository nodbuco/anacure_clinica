# Clínica Estética Ana Cure · sitio web

Sitio de la clínica de cirugía plástica y medicina estética de Ana Cure (Aguachica y El Banco).
Su trabajo es uno: que la persona pida su **valoración gratuita para la próxima jornada**. El formulario
arma el mensaje y lo abre en el WhatsApp de la clínica; el sitio no guarda datos.

Sitio hermano: Ana Cure Estética & Spa (`nodbuco/anacure_esteticayspa`), donde sigue la recuperación.

## Lo que se cambia a menudo

| Qué | Dónde |
|---|---|
| Fecha de la próxima jornada | `data/jornada.ts` → `fecha: "2026-11-14"` (o `null` si aún no hay) |
| Procedimientos y sus textos | `data/procedimientos.ts` |
| Resultados (antes y después) | `data/resultados.ts` + la foto en `public/media/resultados/` |
| Médicos | `data/equipo.ts` |
| WhatsApp, Instagram, datos legales | `data/site.ts` |
| Sedes y horario | `data/sedes.ts` |

Cada cambio se publica con un nuevo despliegue (ver `docs/despliegue.md`).

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3100
npm run build      # build de producción
npm run lint
```

Next.js 16 (App Router) · Tailwind CSS 4 · GSAP 3 con ScrollTrigger · TypeScript. Las variables de entorno
están en `.env.example`.

## Cómo está hecho

- **Dirección visual «A la luz»**: el negatoscopio (la caja de luz del cirujano) como idea de todo el sitio.
  Tres tintas: grafito, oro del kit y blanco perla. Tokens en `app/globals.css`; sistema completo en `DESIGN.md`.
- **Hero**: video del quirófano real (`public/media/hero/`, AV1 + H.264, versión vertical para el celular).
  Con `prefers-reduced-motion` o ahorro de datos se queda el póster.
- **Movimiento**: las escenas ligadas al scroll usan GSAP (`lib/gsap.ts`); los bloques que se «encienden» al
  entrar usan CSS de scroll, sin JavaScript. Todo tiene versión quieta.
- **Resultados**: llegan apagados; la foto real solo se descarga cuando la persona enciende la placa.
- **Analítica**: `lib/analytics.ts` (Plausible cuando exista `NEXT_PUBLIC_PLAUSIBLE_HOST`).

## Pendiente de confirmar con Ana

- Número de habilitación sanitaria (si debe figurar en el sitio).
- Si El Banco opera o solo valora, y la plataforma de la valoración virtual.
- Retratos de cada médico y los roles exactos de la Dra. Diana García y el Dr. Javier de la Rosa.
- Si la clínica factura con la misma sociedad del spa (pie de página y política de datos).
- Que el convenio con FOMAG sigue vigente en 2026 (el sitio lo menciona en el cierre y en el formulario).
- Que hoy operan varios cirujanos plásticos (el hero dice «cirujanos plásticos»; si es solo uno, va en singular).
- Dominio definitivo y correo para peticiones de datos personales.
