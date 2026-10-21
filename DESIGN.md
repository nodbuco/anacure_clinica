---
name: Clínica Estética Ana Cure
description: La clínica contada con su propia papelería, algodón troquelado sobre cartulina carbón, oro estampado y tinta de sello
colors:
  carbon: "#5E5C5C"
  carbon-hondo: "#4B4949"
  noche: "#211F1F"
  algodon: "#F6F5F1"
  algodon-2: "#ECEAE5"
  sobre: "#D9D5CE"
  solapa: "#CDC8C0"
  linea: "#DCD9D3"
  tinta: "#232121"
  perla: "#ECE9E5"
  blanco: "#FFFFFF"
  oro-claro: "#F3C989"
  oro: "#D8A863"
  oro-oscuro: "#B68039"
  oro-profundo: "#A96922"
  oro-texto: "#8A5519"
  tinta-estampado: "#2B2118"
  alerta: "#A12C1F"
typography:
  portada:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.85rem, 1.55rem + 5.3vw, 5.75rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  titulo:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.15rem, 1.45rem + 2.9vw, 3.85rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  subtitulo:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.1rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.022em"
  ficha:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.1rem + 0.35vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.014em"
  entrada:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.08rem, 1rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.008em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.006em"
  fecha:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 1.5rem + 1.4vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  rotulo:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.15em"
  boton:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.13em"
rounded:
  troquel: "0.875rem"
  canto: "2px"
  sello: "3px"
spacing:
  margen-celular: "1rem"
  margen-tableta: "1.5rem"
  margen-pc: "2rem"
  seccion: "clamp(5rem, 9vw, 8.5rem)"
  sitio: "78rem"
  texto: "44rem"
components:
  button-primary:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.tinta-estampado}"
    typography: "{typography.boton}"
    rounded: "{rounded.canto}"
    padding: "0 1.6rem"
    height: "3.25rem"
  button-primary-small:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.tinta-estampado}"
    rounded: "{rounded.canto}"
    padding: "0 1.1rem"
    height: "2.75rem"
  button-linea-carbon:
    textColor: "{colors.blanco}"
    typography: "{typography.boton}"
    rounded: "{rounded.canto}"
    padding: "0 1.6rem"
    height: "3.25rem"
  button-linea-papel:
    textColor: "{colors.tinta}"
    typography: "{typography.boton}"
    rounded: "{rounded.canto}"
    padding: "0 1.6rem"
    height: "3.25rem"
  enlace:
    textColor: "{colors.oro-texto}"
    typography: "{typography.boton}"
    height: "2.75rem"
  tarjeta-papel:
    backgroundColor: "{colors.algodon}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.troquel}"
    padding: "1.5rem"
  talon:
    backgroundColor: "{colors.algodon-2}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.troquel}"
    width: "9.5rem"
  campo:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.canto}"
    padding: "0.75rem 1rem"
  casilla:
    backgroundColor: "{colors.algodon}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.canto}"
    padding: "1rem"
  casilla-marcada:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.canto}"
    padding: "1rem"
  copia:
    backgroundColor: "{colors.blanco}"
    padding: "0.3rem"
  sobre:
    backgroundColor: "{colors.sobre}"
    rounded: "{rounded.troquel}"
  cabecera:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.blanco}"
    height: "3.5rem"
---

# Design System: Clínica Estética Ana Cure

## Overview

**Creative North Star: "Papelería clínica"**

La clínica se cuenta con su propia papelería: la tarjeta de valoración, el fichero de procedimientos, la tarjeta de controles, el sobre de resultados y la tarjeta de presentación de cada médico. La página es una cartulina gris carbón, el gris del kit. Encima se apoyan piezas de algodón blanco troqueladas, con sombra de papel real. El logo, el botón principal y la tinta de sello van en el oro del kit. Todo lo que no es papelería (el video del quirófano, las fotos) entra como material de verdad: el video a sangre bajo un velo, las fotos como copias impresas montadas en la tarjeta.

La densidad es la de un formulario impreso: renglones finos, rótulos de campo en mayúscula espaciada y datos en Inter Light. Hay una pieza protagonista por pantalla y mucho papel vacío alrededor. El movimiento imita gestos de papelería: la tarjeta cae sobre la mesa, el sello se estampa, la perforadora marca cada paso, el sobre se abre, la pluma del cirujano dibuja el marcaje y el oro brilla al desplazar la página. Cada uno tiene su versión quieta.

