"use client";

import Image from "next/image";
import { useRef } from "react";
import { Contenedor } from "@/components/ui/Contenedor";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export interface Espacio {
  id: string;
  nombre: string;
  texto: string;
  imagen: { src: string; alt: string; previa?: string };
}

/**
 * Los espacios de la clínica. En escritorio, una escena fija: al bajar se enciende un espacio
 * a la vez y su foto ocupa el panel. En el celular, un carrusel que se desliza con el dedo.
 */
export function Clinica({ espacios }: { espacios: Espacio[] }) {
  const raiz = useRef<HTMLElement>(null);
  const pista = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        const pasos = gsap.utils.toArray<HTMLElement>("[data-paso]");
        const fotos = gsap.utils.toArray<HTMLElement>("[data-escena]");
        let actual = -1;
        const activar = (i: number) => {
          if (i === actual) return;
          actual = i;
          pasos.forEach((p, j) => p.toggleAttribute("data-activa", j === i));
          fotos.forEach((f, j) => f.toggleAttribute("data-activa", j === i));
        };
        activar(0);
        ScrollTrigger.create({
          trigger: pista.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (st) => activar(Math.min(espacios.length - 1, Math.floor(st.progress * espacios.length))),
        });
        gsap.fromTo(
          "[data-progreso]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: pista.current, start: "top top", end: "bottom bottom", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: raiz },
  );

  /** Lleva el scroll al tramo de la pista que enciende ese espacio. */
  const irA = (i: number) => {
    const p = pista.current;
    if (!p) return;
    const inicio = p.getBoundingClientRect().top + window.scrollY;
    const recorrido = p.offsetHeight - window.innerHeight;
    const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: inicio + ((i + 0.5) / espacios.length) * recorrido, behavior: reducir ? "auto" : "smooth" });
  };

  return (
    <section ref={raiz} id="clinica" data-tema="oscuro" aria-labelledby="clinica-titulo" className="tema-oscuro scroll-mt-14 bg-noche text-perla">
      <Contenedor className="pt-seccion">
        <div className="max-w-3xl">
          <h2 id="clinica-titulo" className="text-titulo font-light">
            Todo pasa aquí.
          </h2>
          <p className="mt-5 max-w-xl text-entrada text-niebla">
            Recepción, quirófano y recuperación en el primer piso de nuestra sede de Aguachica.
          </p>
        </div>
      </Contenedor>

      {/* Escritorio: escena fija */}
      <div ref={pista} className="relative hidden lg:block" style={{ height: `${espacios.length * 85}svh` }}>
        <div className="sticky top-14 h-[calc(100svh-3.5rem)]">
          <Contenedor className="grid h-full grid-cols-12 items-center gap-10 py-10">
            <div className="col-span-4 flex gap-6">
              <div aria-hidden="true" className="relative w-px shrink-0 bg-humo">
                <div data-progreso className="absolute inset-0 origin-top bg-oro" />
              </div>
              <ol className="space-y-2">
                {espacios.map((e, i) => (
                  <li key={e.id} data-paso className="escena-paso text-perla/35 data-[activa]:text-perla">
                    <button type="button" onClick={() => irA(i)} className="rounded-sm py-2 text-left">
                      <span className="block text-tarjeta font-light">{e.nombre}</span>
                    </button>
                    <div className="escena-paso-texto">
                      <p className="overflow-hidden pr-4 text-[1rem] leading-relaxed text-niebla">{e.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative col-span-8 h-full max-h-[44rem] overflow-hidden rounded-panel-lg bg-grafito">
              {espacios.map((e) => (
                <div key={e.id} data-escena className="escena-foto absolute inset-0">
                  <Image
                    src={e.imagen.src}
                    alt={e.imagen.alt}
                    fill
                    sizes="(min-width: 80rem) 52rem, 64vw"
                    placeholder={e.imagen.previa ? "blur" : "empty"}
                    blurDataURL={e.imagen.previa}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Contenedor>
        </div>
      </div>

      {/* Celular y tableta: carrusel */}
      <div className="pb-seccion lg:hidden">
        <ul
          aria-label="Espacios de la clínica"
          className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:scroll-px-6 sm:px-6"
        >
          {espacios.map((e) => (
            <li key={e.id} className="w-[82%] shrink-0 snap-start sm:w-[58%]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-panel bg-grafito">
                <Image
                  src={e.imagen.src}
                  alt={e.imagen.alt}
                  fill
                  sizes="(min-width: 40rem) 58vw, 82vw"
                  placeholder={e.imagen.previa ? "blur" : "empty"}
                  blurDataURL={e.imagen.previa}
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 text-tarjeta font-light">{e.nombre}</h3>
              <p className="mt-2 pr-2 text-[0.98rem] leading-relaxed text-niebla">{e.texto}</p>
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden="true" className="hidden h-[12svh] lg:block" />
    </section>
  );
}
