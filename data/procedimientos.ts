/**
 * Catálogo de la clínica: solo los procedimientos que se comunicaron en 2025 y 2026
 * (decisión del 1 de octubre de 2026). Para añadir uno, agrégalo aquí y aparece en el
 * inicio, en el formulario de valoración, en el menú y en el mapa del sitio.
 */

export type ZonaSlug = "cuerpo" | "busto" | "rostro";

export interface Zona {
  slug: ZonaSlug;
  nombre: string;
}

export const ZONAS: Zona[] = [
  { slug: "cuerpo", nombre: "Cuerpo" },
  { slug: "busto", nombre: "Busto" },
  { slug: "rostro", nombre: "Rostro" },
];

export interface Procedimiento {
  slug: string;
  nombre: string;
  zona: ZonaSlug;
  /** Una línea: qué logra. */
  corto: string;
  /** Para buscadores y redes. */
  resumen: string;
  /** En qué consiste, en párrafos cortos. */
  queEs: string[];
  paraQuien: string[];
  /** Lo propio de su recuperación; el resto se define en la valoración. */
  recuperacion: string;
  /** Quirúrgico (se programa en una jornada) o ambulatorio sin cirugía. */
  tipo: "quirurgico" | "sin-cirugia";
  /** Profesionales que aparecen asociados en las publicaciones de la clínica. */
  equipo: string[];
  imagen: { src: string; alt: string };
}

const QUIROFANO = { src: "/media/clinica/quirofano.jpg", alt: "Quirófano de la Clínica Estética Ana Cure en Aguachica" };
const CIRUGIA = { src: "/media/clinica/cirugia.jpg", alt: "Cirujanos de la clínica operando bajo las lámparas del quirófano" };