Este mundo reemplaza por completo al anterior («A la luz», 21 oct 2026). Rechaza la página de producto de Apple (titulares gigantes centrados, mosaicos muy redondeados, botones píldora, escenas fijas) y la clínica de stock (paciente sonriente, verde azulado, carrusel de antes y después).

**Key Characteristics:**
- Cartulina carbón como suelo y piezas de algodón encima; nunca algodón como fondo de página, salvo el pie (la hoja del membrete).
- Un solo radio curvo, el del troquel (14 px). Lo demás es recto o casi recto.
- El oro estampado se reserva para el llamado principal; el oro de sello es el único oro para texto sobre algodón.
- Rótulos de campo antes de un dato, nunca encima de un titular.
- Titulares en Inter Light, alineados a la izquierda y sin punto final.
- Sombras cortas con caída, siguiendo la silueta troquelada.

## Colors

Dos cartulinas (carbón y algodón), dos tintas (tinta oscura y perla) y un oro con cinco tonos del kit, más un rojo que solo existe para los errores.

### Primary
- **Oro estampado** (oro-oscuro → oro → oro-claro → #FBE3B8 → oro-profundo, a 112°): el degradado del logo. Solo en el botón principal y en el enlace «Ir al contenido». El rótulo del botón va en **Tinta de estampado** (7,3:1 sobre el oro medio, 4,6:1 en el extremo oscuro).
- **Oro claro**: titulares y flechas en oro sobre carbón, como «en Aguachica» en la portada. Da 4,3:1 sobre carbón, así que solo vale para texto de 18 px o más (o 14 px en negrita) y para iconos. También es el color de la selección de texto y del foco sobre carbón.
- **Oro de sello**: el oro profundo con un 18 % de negro. Es el único oro para texto sobre algodón (5,7:1 sobre algodón, 5,2:1 sobre el talón): rótulos de tarjeta, nombres de los médicos, enlaces dentro del papel, el sello de fecha y el foco sobre papel.
- **Oro oscuro y oro profundo**: el marcaje de las láminas (punteado y flechas en oro oscuro, la incisión en oro profundo, más gruesa) y el ojalillo de la perforación. El oro profundo también es el color del cursor en los campos.

### Neutral
- **Cartulina carbón**: el suelo de todas las páginas y el fondo sólido de la cabecera y del menú del celular. Blanco encima da 6,6:1.
- **Cartulina honda**: lo que se ve por el agujero de la perforación, el cierre del sobre, el fondo de una foto aún sin cargar sobre carbón y el carril de la barra de desplazamiento.
- **Noche**: la base del video de la portada y del velo que lo oscurece (hasta 96 % de opacidad abajo en el celular, 90 % a la izquierda en el PC).
- **Algodón**: toda pieza de papel (tarjetas, fichas, formulario, pie). Lleva una fibra de ruido al 55 % que apenas se ve.
- **Algodón 2**: el talón, la cara de atrás de una ficha y el fondo de una foto mientras carga dentro del papel.
- **Sobre y solapa**: el reverso del sobre de resultados. Sus solapas laterales y el bolsillo usan pasos intermedios del mismo papel (#D2CDC5 a #DEDAD3), que viven en el componente y no son tokens.
- **Renglón**: las líneas de un dato a otro dentro del algodón y los bordes de las casillas.
- **Tinta**: el texto sobre algodón (14,7:1).
- **Perla**: el texto secundario sobre carbón (5,5:1): bajadas, pies de foto, rótulos sobre carbón.
- **Blanco**: los titulares y el texto sobre carbón, el borde de la copia impresa, el fondo de los campos y de la casilla marcada.
- **Carbón como tinta**: dentro del algodón, el gris carbón es la tinta secundaria (6,1:1 sobre algodón, 5,5:1 sobre el talón) para rótulos de campo, descripciones y el grafito de las láminas.

### Tertiary
- **Alerta**: fuera de la papelería. Solo para los mensajes de error del formulario (6,7:1 sobre algodón).

### Named Rules
**The Two-Stock Rule.** El texto sobre carbón es blanco, perla u oro claro; el texto sobre algodón es tinta, carbón u oro de sello. Ningún color de una cartulina se usa como texto en la otra.

**The One Gold Voice Rule.** El oro estampado solo cubre el llamado principal. Un llamado secundario sobre papel es un enlace en oro de sello; nunca un segundo botón estampado al lado del primero.

## Typography

**Display Font:** Inter del kit, variable en peso y en tamaño óptico (con system-ui, -apple-system, Segoe UI, Roboto)
**Body Font:** Inter del kit
**Label/Mono Font:** Inter SemiBold en mayúscula espaciada para rótulos; cifras tabulares para fechas, teléfonos y números de paso

**Character:** una sola familia, como en una imprenta con un tipo. Los titulares en Inter Light, grandes y apretados, contrastan con los rótulos pequeños en SemiBold espaciado, igual que en una tarjeta impresa. La fuente se sirve recortada a los caracteres del español y se precarga.

### Hierarchy
- **Portada** (300, clamp de 2,85 a 5,75 rem, 0,98): el titular del inicio, el de cada procedimiento y el cierre «Hablemos de tu caso».
- **Título** (300, clamp de 2,15 a 3,85 rem, 1,04): los títulos de sección y los de las páginas interiores.
- **Subtítulo** (300, clamp de 1,5 a 2,1 rem, 1,1): los pasos de la tarjeta de controles, la ficha en blanco, los grupos del formulario, el menú del celular y los números de paso.
- **Ficha** (400, clamp de 1,2 a 1,4 rem, 1,25): el nombre de un procedimiento o de un médico dentro de su tarjeta.
- **Entrada** (400, clamp de 1,08 a 1,25 rem, 1,5): la bajada bajo un titular y el texto de cada paso. Unos 27 a 32 rem de ancho.
- **Cuerpo** (400, 1,0625 rem, 1,55): el texto corriente. Los textos largos van a unos 38 rem.
- **Fecha** (600, clamp de 1,9 a 2,6 rem, 1, cifras tabulares): el día de la próxima jornada dentro del sello del talón, a escala de cartel.
- **Rótulo** (600, 0,75 rem, 0,15 em, mayúscula): el nombre de un campo antes de su dato, el título impreso de una tarjeta, la pestaña del fichero, la navegación, los pies de foto y las columnas del pie.
- **Botón** (600, 0,8125 rem, 0,13 em, mayúscula): el rótulo de botones y enlaces; 0,75 rem en el botón chico.

### Named Rules
**The Field Label Rule.** El rótulo es un campo impreso: va antes de un dato o como título propio de una pieza (la pestaña, «Tarjeta de controles»). Nunca encima de un titular como antetítulo.

**The Light Headline Rule.** Todo titular va en Inter Light (300), alineado a la izquierda, con `text-wrap: balance` y sin punto final. Si necesita más fuerza, crece; no se pone en negrita ni se centra.

## Layout

El sitio vive en un contenedor de 78 rem con márgenes de 16 px en el celular, 24 px desde 40 rem y 32 px desde 64 rem; los textos largos usan 44 rem. Entre secciones hay un respiro de clamp(5 rem, 9vw, 8,5 rem), y las secciones de cierre se separan con un filete blanco al 15 % antes de ese mismo respiro.

En el PC la rejilla es de 12 columnas, como un formulario impreso: el fichero reparte 6 + 6 y luego 9 + 3 (la ficha en blanco), el equipo 4 + 8, el cierre 5 + 7. Dentro de la tarjeta de controles cada paso usa tres columnas (5,5 rem para la perforación y el número, el texto, y hasta 24 rem para las fotos).

Comportamiento responsivo, observado en el código:
- **Portada:** ocupa el alto de la pantalla menos la franja de las pestañas (100svh − 4,5 rem en el celular, − 3,25 rem desde 64 rem). El titular va abajo a la izquierda. En el PC la tarjeta de valoración se apoya abajo a la derecha; en el celular asoma 2,5 rem bajo el video, inclinada −2°. Desde 48 rem el video es el corte horizontal; por debajo, el vertical.
- **Fichero:** en el celular las fichas se montan una sobre otra (−1,25 rem) y las pestañas se escalonan (0, 34 % y 64 %) para que se vean las tres; desde 48 rem se separan. Las casillas van de dos en dos y una casilla sola ocupa la fila entera, en horizontal.
- **Talón:** en la tarjeta de valoración siempre está a la derecha (7,5 rem, 8,75 rem desde 40 rem). En el formulario y en la ficha de procedimiento el talón solo se perfora desde 64 rem (23 y 24 rem de ancho); por debajo se apila abajo, separado con un filete punteado.
- **Sobres:** dos columnas en el celular y tres desde 64 rem; al abrirse, en el celular un sobre toma las dos columnas para que la foto se lea.
- **Cabecera:** 56 px de alto (64 px desde 64 rem). La navegación aparece desde 64 rem; por debajo, un menú a pantalla completa.

Todo objetivo táctil mide al menos 44 px (botón chico, enlaces, enlaces del pie, el botón de pausa del video).

## Elevation & Depth

La profundidad es la de papel apoyado en una mesa: sombras cortas, con caída hacia abajo y sin brillo. Se aplican como `drop-shadow` sobre el envoltorio de la pieza, así siguen la silueta troquelada, muescas del talón incluidas. No hay sombras de color, ni resplandores, ni sombras desplazadas sin desenfoque. El carbón es plano; el algodón lleva una fibra de ruido casi invisible.

### Shadow Vocabulary
- **Papel apoyado** (`filter: drop-shadow(0 1px 1px rgb(20 18 18 / 0.28)) drop-shadow(0 12px 18px rgb(20 18 18 / 0.32))`): toda tarjeta, ficha y sobre.
- **Papel alzado** (`filter: drop-shadow(0 1px 1px rgb(20 18 18 / 0.3)) drop-shadow(0 26px 34px rgb(20 18 18 / 0.42))`): solo la tarjeta de valoración de la portada, que acaba de caer sobre la mesa.
- **Copia pegada** (`box-shadow: 0 1px 1px rgb(20 18 18 / 0.22), 0 8px 16px -8px rgb(20 18 18 / 0.4)`): la foto impresa montada en una tarjeta o en el carbón.
- **Estampado** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.35) inset, 0 1px 2px rgb(20 18 18 / 0.25)`): el relieve del botón; al presionar baja 1 px y pierde la sombra exterior.
- **Solapa y bolsillo** (`drop-shadow(0 2px 2.5px rgb(35 33 33 / 0.22))` y `drop-shadow(0 -1px 1.5px rgb(35 33 33 / 0.16))`): los dobleces del sobre.
- **Agujero** (`box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.45)`): el fondo hundido de la perforación.

### Named Rules
**The Paper Shadow Rule.** Una sombra es papel sobre papel: corta, hacia abajo y en el gris de la tinta. Si una pieza no es papel, no tiene sombra.

## Shapes

**The Die-Cut Rule.** El sitio tiene una sola curva: el radio del troquel (14 px) en tarjetas, fichas, sobres, el talón y la pestaña del fichero (solo arriba). Fotos y copias son rectas. Botones, campos, casillas y el botón de pausa tienen un canto de 2 px, que se lee recto; el sello, 3 px. Los únicos círculos son funcionales: la perforación, el cierre del sobre, el botón para cerrar un sobre abierto y el punto de la opción del formulario.

Otras formas recurrentes:
- **Talón perforado:** dos muescas reales de 0,6 rem recortadas con máscara en el punto de corte, arriba y abajo, y una línea de corte punteada (1 px de trazo cada 9 px, tinta al 28 %) en el borde izquierdo del talón.
- **Pestaña del fichero:** sobresale de la ficha (−1 px), con el troquel solo en las esquinas de arriba; la ficha pierde su esquina superior izquierda donde nace la pestaña.
- **Marcas de registro:** escuadras de 0,75 rem y 1 px en las cuatro esquinas de cada lámina, en carbón al 50 %, como en un pliego impreso.
- **Renglones:** líneas cada 2 rem en tinta al 11 % para la ficha en blanco.
- **Sobre:** el reverso dibujado con recortes (dos laterales, el bolsillo en triángulo y la solapa superior hasta el 56 % del alto).

## Components

### Buttons
Estampados, rectos y en mayúscula espaciada, como un rótulo en relieve.
- **Shape:** casi recto (2px).
- **Primary (estampado):** el degradado del oro del logo, rótulo en tinta de estampado; 52 px de alto y 1,6 rem a los lados. Es el llamado a la valoración en todo el sitio.
- **Hover / Focus:** con ratón el degradado se corre (posición de 18 % a 70 %) y el brillo cruza el botón. Al presionar baja 1 px. El foco es un contorno de 2 px a 3 px de distancia, en oro claro sobre carbón y oro de sello sobre papel.
- **Chico:** 44 px de alto, 1,1 rem a los lados y rótulo de 0,75 rem, para la cabecera y «Abrir todos».
- **Línea:** sin relleno, filete de 1 px del color del texto (blanco sobre carbón, tinta sobre papel); con ratón se rellena con blanco al 8 % o tinta al 5 %.

### Enlace
El llamado secundario: el mismo rótulo del botón, subrayado fino al 45 % del color a 0,45 em, con una flecha larga en SVG. Con ratón el subrayado se completa y la flecha avanza 3 px. Sobre papel va en oro de sello; sobre carbón, en blanco.

### Cards / Containers
- **Corner Style:** el troquel (14px).
- **Background:** algodón con fibra; la parte de atrás o el talón en algodón 2.
- **Shadow Strategy:** papel apoyado; papel alzado solo en la tarjeta de la portada (ver Elevation & Depth).
- **Border:** ninguno por fuera. Por dentro, renglones de 1 px en el color renglón entre datos y entre pasos.
- **Internal Padding:** 20 px en el celular, 24 a 28 px en tarjetas chicas, 32 a 48 px en el formulario y la ficha de procedimiento.

### Inputs / Fields
- **Style:** fondo blanco, filete de 1 px en renglón, canto de 2 px, 12 × 16 px de relleno y texto en tinta de 1,0625 rem. El rótulo del campo va arriba, en carbón.
- **Focus:** el filete pasa a tinta y aparece un contorno de 2 px en oro de sello. El cursor es oro profundo.
- **Casillas impresas:** cada opción es una casilla de algodón con filete renglón. Marcada, el fondo pasa a blanco y el filete a tinta; el punto se rellena de tinta con un anillo blanco y la marca de verificación queda en algodón sobre tinta.
- **Error:** el mensaje va bajo el grupo, en alerta y peso 500, con `role="alert"`.

### Navigation
- **Cabecera (membrete):** barra fija de 56/64 px. Sobre el video de la portada es transparente; al bajar 24 px, y en todas las demás páginas, se vuelve cartulina carbón con un filete blanco al 12 %. Enlaces en rótulo blanco al 80 %, blanco al pasar el ratón.
- **Un solo llamado a la vista:** la cabecera guarda su botón mientras se ve cualquier llamado de la página marcado con `data-cta-portada` (el de la portada, el del cierre, el de la ficha de procedimiento, el del 404), mientras el menú está abierto y en la página de valoración. Si la página no tiene llamado, el de la cabecera se muestra.
- **Menú del celular:** una hoja de carbón a pantalla completa bajo la barra, con los enlaces en subtítulo Light separados por filetes blancos al 15 %, el botón estampado y el de WhatsApp en línea, e Instagram al pie. Bloquea el fondo, se cierra con Escape y devuelve el foco al botón.

### Tarjeta de valoración
La pieza de la portada: algodón con talón perforado a la derecha. Lleva el título impreso «Tarjeta de valoración» en oro de sello, los campos modalidad y respuesta, y en el talón la próxima jornada en un sello de tinta: doble filete en oro de sello, tinta irregular con máscara de ruido e inclinación de −7°. Sin fecha, el talón lleva el isotipo del kit.

### Fichero y láminas de marcaje
Cada zona del cuerpo es una ficha con su pestaña. Cada procedimiento es una casilla con su lámina: la figura en grafito (carbón, 1,25 px, y trazos finos al 80 % y tenues al 45 %) y encima el marcaje en oro (zona en punteado 4/3,4 de 1,7 px, flechas de 1,5 px e incisión en oro profundo de 2,4 px). Los trazos no escalan, así que se ven igual de finos en la tarjeta del celular y en la ficha grande. La lámina va dentro de sus marcas de registro. Con ratón la casilla se aclara con blanco al 55 % y la flecha avanza.

### Tarjeta de controles
Una tarjeta de algodón con un paso por fila. Cada paso tiene su guía de perforación (un círculo punteado de 1,35 rem) y, al alcanzarlo con el scroll (62 % de la pantalla), el agujero: se ve la cartulina honda con su ojalillo de oro. Las fotos de cada paso son copias impresas.

### Copia impresa
Una foto con su borde blanco de 0,3 rem y la sombra de copia pegada. El pie va debajo en rótulo, carbón sobre papel o perla sobre carbón.

### Sobre de resultados
El sobre entero es el botón. Cerrado se ve el reverso (laterales, bolsillo, solapa y su cierre) con el sello «Contenido sensible», y la foto todavía no se pide. Al abrirlo la solapa se levanta, el frente baja y aparece la foto sobre algodón 2. El sello del sobre usa una tinta más honda que el oro de sello (#6B4113, 6:1 sobre el papel del sobre).

### Motion
Dos curvas: **papel** (`cubic-bezier(0.22, 1, 0.36, 1)`) para casi todo y **sello** (`cubic-bezier(0.16, 1, 0.3, 1)`) para impactos.
- **Portada al cargar:** el video entra de 1,05 a 1 en 1,8 s; el texto sube 14 px escalonado (0,1/0,3/0,45 s); la tarjeta cae desde −2,5 rem girada −7° (1,1 s, a 0,45 s); el sello se estampa desde 1,8× (0,45 s, a 1,35 s). Al desplazar, el video se acerca (1,08) y baja, el texto sube 60 px y, desde 64 rem, la tarjeta se endereza de −3° a 0 y sube 90 px.
- **Oro que brilla:** el degradado del estampado se corre con el scroll de la página donde el navegador lo soporta; si no, queda quieto.
- **Foto que se descubre:** un recorte de arriba a abajo ligado a la entrada de la foto en pantalla; sin soporte la foto ya está a la vista.
- **Lámina que se dibuja:** al entrar el 35 % de la lámina, cada trazo de oro se dibuja en 1,15 s, uno tras otro cada 0,2 s.
- **Perforación:** el agujero crece de 0,2 a 1 en 0,45 s (curva sello).
- **Sobre:** la solapa se pliega en 0,5 s y el frente baja en 0,6 s; la foto aparece en 0,5 s a 0,35 s. Con ratón la solapa se entreabre (0,93).
- **Menú:** la hoja aparece en 0,3 s y cada enlace sube 10 px escalonado cada 0,04 s.

**The Still Paper Rule.** Con `prefers-reduced-motion: reduce` el papel ya está quieto en su sitio: no se pide el video (queda el póster, también con ahorro de datos), no hay entradas de portada ni parallax, el oro no brilla, las fotos están a la vista, las láminas vienen dibujadas desde el servidor, todos los pasos ya están perforados, sobres y menú cambian al instante y el desplazamiento no es suave.

## Do's and Don'ts

### Do:
- **Do** apoyar cada pieza de algodón sobre la cartulina carbón con la sombra de papel apoyado, aplicada como filtro al envoltorio para que siga el troquel.
- **Do** usar el radio del troquel (14px) para toda tarjeta, ficha y sobre, y el canto de 2px para botones, campos y casillas.
- **Do** poner un solo botón estampado en oro a la vista y marcar con `data-cta-portada` cada llamado de la página para que la cabecera guarde el suyo.
- **Do** escribir el texto sobre algodón en tinta, carbón u oro de sello, y sobre carbón en blanco, perla u oro claro de 18 px o más.
- **Do** montar las fotos como copias impresas (borde blanco de 0,3 rem) y los esquemas como láminas con marcas de registro.
- **Do** usar el talón perforado (muescas y línea de corte) para el resumen o el dato aparte de una tarjeta.
- **Do** darle a cada gesto de papel su versión quieta con `prefers-reduced-motion`.

### Don't:
- **Don't** poner un rótulo en mayúscula espaciada encima de un titular como antetítulo.
- **Don't** centrar titulares, ponerlos en negrita ni cerrarlos con punto.
- **Don't** usar otra curva que la del troquel: nada de botones píldora ni tarjetas de 28 a 36 px.
- **Don't** usar el oro claro, el oro medio ni el oro oscuro como texto sobre algodón; ahí solo va el oro de sello.
- **Don't** poner un segundo botón estampado junto al principal; el llamado secundario es un enlace o un botón en línea.
- **Don't** usar sombras de color, resplandores ni sombras duras desplazadas.
- **Don't** mostrar una foto de resultados sin que la persona abra su sobre.
