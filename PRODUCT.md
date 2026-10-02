# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

La misma base del sitio hermano del spa (`../ana-cure-spa-web`), por indicación del usuario («toma lo útil del repositorio de la estética»): Next.js 16 (App Router) + Tailwind CSS 4 + GSAP 3 con ScrollTrigger, TypeScript, salida `standalone` con Dockerfile para Coolify en el VPS de Nodbu. Repositorio: `https://github.com/nodbuco/anacure_clinica`. Dominio aún sin decidir (placeholder `https://clinica.anacure.co`, configurable con `NEXT_PUBLIC_SITE_URL`).

## Users

- **Paciente potencial** (mayoritariamente mujeres adultas de Aguachica, El Banco y municipios cercanos del Cesar y Magdalena) que está considerando una cirugía plástica o un procedimiento estético. Llega casi siempre desde Instagram o el sitio del spa, en el celular. Su trabajo: entender qué se hace aquí, convencerse de que es seguro y serio, y pedir una valoración sin compromiso.
- **Paciente del spa** que ya confía en Ana Cure y busca el paso quirúrgico.
- **Docentes afiliados a FOMAG**, por el convenio vigente.

## Product Purpose

Sitio web de **Clínica Estética Ana Cure**, la clínica de cirugía plástica y medicina estética del grupo Ana Cure. Su prioridad es convertir visitas en **solicitudes de valoración**. Hoy todo se agenda a mano por WhatsApp. Éxito: más valoraciones pedidas con la información completa (procedimiento, sede, modalidad), y una clínica que se ve tan seria y cuidada como es.

## Positioning

