---
name: Clínica Estética Ana Cure
description: Cirugía plástica a la luz — un sitio que se ilumina como una caja de luz clínica.
colors:
  noche: "#141313"
  grafito: "#1C1B1B"
  grafito-elevado: "#262424"
  humo: "#3A3838"
  niebla: "#A19E9E"
  perla: "#F4F4F3"
  blanco: "#FFFFFF"
  linea: "#E3E2E1"
  carbon: "#5E5C5C"
  tinta: "#1A1919"
  difusor: "#F6F3EC"
  oro-claro: "#F3C989"
  oro: "#D8A863"
  oro-oscuro: "#B68039"
  oro-profundo: "#A96922"
  oro-texto: "#8A5519"
  alerta: "#A12C1F"
typography:
  titan:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.9rem, 1.15rem + 7.4vw, 6rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  titulo:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.25rem + 3.9vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  manifiesto:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.05rem + 2.9vw, 3.4rem)"
    fontWeight: 300
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  subtitulo:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.15rem + 1.7vw, 2.5rem)"
    fontWeight: 300
    lineHeight: 1.12
    letterSpacing: "-0.022em"
  tarjeta:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 1.1rem + 0.8vw, 1.75rem)"
    fontWeight: 300
    lineHeight: 1.18
    letterSpacing: "-0.016em"
  entrada:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.55vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.008em"
  cuerpo:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.006em"
  etiqueta:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  control: "1rem"
  panel: "1.75rem"
  panel-lg: "2.25rem"
  pill: "9999px"
spacing:
  gutter-movil: "16px"
  gutter-tableta: "24px"
  gutter-escritorio: "32px"
  mosaico: "20px"
  seccion: "clamp(5.5rem, 11vw, 10rem)"
components:
  boton-oro:
    textColor: "{colors.noche}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  boton-contorno-claro:
    backgroundColor: "transparent"
    textColor: "{colors.perla}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  boton-contorno-oscuro:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  panel-difusor:
    backgroundColor: "{colors.blanco}"
    rounded: "{rounded.panel-lg}"
    padding: "40px"
  panel-grafito:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.perla}"
    rounded: "{rounded.panel-lg}"
  placa:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.perla}"
    rounded: "{rounded.panel}"
  placa-encendida:
    backgroundColor: "{colors.difusor}"
    rounded: "{rounded.panel}"
  campo:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0 16px"
  opcion-elegida:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.control}"
    padding: "16px"
---

# Design System: Clínica Estética Ana Cure

## Overview

**Creative North Star: "La caja de luz"**

El sitio funciona como el negatoscopio donde el cirujano lee cada caso: todo aparece iluminado desde atrás. La gramática es la de una página de producto de Apple (titulares grandes, mosaicos de esquinas suaves, escenas ligadas al scroll), pero el producto es una clínica y la luz es su argumento: el quirófano real abre la página en video, los paneles se «encienden» al entrar y los resultados llegan apagados hasta que la persona decide verlos.

Es un sistema de tres tintas: grafito cálido, oro del logo y blanco perla. El oro es la única luz; nunca decora un fondo entero. La densidad es baja y el ritmo alterna secciones oscuras (escenas, resultados, cierre) con secciones claras (procedimientos, proceso, recuperación, equipo), cada una con una sola idea y pocas palabras.

**Key Characteristics:**
- Video del quirófano real, graduado en grafito y oro, que se recoge en un panel curvo al bajar.
- Paneles de radio amplio que se superponen; nunca sombras.
- Inter Light grande y apretada, con el corte de tamaño óptico de titular.
- Movimiento como luz: enfocar, encender, dibujar la línea dorada.
- Material propio, sin fotos de stock: quirófano, equipo y resultados de la clínica.

## Colors

Una paleta casi monocroma de grafitos y perlas tibios (derivados del gris carbón del kit) con el oro del logo como única fuente de luz.

