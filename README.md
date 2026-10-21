# Clínica Estética Ana Cure · sitio web

Sitio de la clínica de cirugía plástica y medicina estética de Ana Cure, en Aguachica (Cesar).
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
| Sede (Aguachica) y horario | `data/sedes.ts` |

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

- **Dirección visual «Papelería clínica»** (rediseño del 21 oct 2026): la clínica contada con su propia
  papelería. Cartulina gris carbón del kit, tarjetas de algodón troqueladas, logo y botones estampados en el oro
  del kit. Tokens en `app/globals.css`; sistema completo en `DESIGN.md`.
- **Hero**: video del quirófano real (`public/media/hero/`, AV1 + H.264, versión vertical para el celular).
  Con `prefers-reduced-motion` o ahorro de datos se queda el póster.
- **Movimiento**: la tarjeta de valoración cae y se estampa el sello al cargar; la tarjeta de controles se
  perfora paso a paso al bajar (GSAP, `lib/gsap.ts`); las fotos se descubren y el oro brilla con CSS de scroll.
  Todo tiene versión quieta.
- **Procedimientos**: cada uno con su lámina de marcaje (`components/procedimientos/Lamina.tsx`), dibujada a mano
  en SVG: figura en grafito y el marcaje del cirujano en oro, que se dibuja al entrar en pantalla. Para añadir un
  procedimiento, agrega su lámina en `LAMINAS` (si no tiene, la casilla queda sin dibujo).
- **Resultados**: llegan en sobre cerrado; la foto real solo se descarga cuando la persona abre el sobre.
- **Analítica**: `lib/analytics.ts` (Plausible cuando exista `NEXT_PUBLIC_PLAUSIBLE_HOST`).

## Pendiente de confirmar con Ana

- Número de habilitación sanitaria (si debe figurar en el sitio).
- La plataforma de la valoración virtual.
- Retratos de cada médico y los roles exactos de la Dra. Diana García y el Dr. Javier de la Rosa.
- Si la clínica factura con la misma sociedad del spa (pie de página y política de datos).
- Que el convenio con FOMAG sigue vigente en 2026 (el sitio lo menciona en el cierre y en el formulario).
- Si opera más de un cirujano plástico (hoy el sitio dice «el cirujano plástico», en singular).
- Si el **Dr. Carlos Romero** sigue en la clínica: su nombre se lee en un gorro de `public/media/clinica/cirugia.jpg`
  y `public/media/equipo/equipo-quirurgico.jpg`. Esas dos fotos no se usan hasta confirmarlo.
- Dominio definitivo y correo para peticiones de datos personales.