export const PROCEDIMIENTOS: Procedimiento[] = [
  {
    slug: "liposuccion",
    nombre: "Liposucción y lipoescultura",
    zona: "cuerpo",
    corto: "Retira la grasa localizada y define tu silueta.",
    resumen:
      "Liposucción y lipoescultura en Aguachica con cirujano plástico: retira grasa localizada y define la silueta. Valoración gratuita para la próxima jornada.",
    queEs: [
      "A través de incisiones pequeñas se aspira la grasa localizada en zonas como abdomen, cintura, espalda, brazos o muslos.",
      "En la lipoescultura esa remodelación se planea pensando en el contorno completo del cuerpo. Según tu caso, puede hacerse con asistencia láser.",
    ],
    paraQuien: [
      "Grasa localizada que no cede con dieta ni ejercicio",
      "Peso estable y buena salud general",
      "Buscas definir el contorno, no bajar de peso",
    ],
    recuperacion: "Usarás prenda de compresión y seguirás con drenaje linfático en el spa, en el mismo edificio.",
    tipo: "quirurgico",
    equipo: ["alan-rodriguez", "diana-garcia"],
    imagen: CIRUGIA,
  },
  {
    slug: "transferencia-glutea",
    nombre: "Transferencia glútea",
    zona: "cuerpo",
    corto: "Tu propia grasa da volumen y forma a los glúteos.",
    resumen:
      "Transferencia glútea con grasa propia en Aguachica: más volumen y proyección sin implantes. Valoración gratuita, presencial o virtual.",
    queEs: [
      "Se toma grasa de otras zonas con una liposucción, se procesa y se injerta en los glúteos para darles volumen y proyección.",
      "Por eso casi siempre se hace junto con una liposucción: moldea la cintura y realza los glúteos en la misma cirugía.",
    ],
    paraQuien: [
      "Quieres más volumen o una mejor forma en los glúteos",
      "Tienes grasa disponible en otras zonas",
      "Prefieres no usar implantes",
    ],
    recuperacion: "Las primeras semanas cuidarás la posición al sentarte y seguirás con drenaje linfático y Ultra Z en el spa.",
    tipo: "quirurgico",
    equipo: ["alan-rodriguez", "diana-garcia"],
    imagen: QUIROFANO,
  },
  {
    slug: "aumento-mamario",
    nombre: "Aumento mamario",
    zona: "busto",
    corto: "Implantes para ganar volumen y proporción.",
    resumen:
      "Aumento mamario con implantes en Aguachica: más volumen, forma y simetría. Tamaño y perfil elegidos contigo en una valoración gratuita.",
    queEs: [
      "Se colocan implantes mamarios para aumentar el volumen y mejorar la forma y la simetría del busto.",
      "El tamaño, el perfil del implante y la vía de colocación se eligen contigo en la valoración, a partir de tus medidas y de lo que buscas.",
    ],
    paraQuien: [
      "Busto pequeño o asimétrico",
      "Pérdida de volumen después del embarazo o la lactancia",
      "Mayor de edad y con buena salud general",
    ],
    recuperacion: "Usarás un brasier postquirúrgico y evitarás esfuerzos con los brazos las primeras semanas.",
    tipo: "quirurgico",
    equipo: ["alan-rodriguez"],
    imagen: QUIROFANO,
  },
  {
    slug: "pexia-mamaria",
    nombre: "Pexia mamaria sin implantes",
    zona: "busto",
    corto: "Eleva y da firmeza con tu propio tejido.",
    resumen:
      "Pexia mamaria (levantamiento de senos) sin implantes en Aguachica: devuelve firmeza y forma con tu propio tejido. Valoración gratuita.",
    queEs: [
      "También se llama levantamiento de senos o mastopexia. Se reposicionan el tejido mamario y la areola, y se retira el exceso de piel.",
      "El resultado es un busto más firme y con una forma más armónica, sin agregar implantes.",
    ],
    paraQuien: [
      "Senos caídos tras embarazo, lactancia o cambios de peso",
      "Te gusta tu volumen y quieres recuperar la forma",
      "Prefieres no usar implantes",
    ],
    recuperacion: "Usarás un brasier postquirúrgico y cuidarás las cicatrices según las indicaciones de tu cirujano.",
    tipo: "quirurgico",
    equipo: ["alan-rodriguez"],
    imagen: CIRUGIA,
  },
  {
    slug: "alectomia",
    nombre: "Alectomía",
    zona: "rostro",
    corto: "Afina las alas de la nariz.",
    resumen:
      "Alectomía en Aguachica con el Dr. Alan Rodríguez: reduce el ancho de las alas nasales sin alterar la función de la nariz. Valoración gratuita.",
    queEs: [
      "Reduce el ancho de las alas nasales con una resección pequeña en su base.",
      "Es un procedimiento quirúrgico mínimamente invasivo que afina y armoniza la nariz sin alterar su función. La cicatriz queda en el pliegue natural de la nariz.",
    ],
    paraQuien: [
      "Alas nasales anchas",
      "Quieres afinar la base de la nariz sin una rinoplastia completa",
    ],
    recuperacion: "Es ambulatoria: vuelves a casa el mismo día y retiras los puntos en el control.",
    tipo: "quirurgico",
    equipo: ["alan-rodriguez"],
    imagen: QUIROFANO,
  },
  {
    slug: "blefaroplastia",
    nombre: "Blefaroplastia superior",
    zona: "rostro",
    corto: "Retira el exceso de piel del párpado y abre la mirada.",
    resumen:
      "Blefaroplastia superior en Aguachica y El Banco con cirujano plástico: retira el exceso de piel del párpado para una mirada más descansada.",
    queEs: [
      "Se retira el exceso de piel del párpado superior y, cuando hace falta, una pequeña bolsa de grasa.",
      "La cicatriz queda escondida en el pliegue natural del párpado y la mirada se ve más abierta y descansada.",
    ],
    paraQuien: [
      "Párpado superior caído o con exceso de piel",
      "Mirada que se ve cansada aunque hayas descansado",
      "Buena salud de los ojos",
    ],
    recuperacion: "Es ambulatoria. Los primeros días usarás compresas frías y gafas de sol al salir.",
    tipo: "quirurgico",
    equipo: ["alan-rodriguez"],
    imagen: QUIROFANO,
  },
  {
    slug: "armonizacion-de-orejas",
    nombre: "Armonización de orejas",
    zona: "rostro",
    corto: "Acerca las orejas a la cabeza, sin cirugía.",
    resumen:
      "Armonización de orejas sin cirugía en Ana Cure con el Dr. Javier de la Rosa: reduce la separación entre las orejas y la cabeza en una sesión.",
    queEs: [
      "Disminuye la distancia entre las orejas y la cabeza para que no se vean separadas.",
      "Es un procedimiento ambulatorio, sin cirugía y sin cicatrices, que se hace en una sola sesión.",
    ],
    paraQuien: [
      "Orejas separadas o prominentes",
      "Buscas un cambio sin pasar por el quirófano",
    ],
    recuperacion: "Vuelves a tu rutina el mismo día, con los cuidados que te indique el médico.",
    tipo: "sin-cirugia",
    equipo: ["javier-de-la-rosa"],
    imagen: { src: "/media/clinica/recepcion.jpg", alt: "Recepción de la Clínica Estética Ana Cure en Aguachica" },
  },
];

export function procedimientoPorSlug(slug: string): Procedimiento | undefined {
  return PROCEDIMIENTOS.find((p) => p.slug === slug);
}

export function procedimientosDe(zona: ZonaSlug): Procedimiento[] {
  return PROCEDIMIENTOS.filter((p) => p.zona === zona);
}

/** Lo que sigue en el spa después de la cirugía. No son páginas de la clínica: viven en el sitio del spa. */
export const RECUPERACION = [
  { nombre: "Acompañamiento postoperatorio", texto: "Controles y cuidados después de tu cirugía, con el mismo equipo." },
  { nombre: "Drenaje linfático", texto: "Ayuda a bajar la inflamación en las semanas siguientes." },
  { nombre: "Ultra Z", texto: "Tecnología que apoya la retracción de la piel tras la liposucción." },
  { nombre: "Cámara hiperbárica", texto: "Oxígeno a presión, pensada para acompañar tu recuperación." },
] as const;
