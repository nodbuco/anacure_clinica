/**
 * La clínica opera en una sola sede, Aguachica (confirmado por el dueño el 21 de octubre de 2026:
 * «la clínica de cirugías solo está en Aguachica, no en El Banco»). En El Banco solo está el spa.
 */
export interface Sede {
  nombre: string;
  departamento: string;
  direccion: string;
  /** Detalle de la dirección que ayuda a llegar */
  referencia: string;
  /**
   * Punto exacto de la sede. Los mapas se arman con coordenadas y nunca buscando por nombre:
   * Google resuelve una búsqueda por texto contra los negocios que ya tiene fichados en esa dirección.
   */
  coordenadas: { lat: number; lng: number };
  imagen: { src: string; alt: string };
}

/** Coordenadas verificadas para el sitio del spa el 20 de septiembre de 2026 (misma dirección en las dos marcas). */
export const SEDE: Sede = {
  nombre: "Aguachica",
  departamento: "Cesar",
  direccion: "Cra 33 # 3-27",
  referencia: "Primer piso, edificio de Ana Cure Estética & Spa",
  coordenadas: { lat: 8.311602, lng: -73.6033209 },
  imagen: { src: "/media/sedes/aguachica.jpg", alt: "Fachada de la Clínica Estética Ana Cure en Aguachica" },
};

/** Enlace a Google Maps centrado en un punto, sin buscar ningún negocio por nombre. */
export function enlaceMapa({ lat, lng }: { lat: number; lng: number }): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
}

/** Horario confirmado por Ana el 14 de septiembre de 2026. */
export const HORARIO = {
  lunesViernes: "7:30 a. m. – 6:00 p. m.",
  sabados: "8:00 a. m. – 3:00 p. m.",
  domingosFestivos: "Cerrado",
  estructurado: [
    { dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], abre: "07:30", cierra: "18:00" },
    { dias: ["Saturday"], abre: "08:00", cierra: "15:00" },
  ],
} as const;