### Primary
- **Oro del logo** (oro): el pan de oro del botón principal, la línea del recorrido, los puntos alcanzados, los íconos de luz. Se combina con oro claro y oro oscuro en el degradado del botón, igual que el logo.
- **Oro claro** (oro-claro): texto dorado sobre grafito (enlaces con chevron, el cierre del manifiesto), 12:1 sobre noche.
- **Oro de texto** (oro-texto): el único oro para texto sobre claro (roles, detalles, enlaces), 6,2:1 sobre blanco.

### Neutral
- **Noche** (noche): fondo de las secciones oscuras y del hero.
- **Grafito** (grafito) y **grafito elevado** (grafito-elevado): paneles sobre noche y su capa de estado.
- **Humo** (humo): líneas y divisores sobre oscuro.
- **Niebla** (niebla): texto secundario sobre oscuro, 7:1.
- **Perla** (perla): fondo claro, el difusor apagado; también el texto principal sobre oscuro.
- **Blanco** (blanco): paneles difusores sobre perla.
- **Difusor** (difusor): el blanco cálido de una placa encendida; aparece solo detrás de un resultado visible.
- **Línea** (linea): bordes y divisores sobre claro.
- **Carbón** (carbon): el gris del kit, texto secundario sobre claro, 6:1.
- **Tinta** (tinta): texto principal sobre claro.
- **Alerta** (alerta): solo para errores de formulario, 6,6:1 sobre perla.

### Named Rules
**The Three Inks Rule.** Grafito, oro y perla, nada más; también el botón de WhatsApp va en grafito y oro, nunca en verde. La única excepción es el rojo de alerta en los errores.

**The Gold Is Light Rule.** El oro marca lo que está encendido o es accionable: botón principal, línea alcanzada, enlaces. Nunca llena una sección ni un panel.

## Typography

**Display Font:** Inter variable del kit (con system-ui de respaldo), en peso 300 y tamaño óptico automático: los titulares toman el corte «Display» solos.
**Body Font:** la misma Inter, en 400 y 500.

**Character:** una sola familia en dos voces: Light enorme y apretado para afirmar, Regular cómodo para explicar. Sin cursivas, sin serifas, sin mayúsculas sostenidas.

### Hierarchy
- **Titán** (300, clamp 2,9–6 rem, 1,02): el titular del hero, el cierre y el nombre de cada procedimiento.
- **Título** (300, clamp 2,25–4,5 rem, 1,04): un titular por sección, terminado en punto («Procedimientos.»).
- **Manifiesto** (300, clamp 1,75–3,4 rem, 1,16): la frase cuyas palabras se encienden con el scroll.
- **Subtítulo** (300, clamp 1,6–2,5 rem, 1,12): títulos de panel (Cuerpo, Busto, Rostro) y bloques internos.
- **Tarjeta** (300, clamp 1,35–1,75 rem): nombres en listas, pasos y escenas.
- **Entrada** (400, clamp 1,125–1,4 rem, 1,5): la línea que acompaña cada título; máximo unas 36 rem de ancho.
- **Cuerpo** (400, 17 px, 1,55): texto corrido, 38 rem de ancho como máximo.
- **Etiqueta** (500, 0,85 rem): roles, detalles de caso, rótulos de campo.

### Named Rules
**The No Eyebrow Rule.** Ningún título lleva rótulo encima. El título habla solo; el dato secundario va debajo (rol, detalle) en oro de texto.

**The Period Rule.** Los títulos de sección son frases cortas y terminan en punto.

## Layout

Contenedor de 78 rem con márgenes de 16 px en el celular, 24 px en tableta y 32 px en escritorio. Las secciones respiran con un ritmo único (5,5–10 rem). En escritorio, los mosaicos usan una rejilla de 12 columnas con 20 px de separación: un panel grande de 7 columnas junto a dos de 5, o dos de 7/5 para fotos. En celular todo se apila en una columna y los conjuntos largos (espacios de la clínica, resultados) se vuelven carriles horizontales con anclaje magnético que dejan ver el siguiente elemento.

Las escenas largas (hero, clínica) usan una pista alta con un bloque fijo (sticky) dentro; no hay pines de JavaScript. La barra de navegación mide 56 px y todo ancla compensa ese alto.

## Elevation & Depth

