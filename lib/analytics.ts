/**
 * Capa de analítica agnóstica (la misma del sitio del spa).
 *
 * Los componentes llaman a `track(evento, props)` y ninguno conoce al proveedor.
 * - En desarrollo: escribe el evento en la consola.
 * - En producción: si el script de Plausible está cargado (window.plausible), lo envía; si no, no hace nada.
 */

export type EventoAnalitica =
  | "cta_valoracion"
  | "cta_whatsapp"
  | "valoracion_enviada"
  | "resultado_encendido"
  | "vista_procedimiento"
  | "video_pausado";

export type PropsEvento = Record<string, string | number | boolean | undefined>;

type PropsLimpias = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (evento: string, opciones?: { props?: PropsLimpias }) => void;
  }
}

function limpiar(props: PropsEvento): PropsLimpias {
  const salida: PropsLimpias = {};
  for (const [clave, valor] of Object.entries(props)) {
    if (valor !== undefined) salida[clave] = valor;
  }
  return salida;
}

export function track(evento: EventoAnalitica, props: PropsEvento = {}): void {
  if (typeof window === "undefined") return;
  const limpias = limpiar(props);

  if (process.env.NODE_ENV !== "production") {
    console.log("[analítica]", evento, limpias);
    return;
  }

  window.plausible?.(evento, { props: limpias });
}
