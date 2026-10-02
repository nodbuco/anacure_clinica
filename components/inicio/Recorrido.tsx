"use client";

import { useRef } from "react";
import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { Contenedor } from "@/components/ui/Contenedor";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";

const PASOS = [
  {
    nombre: "Valoración",
    detalle: "Gratuita · presencial o virtual",
    texto: "Te escuchamos, revisamos tu caso y te decimos con honestidad si el procedimiento es para ti.",
  },
  {
    nombre: "Jornada",
    detalle: "Con cirujano plástico",
    texto: "Operamos en fechas programadas. Te damos la tuya y te acompañamos en la preparación.",
  },
  {
    nombre: "Recuperación",
    detalle: "En el mismo edificio",
    texto: "Tu postoperatorio sigue en el spa: drenaje linfático, Ultra Z y cámara hiperbárica.",
  },
];

/** Valoración → jornada → recuperación, unidos por una línea dorada que se dibuja al bajar. */
export function Recorrido({ fecha }: { fecha: string | null }) {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const pasos = gsap.utils.toArray<HTMLElement>("[data-recorrido-paso]");
      const alcanzar = (avance: number) =>
        pasos.forEach((p, i) => p.toggleAttribute("data-alcanzado", avance >= i / pasos.length - 0.001));
      const mm = gsap.matchMedia();
      // gsap.matchMedia solo corre la función si alguna condición se cumple: «quieto» cubre el celular sin movimiento.
      mm.add({ movimiento: CON_MOVIMIENTO, quieto: "(prefers-reduced-motion: reduce)", escritorio: "(min-width: 48rem)" }, (contexto) => {
        if (!contexto.conditions?.movimiento) {
          alcanzar(1);
          return;
        }
        const horizontal = contexto.conditions.escritorio;
        gsap.fromTo(
          "[data-linea]",
          horizontal ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-recorrido]",
              start: horizontal ? "top 72%" : "top 70%",
              end: horizontal ? "bottom 55%" : "bottom 62%",
              scrub: 0.4,
              onUpdate: (st) => alcanzar(st.progress),
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section ref={raiz} data-tema="claro" aria-labelledby="recorrido-titulo" className="bg-perla py-seccion">
      <Contenedor>
        <div className="max-w-3xl">
          <h2 id="recorrido-titulo" className="text-titulo font-light text-tinta">
            Así es tu proceso.
          </h2>
          <p className="mt-5 max-w-xl text-entrada text-carbon">
            Trabajamos por jornadas: en fechas programadas, el cirujano plástico valora y opera en nuestra clínica.
          </p>
        </div>

        <div data-recorrido className="relative mt-14 lg:mt-20">
          {/* Línea: horizontal desde el primer punto en escritorio, vertical en el celular */}
          <div aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-linea md:bottom-auto md:left-2 md:right-0 md:top-[7px] md:h-px md:w-auto">
            <div data-linea className="absolute inset-0 origin-top bg-oro md:origin-left" />
          </div>
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            {PASOS.map((p) => (
              <li key={p.nombre} data-recorrido-paso className="pl-10 md:pl-0">
                <span
                  aria-hidden="true"
                  className="recorrido-punto absolute left-0 mt-1 block size-[15px] rounded-full border-2 border-linea bg-perla md:relative md:mt-0"
                />
                <h3 className="text-tarjeta font-light text-tinta md:mt-8">{p.nombre}</h3>
                <p className="mt-1 text-[0.85rem] font-medium tracking-[0.005em] text-oro-texto">{p.detalle}</p>
                <p className="mt-3 max-w-xs leading-relaxed text-carbon">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="encender tema-oscuro mt-16 flex flex-col gap-8 rounded-panel-lg bg-noche p-8 text-perla sm:p-12 md:flex-row md:items-center md:justify-between lg:mt-24">
          <div>
            <p className="text-[0.95rem] text-niebla">Próxima jornada</p>
            <p className="mt-2 text-subtitulo font-light first-letter:uppercase">{fecha ?? "Fechas por anunciar"}</p>
            <p className="mt-3 max-w-md text-niebla">
              {fecha
                ? "Aparta tu valoración con tiempo: así llegas a la jornada con todo listo."
                : "Aparta tu valoración y te contamos la fecha en cuanto esté confirmada."}
            </p>
          </div>
          <CtaValoracion ubicacion="proxima-jornada" tamano="lg" className="self-start md:self-auto" />
        </div>
      </Contenedor>
    </section>
  );
}
