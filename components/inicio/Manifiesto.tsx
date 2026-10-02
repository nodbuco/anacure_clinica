"use client";

import { useRef } from "react";
import { Contenedor } from "@/components/ui/Contenedor";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";

const FRASE = "Antes de operar, te escuchamos. Planeamos cada procedimiento con tiempo, lo hacemos en nuestro propio quirófano y te acompañamos";
const CIERRE = "hasta que vuelvas a sentirte tú.";

/** Las palabras se encienden de una en una mientras la frase cruza la pantalla. */
export function Manifiesto() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(CON_MOVIMIENTO, () => {
        // Apagadas, las palabras conservan 3:1 de contraste (texto grande): 36 % el perla, 44 % el oro.
        gsap.fromTo(
          "[data-palabra]",
          { opacity: (_: number, el: HTMLElement) => (el.dataset.palabra === "oro" ? 0.44 : 0.36) },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: "[data-frase]", start: "top 82%", end: "bottom 42%", scrub: 0.4 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: raiz },
  );

  const palabras = (texto: string, oro?: boolean) =>
    texto.split(" ").map((p, i) => (
      <span key={`${p}-${i}`} data-palabra={oro ? "oro" : ""} className={oro ? "text-oro-claro" : undefined}>
        {p}{" "}
      </span>
    ));

  return (
    <section ref={raiz} data-tema="oscuro" aria-label="Nuestra forma de trabajar" className="tema-oscuro bg-noche py-seccion">
      <Contenedor>
        <p data-frase className="mx-auto max-w-[58rem] text-manifiesto font-light text-perla">
          {palabras(FRASE)}
          {palabras(CIERRE, true)}
        </p>
      </Contenedor>
    </section>
  );
}
