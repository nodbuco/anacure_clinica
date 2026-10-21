"use client";

import Image from "next/image";
import { useRef } from "react";
import { Enlace } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { SITE } from "@/data/site";
import { CON_MOVIMIENTO, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

export interface Foto {
  src: string;
  alt: string;
  pie: string;
  previa?: string;
}

export interface Paso {
  nombre: string;
  texto: string;
  fotos: Foto[];
  spa?: boolean;
}

function FotoMontada({ foto, className }: { foto: Foto; className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <div className="descubrir relative aspect-[4/3] overflow-hidden bg-algodon-2">
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes="(min-width: 64rem) 22rem, (min-width: 40rem) 45vw, 90vw"
          placeholder={foto.previa ? "blur" : "empty"}
          blurDataURL={foto.previa}
          className="object-cover"
        />
        {/* Esquineros de álbum: cuatro piezas de papel que sujetan la foto, cada una con su sombra */}
        <span aria-hidden="true" className="esquineros absolute inset-0">
          <span className="esquinero left-0 top-0" />
          <span className="esquinero right-0 top-0 rotate-90" />
          <span className="esquinero bottom-0 right-0 rotate-180" />
          <span className="esquinero bottom-0 left-0 -rotate-90" />
        </span>
      </div>
      <figcaption className="rotulo mt-2.5 text-carbon">{foto.pie}</figcaption>
    </figure>
  );
}

/**
 * La tarjeta de controles: valoración → jornada → recuperación, con las fotos de cada espacio.
 * Al bajar, la perforadora marca cada paso alcanzado (sin movimiento: todos marcados).
 */
export function Recorrido({ pasos }: { pasos: Paso[] }) {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const filas = gsap.utils.toArray<HTMLElement>("[data-paso]");
      const mm = gsap.matchMedia();
      // gsap.matchMedia solo corre la función si alguna condición se cumple: «quieto» cubre el caso sin movimiento.
      mm.add({ movimiento: CON_MOVIMIENTO, quieto: "(prefers-reduced-motion: reduce)" }, (contexto) => {
        if (!contexto.conditions?.movimiento) {
          filas.forEach((f) => f.setAttribute("data-perforado", ""));
          return;
        }
        filas.forEach((f) =>
          ScrollTrigger.create({
            trigger: f,
            start: "top 62%",
            onEnter: () => f.setAttribute("data-perforado", ""),
            onLeaveBack: () => f.removeAttribute("data-perforado"),
          }),
        );
      });
      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section ref={raiz} id="clinica" aria-labelledby="clinica-titulo" className="scroll-mt-16 bg-carbon pb-seccion">
      <Contenedor>
        <h2 id="clinica-titulo" className="max-w-[15ch] text-titulo font-light">
          De la valoración a tu recuperación
        </h2>

        <div className="sombra-papel mt-10 lg:mt-14">
          <div className="papel rounded-troquel">
            <div className="flex items-center gap-3 border-b border-linea px-5 py-4 sm:px-8 lg:px-10">
              {/* eslint-disable-next-line @next/next/no-img-element -- isotipo del kit en SVG, sin modificar */}
              <img src="/brand/isotipo-color.svg" alt="" width={213} height={213} loading="lazy" className="size-7 shrink-0" />
              <p className="rotulo text-oro-texto">Tarjeta de controles</p>
            </div>
            <ol>
              {pasos.map((p, i) => (
                <li
                  key={p.nombre}
                  data-paso
                  className={cn(
                    "grid gap-x-8 gap-y-6 px-5 py-8 sm:px-8 lg:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:px-10 lg:py-10",
                    i > 0 && "border-t border-linea",
                  )}
                >
                  <div className="flex items-center gap-4 lg:self-start lg:pt-1.5">
                    <span className="perforacion" aria-hidden="true" />
                    <span className="tabular text-subtitulo font-light text-carbon">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-subtitulo font-light">{p.nombre}</h3>
                    <p className="mt-3 max-w-[32rem] text-entrada text-carbon">{p.texto}</p>
                    {p.spa && (
                      <Enlace href={SITE.urlSpa} externo className="mt-4 text-oro-texto">
                        Conoce el spa
                      </Enlace>
                    )}
                  </div>
                  <div className={cn("grid gap-4", p.fotos.length > 1 && "grid-cols-2")}>
                    {p.fotos.map((f) => (
                      <FotoMontada key={f.src} foto={f} />
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
