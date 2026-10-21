"use client";

import Image from "next/image";
import { useState } from "react";
import { IconoCerrar } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export interface Caso {
  id: string;
  titulo: string;
  detalle: string;
  profesional?: string;
  imagen: { src: string; alt: string; ancho: number; alto: number };
}

/**
 * Resultados en sobres cerrados. El sobre entero es el botón; la foto real solo se pide al abrirlo.
 * Cerrado, el sobre no deja ver nada.
 */
export function Sobres({ casos }: { casos: Caso[] }) {
  const [abiertos, setAbiertos] = useState<Set<string>>(new Set());
  const todos = abiertos.size === casos.length;

  const alternar = (id: string) => {
    // El evento va fuera del actualizador: React puede llamarlo dos veces y lo contaría doble.
    if (!abiertos.has(id)) track("resultado_abierto", { caso: id });
    setAbiertos((previos) => {
      const nuevos = new Set(previos);
      if (nuevos.has(id)) nuevos.delete(id);
      else nuevos.add(id);
      return nuevos;
    });
  };

  return (
    <div>
      <div className="flex justify-start sm:justify-end">
        <button
          type="button"
          aria-pressed={todos}
          onClick={() => setAbiertos(todos ? new Set() : new Set(casos.map((c) => c.id)))}
          className="boton boton-linea boton-chico"
        >
          {todos ? "Cerrar todos" : "Abrir todos"}
        </button>
      </div>

      <ul aria-label="Resultados" className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3">
        {casos.map((c) => {
          const abierto = abiertos.has(c.id);
          const detalle = [c.detalle, c.profesional].filter(Boolean).join(" · ");
          // Abierto, en el celular el sobre toma las dos columnas para que la foto se lea.
          return (
            <li key={c.id} className={cn(abierto && "col-span-2 lg:col-span-1")}>
              <figure>
                <button
                  type="button"
                  aria-pressed={abierto}
                  onClick={() => alternar(c.id)}
                  data-abierto={abierto || undefined}
                  className="sombra-papel block w-full text-left"
                >
                  <span className="sr-only">
                    {abierto ? "Cerrar el sobre" : "Abrir el sobre"}: {c.titulo}
                  </span>
                  <span className={cn("relative block overflow-hidden rounded-troquel bg-algodon-2", abierto ? "aspect-[10/9]" : "aspect-[3/2]")}>
                    {abierto && (
                      <Image
                        src={c.imagen.src}
                        alt=""
                        fill
                        sizes="(min-width: 64rem) 25rem, (min-width: 40rem) 46vw, 92vw"
                        className="sobre-foto object-contain p-3"
                      />
                    )}
                    {abierto && (
                      <span className="sobre-foto absolute right-2.5 top-2.5 inline-flex size-9 items-center justify-center rounded-full bg-tinta/75 text-algodon">
                        <IconoCerrar className="size-4.5" />
                      </span>
                    )}

                    {/* El reverso del sobre: dos solapas laterales, el bolsillo de abajo y la solapa superior con su cierre */}
                    <span aria-hidden="true" className="sobre-frente absolute inset-0 block bg-sobre">
                      <span className="sobre-lateral absolute inset-0 block [clip-path:polygon(0_0,52%_54%,0_100%)]" />
                      <span className="sobre-lateral absolute inset-0 block [clip-path:polygon(100%_0,48%_54%,100%_100%)]" />
                      <span className="sobre-bolsillo absolute inset-0 block">
                        <span className="absolute inset-0 block bg-[#DEDAD3] [clip-path:polygon(0_100%,50%_44%,100%_100%)]" />
                      </span>
                      <span className="absolute inset-x-0 bottom-[12%] flex justify-center">
                        <span className="sello text-[0.56rem] [--tinta-sello:#6B4113] sm:text-[0.72rem]">Contenido sensible</span>
                      </span>
                    </span>
                    <span aria-hidden="true" className="sobre-solapa absolute inset-0 block">
                      <span className="sobre-solapa-papel absolute inset-0 block [clip-path:polygon(0_0,100%_0,50%_56%)]" />
                      <span className="sobre-cierre absolute left-1/2 top-[56%] block size-4 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-5" />
                    </span>
                  </span>
                </button>
                <figcaption className="mt-3 sm:mt-4">
                  <p className="text-[0.98rem] leading-snug text-blanco sm:text-[1.05rem]">{c.titulo}</p>
                  {detalle && <p className="mt-1 text-[0.88rem] leading-snug text-perla sm:text-[0.92rem]">{detalle}</p>}
                </figcaption>
                {abierto && <p className="sr-only">{c.imagen.alt}</p>}
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
