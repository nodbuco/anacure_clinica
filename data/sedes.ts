export type SedeSlug = "aguachica" | "el-banco";

export interface Sede {
  slug: SedeSlug;
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
export const SEDES: Record<SedeSlug, Sede> = {
  aguachica: {
    slug: "aguachica",
    nombre: "Aguachica",
    departamento: "Cesar",
    direccion: "Cra 33 # 3-27",
    referencia: "Primer piso, en el mismo edificio del spa",
    coordenadas: { lat: 8.311602, lng: -73.6033209 },
    imagen: { src: "/media/sedes/aguachica.jpg", alt: "Fachada de la Clínica Estética Ana Cure en Aguachica" },
  },
  "el-banco": {
    slug: "el-banco",
    nombre: "El Banco",
    departamento: "Magdalena",
    direccion: "Cra 10 # 3-84",
    referencia: "Barrio San Francisco, sede de Ana Cure Estética & Spa",
    coordenadas: { lat: 8.9983229, lng: -73.97172 },
    imagen: { src: "/media/sedes/el-banco.jpg", alt: "Equipo de Ana Cure en la entrada de la sede de El Banco" },
  },
};

export const LISTA_SEDES: Sede[] = [SEDES.aguachica, SEDES["el-banco"]];

/** Enlace a Google Maps centrado en un punto, sin buscar ningún negocio por nombre. */
export function enlaceMapa({ lat, lng }: { lat: number; lng: number }): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
}

/** Horario confirmado por Ana el 14 de septiembre de 2026: igual en las dos sedes. */
export const HORARIO = {
  lunesViernes: "7:30 a. m. – 6:00 p. m.",
  sabados: "8:00 a. m. – 3:00 p. m.",
  domingosFestivos: "Cerrado",
  estructurado: [
    { dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], abre: "07:30", cierra: "18:00" },
    { dias: ["Saturday"], abre: "08:00", cierra: "15:00" },
  ],
} as const;
