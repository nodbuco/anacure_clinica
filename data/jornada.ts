/**
 * Próxima jornada quirúrgica. Es el único dato que cambia con frecuencia: edita la fecha
 * (formato AAAA-MM-DD) y vuelve a publicar. Con `fecha: null` el sitio dice que la fecha
 * está por anunciar e invita a apartar la valoración igual.
 */
export const PROXIMA_JORNADA: { fecha: string | null } = {
  fecha: null,
};

const ZONA = "America/Bogota";

function fechaVigente(hoy: Date): Date | null {
  if (!PROXIMA_JORNADA.fecha) return null;
  const fecha = new Date(`${PROXIMA_JORNADA.fecha}T12:00:00-05:00`);
  if (fecha.getTime() < hoy.getTime() - 24 * 60 * 60 * 1000) return null;
  return fecha;
}

/** «sábado 14 de noviembre», o null si no hay fecha o ya pasó. */
export function fechaJornada(hoy: Date = new Date()): string | null {
  const fecha = fechaVigente(hoy);
  if (!fecha) return null;
  return new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long", timeZone: ZONA }).format(fecha);
}

/** La fecha por partes para el sello del talón («sáb», «14», «nov»), o null. */
export function selloJornada(hoy: Date = new Date()): { semana: string; dia: string; mes: string } | null {
  const fecha = fechaVigente(hoy);
  if (!fecha) return null;
  const parte = (opciones: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("es-CO", { ...opciones, timeZone: ZONA }).format(fecha).replace(".", "");
  return { semana: parte({ weekday: "short" }), dia: parte({ day: "numeric" }), mes: parte({ month: "short" }) };
}