- Opera por **jornadas quirúrgicas**: en fechas programadas un cirujano plástico valora y opera en bloque. La cita que se vende es **la valoración (gratuita, presencial o virtual) para la próxima jornada**.
- **Opérate aquí y recupérate aquí**: el postoperatorio sigue en el spa del mismo grupo, en el mismo edificio de Aguachica, con **cámara hiperbárica** (anunciada como la primera de la región) y drenaje linfático. Ninguna clínica vecina tiene ese recorrido completo.
- Quirófano, sala de recuperación y consultorios propios en Aguachica (Cra 33 # 3-27, primer piso).

## Operating Context

- Dos sedes: **Aguachica (Cesar)**, Cra 33 # 3-27, primer piso, en la misma dirección que el spa; **El Banco (Magdalena)**, Cra 10 # 3-84. En El Banco hay casos documentados (blefaroplastia, 2025); no está confirmado si allí se opera o solo se valora.
- Horario: lunes a viernes 7:30 a. m. – 6:00 p. m.; sábados 8:00 a. m. – 3:00 p. m.; domingos y festivos cerrado.
- WhatsApp oficial de la clínica: **318 701 9075**.
- Instagram: `@clinicaanacure` (poco activo); el tráfico real llega desde `@anacure_spa`.
- Sitio hermano del spa: `https://anacure.agenda.nodbu.com` (temporal; dominio previsto `anacure.co`).

## Capabilities and Constraints

- **Solicitud de valoración: formulario → WhatsApp** (decidido el 1 oct 2026). La persona elige procedimiento, sede y modalidad (presencial o virtual) y se abre el chat del 318 701 9075 con el mensaje escrito. Sin servidor de citas ni correos por ahora.
- **Catálogo: solo procedimientos vigentes** (mencionados en 2025–2026): liposucción / lipoescultura / lipo láser, transferencia glútea, mamoplastia de aumento con implantes, pexia mamaria sin implantes, alectomía, blefaroplastia superior, armonización de orejas; y como servicios de recuperación: acompañamiento postoperatorio, Ultra Z, cámara hiperbárica y drenaje linfático (estos últimos viven en el spa).
- **Equipo visible (ampliado):** Dra. Ana Cure (gerente), Dr. Alan Rodríguez (cirujano plástico, el más presente), Dra. Diana García (equipo médico), Dr. Javier de la Rosa (medicina estética facial).
- **Antes y después: ocultos tras un toque.** Se muestran difuminados con aviso de contenido sensible; la persona decide verlos.
- **Sin precios ni financiación** en ninguna parte.
- **Fecha de la próxima jornada:** sin confirmar. Debe poder cambiarse en un solo archivo de datos; mientras no exista, el sitio invita a apartar la valoración para la próxima.
- Pendientes de Ana (no inventar): número de habilitación sanitaria, si El Banco opera o solo valora, plataforma de la valoración virtual, cupos por jornada, vigencia del convenio FOMAG para 2026.
- Regulación colombiana de publicidad en salud: sin promesas de resultado, aviso de que los resultados varían, procedimientos solo para mayores de edad.

## Brand Commitments

- Identidad de **Clínica Estética** del kit `../Kit_Identidad_Ana_Cure/02_Clinica_Estetica/`: logos SVG en degradado dorado y gris; **nunca reconstruir el logo con una fuente**.
- Paleta del kit: gris carbón `#5E5C5C`, oro claro `#F3C989`, oro medio `#D8A863`, oro oscuro `#B68039`, oro profundo `#A96922`.
- Tipografía del kit: titulares en Helvetica Neue Light o, en web, **Inter Light**; texto en Inter Light, Regular y SemiBold.
- Pedido explícito del usuario (1 oct 2026): diseño **muy limpio y premium en PC y celular**, **transiciones que jueguen con el scroll**, **contenedores con bordes curvos suaves al estilo de la página Mac Studio de Apple**, y **un video sutil de fondo en el header**.
- Voz: tuteo, cálida y segura, pocas palabras; cada dato una sola vez (preferencia de Diego en los documentos para este cliente).
- Al reutilizar textos de Instagram, cambiar `@anacureclinica` (cuenta muerta) por `@clinicaanacure`.

## Evidence on Hand

- Archivo completo de Instagram de la clínica: `../MEDIA_WEB/clinica-ana-cure/` (190 publicaciones, 251 fotos, 84 videos; empezar en `00-LO-MEJOR/`). Autorización de los pacientes para usar todo el material confirmada por Ana el 11 sep 2026.
- Video de recorrido de la clínica (2021, 1280×720) con tomas limpias del quirófano, pasillos y fachada: `00-LO-MEJOR/02-videos-horizontales/1280x720_054_9lk_2021-02-05_CK7dczWBm09.mp4`.
- Antes y después reales de liposucción, abdominoplastia, cirugía mamaria y rostro (1080–1440 px, cuadradas).
- Fotos de equipo en quirófano (2021) y de la Dra. Ana Cure con el Dr. Alan Rodríguez (2024).
- Fotos ya optimizadas del spa reutilizables: cámara hiperbárica, sedes, retrato de la Dra. Ana Cure (`../ana-cure-spa-web/public/media/`).
- **No existen:** testimonios escritos, reseñas de Google de la clínica, cifras de pacientes operados, número de habilitación, fotos profesionales recientes del quirófano. No inventarlos.

## Product Principles

1. **La seguridad se demuestra, no se promete.** Quirófano real, equipo con nombre, recuperación con cámara hiperbárica: mostrar antes de afirmar.
2. **Un solo siguiente paso.** Todo conduce a pedir la valoración para la próxima jornada.
3. **Respeto por el cuerpo de la paciente.** Los resultados se muestran con consentimiento de quien mira y sin promesas.
4. **Dos sitios, un recorrido.** La clínica opera; el spa recupera. Los enlaces cruzados son parte del producto.
5. **Pocas palabras.** Cada frase debe ganarse su lugar.

## Accessibility & Inclusion

WCAG 2.2 AA. Público mayoritariamente móvil con redes 4G variables: el video de fondo es decorativo, liviano, con póster, pausable y desactivado con `prefers-reduced-motion` o ahorro de datos. Todo el movimiento ligado al scroll debe tener versión estática.
