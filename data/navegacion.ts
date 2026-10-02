export interface Enlace {
  href: string;
  etiqueta: string;
}

/** Menú principal: anclas del inicio (el sitio es una sola historia con páginas de detalle). */
export const NAV_PRINCIPAL: Enlace[] = [
  { href: "/#procedimientos", etiqueta: "Procedimientos" },
  { href: "/#clinica", etiqueta: "La clínica" },
  { href: "/#resultados", etiqueta: "Resultados" },
  { href: "/#equipo", etiqueta: "Equipo" },
  { href: "/#sedes", etiqueta: "Sedes" },
];

export const NAV_LEGAL: Enlace[] = [{ href: "/privacidad", etiqueta: "Privacidad y datos" }];
