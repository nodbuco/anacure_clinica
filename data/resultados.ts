/**
 * Resultados reales, publicados en Instagram con autorización de las pacientes
 * (confirmado por Ana el 11 de septiembre de 2026). En la web se muestran apagados:
 * la persona decide encender cada placa. Cada imagen ya trae el antes y el después.
 */
export interface Resultado {
  id: string;
  /** Procedimientos en cuya página aparece este caso. */
  procedimientos: string[];
  titulo: string;
  /** Tiempo de postoperatorio u otro dato del caso. */
  detalle: string;
  profesional?: string;
  imagen: { src: string; alt: string; ancho: number; alto: number };
  /** Publicación original, para rastrear el origen y el consentimiento. */
  fuente: string;
}

export const RESULTADOS: Resultado[] = [
  {
    id: "lipo-transferencia-perfil",
    procedimientos: ["liposuccion", "transferencia-glutea"],
    titulo: "Liposucción y transferencia glútea",
    detalle: "3 meses de postoperatorio · perfil",
    imagen: {
      src: "/media/resultados/lipo-transferencia-perfil.jpg",
      alt: "Antes y después de perfil de una liposucción con transferencia glútea, a los tres meses",
      ancho: 1440,
      alto: 1307,
    },
    fuente: "https://www.instagram.com/p/DW90542Fj5H/",
  },
  {
    id: "lipo-transferencia-espalda",
    procedimientos: ["liposuccion", "transferencia-glutea"],
    titulo: "Liposucción y transferencia glútea",
    detalle: "3 meses de postoperatorio · espalda",
    imagen: {
      src: "/media/resultados/lipo-transferencia-espalda.jpg",
      alt: "Antes y después de espalda de una liposucción con transferencia glútea, a los tres meses",
      ancho: 1440,
      alto: 1306,
    },
    fuente: "https://www.instagram.com/p/DW90542Fj5H/",
  },
  {
    id: "alectomia",
    procedimientos: ["alectomia"],
    titulo: "Alectomía",
    detalle: "Antes y después",
    profesional: "alan-rodriguez",
    imagen: {
      src: "/media/resultados/alectomia.jpg",
      alt: "Antes y después de una alectomía: la base de la nariz más estrecha",
      ancho: 1440,
      alto: 1440,
    },
    fuente: "https://www.instagram.com/p/DOPCU8ZkX4O/",
  },
  {
    id: "armonizacion-orejas",
    procedimientos: ["armonizacion-de-orejas"],
    titulo: "Armonización de orejas",
    detalle: "Antes y después, sin cirugía",
    profesional: "javier-de-la-rosa",
    imagen: {
      src: "/media/resultados/armonizacion-orejas.jpg",
      alt: "Antes y después de una armonización de orejas: las orejas más cerca de la cabeza",
      ancho: 1440,
      alto: 1440,
    },
    fuente: "https://www.instagram.com/p/DTv1a8LDy2r/",
  },
  {
    id: "lipo-espalda-1-mes",
    procedimientos: ["liposuccion"],
    titulo: "Liposucción",
    detalle: "1 mes de postoperatorio",
    profesional: "diana-garcia",
    imagen: {
      src: "/media/resultados/lipo-espalda-1-mes.jpg",
      alt: "Antes y después de espalda y cintura de una liposucción, al mes",
      ancho: 796,
      alto: 591,
    },
    fuente: "https://www.instagram.com/p/Ccragk3s-x6/",
  },
];

export function resultadosDe(procedimiento: string): Resultado[] {
  return RESULTADOS.filter((r) => r.procedimientos.includes(procedimiento));
}
