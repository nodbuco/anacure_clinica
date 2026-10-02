/**
 * Próxima jornada quirúrgica. Es el único dato que cambia con frecuencia: edita la fecha
 * (formato AAAA-MM-DD) y vuelve a publicar. Con `fecha: null` el sitio dice que las fechas
 * están por anunciar e invita a apartar la valoración igual.
 */
export const PROXIMA_JORNADA: { fecha: string | null } = {
  fecha: null,
};

/** «sábado 14 de noviembre», o null si no hay fecha o ya pasó. */
export function fechaJornada(hoy: Date = new Date()): string | null {
  if (!PROXIMA_JORNADA.fecha) return null;
  const fecha = new Date(`${PROXIMA_JORNADA.fecha}T12:00:00-05:00`);
  if (fecha.getTime() < hoy.getTime() - 24 * 60 * 60 * 1000) return null;
  return new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Bogota" }).format(fecha);
}
