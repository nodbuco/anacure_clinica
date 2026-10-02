"use client";

import { useEffect } from "react";

/**
 * Un solo oyente para todo el sitio: la luz de los paneles difusores (.difusor) sigue al puntero.
 * Solo con ratón y con movimiento permitido. Escribe la posición en el propio panel, nunca en un
 * ancestro, para no recalcular estilos de toda la página.
 */
export function LuzPuntero() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let pendiente = 0;
    let ultimo: PointerEvent | null = null;
    const pintar = () => {
      pendiente = 0;
      const e = ultimo;
      const panel = e && (e.target as Element | null)?.closest<HTMLElement>(".difusor");
      if (!e || !panel) return;
      const caja = panel.getBoundingClientRect();
      panel.style.setProperty("--luz-x", `${e.clientX - caja.left}px`);
      panel.style.setProperty("--luz-y", `${e.clientY - caja.top}px`);
    };
    const mover = (e: PointerEvent) => {
      ultimo = e;
      if (!pendiente) pendiente = requestAnimationFrame(pintar);
    };
    document.addEventListener("pointermove", mover, { passive: true });
    return () => {
      document.removeEventListener("pointermove", mover);
      cancelAnimationFrame(pendiente);
    };
  }, []);
  return null;
}