Sin sombras. La profundidad sale de tres fuentes: superposición (los paneles de procedimientos se apilan al bajar en celular y tableta, cada uno cubriendo al anterior), luz (los paneles pasan de apagados a encendidos y, en PC, un halo dorado sigue al puntero sobre los difusores) y alternancia tonal entre noche, grafito y perla.

### Named Rules
**The Overlap Not Shadow Rule.** Si algo debe verse encima, se superpone; nunca se le pone sombra.

**The Light On Entry Rule.** Los paneles e imágenes se encienden al entrar (enfoque y brillo, sin transparencia); los titulares y el texto ya están ahí.

## Shapes

Esquinas grandes y suaves al estilo de los mosaicos de Apple: 28 px en placas y fotos medianas, 36 px en paneles y medios grandes, 16 px en campos y opciones, píldora en botones. El hero empieza a sangre y termina recogido en un panel de 36 px (28 px en el celular). Los únicos bordes son líneas de 1 px entre filas.

## Components

### Buttons
- **Shape:** píldora (9999px), alto 52 px en el principal y 44 px en los compactos.
- **Primary (oro):** degradado del logo (oro claro → oro → oro oscuro) con texto noche; al pasar el ratón el degradado se desliza. Al presionar baja a 97 %.
- **Contorno claro / oscuro:** borde de 1 px que se intensifica al pasar el ratón; para WhatsApp y acciones secundarias.
- **Enlace con chevron:** texto en oro (claro u oro de texto) con un chevron que avanza 2 px al pasar el ratón; es la acción secundaria por defecto («Ver procedimientos›»).

### Cards / Containers
- **Panel difusor:** blanco sobre perla (o grafito sobre noche), radio de 36 px, 28–40 px de relleno, filas separadas por líneas de 1 px; el halo del puntero vive aquí.
- **Panel de foto:** imagen a sangre con un velo noche desde abajo para el texto.
- **Panel de llamado:** noche sobre perla, con título, una línea y el botón de oro.

### Inputs / Fields
- **Campo:** blanco, borde línea, radio de 16 px, 52 px de alto; con foco el borde pasa a tinta y aparece el anillo de oro.
- **Opción (radio/checkbox):** panel de 16 px con un indicador redondo; la elegida pasa a blanco con borde tinta doble.
- **Error:** mensaje en alerta debajo del grupo y el foco salta al primer campo pendiente.

### Navigation
Barra local fija de 56 px: logo a la izquierda, cinco enlaces de 13 px en el centro (solo escritorio) y el botón de oro a la derecha. Cambia de tono según la sección de debajo (grafito translúcido o perla translúcido, con desenfoque en su propia capa). En el celular, una hoja a pantalla completa con enlaces grandes en Light.

### Placa (signature)
Cada resultado es una placa de grafito con radio de 28 px. Apagada, muestra solo una vista de 16 px borrosa y casi negra con un ícono de luz; encendida, el tubo parpadea dos veces y la foto aparece completa sobre el blanco difusor. Interruptor de dos estados con `aria-pressed`, más «Encender todas».

### Escena de la clínica (signature)
En escritorio, una lista de espacios a la izquierda con una línea de progreso dorada y un panel grande a la derecha; al bajar se enciende un espacio a la vez. En el celular, un carril de tarjetas.

## Do's and Don'ts

### Do:
- **Do** usar material propio de la clínica (quirófano, equipo, sedes, resultados) y registrar su origen en la imagen.
- **Do** mantener los resultados apagados por defecto y cargar la foto solo al encenderla.
- **Do** dar a toda escena de scroll una versión quieta con `prefers-reduced-motion`.
- **Do** verificar 4,5:1 en texto pequeño y 3:1 en titulares, también en los estados animados.

### Don't:
- **Don't** usar sombras, vidrio decorativo ni texto en degradado.
- **Don't** poner rótulos o «eyebrows» sobre los títulos.
- **Don't** introducir un cuarto color (ni el verde de WhatsApp ni el púrpura del spa).
- **Don't** usar fotos de stock ni prometer resultados.
