"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * El marcaje de cada lámina se dibuja cuando la lámina entra en pantalla, como la pluma del cirujano.
 * Sin movimiento (prefers-reduced-motion) no hace nada: las láminas ya vienen dibujadas del servidor.
 */
export function DibujarLaminas() {
  const ruta = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const laminas = [...document.querySelectorAll<SVGElement>("[data-lamina]")];
    laminas.forEach((l) => (l.dataset.dibujo = "espera"));
    const observador = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          const lamina = e.target as SVGElement;
          observador.unobserve(lamina);
          requestAnimationFrame(() => (lamina.dataset.dibujo = "visto"));
        }),
      { threshold: 0.35 },
    );
    laminas.forEach((l) => observador.observe(l));
    return () => observador.disconnect();
  }, [ruta]);

  return null;
}
