"use client";

import Image from "next/image";
import { useState } from "react";
import { IconoLuz } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export interface Placa {
  id: string;
  titulo: string;
  detalle: string;
  profesional?: string;
  imagen: { src: string; alt: string; ancho: number; alto: number };
  /** Vista de 16 px en base64: lo único que se carga mientras la placa está apagada. */
  previa?: string;
}

/**
 * Cuántas placas van en grande (media fila) para que la rejilla de seis columnas cierre sin huecos:
 * de a tres por fila, y las que sobran (1, 2 o 4) en grande al principio.
 */
function cuantasGrandes(total: number): number {
  if (total === 3) return 0;
  if (total <= 2 || total === 4) return total;
  return [0, 4, 2][total % 3];
}

/**
 * Resultados como placas en una caja de luz. Llegan apagadas: casi negras y sin detalle.
 * La foto real solo se pide cuando la persona enciende la placa.
 */
export function Negatoscopio({ placas }: { placas: Placa[] }) {
  const [encendidas, setEncendidas] = useState<Set<string>>(new Set());
  const todas = encendidas.size === placas.length;
  const grandes = cuantasGrandes(placas.length);

  const alternar = (id: string) => {
    // El evento va fuera del actualizador: React puede llamarlo dos veces y lo contaría doble.
    if (!encendidas.has(id)) track("resultado_encendido", { caso: id });
    setEncendidas((previas) => {
      const nuevas = new Set(previas);
      if (nuevas.has(id)) nuevas.delete(id);
      else nuevas.add(id);
      return nuevas;
    });
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          aria-pressed={todas}
          onClick={() => setEncendidas(todas ? new Set() : new Set(placas.map((p) => p.id)))}
          className="pulsable inline-flex min-h-11 items-center gap-2 rounded-pill border border-perla/25 px-5 text-[0.9rem] font-medium text-perla hover:border-perla/60"
        >
          <IconoLuz className="size-4.5 text-oro-claro" />
          {todas ? "Apagar todas" : "Encender todas"}
        </button>
      </div>

      {/* Encendida, cada placa se ve completa sobre el blanco del difusor, como una radiografía en la caja de luz. */}
      {/* En el celular las placas se deslizan de lado, como películas en la caja de luz. */}
      <ul
        aria-label="Resultados"
        className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6 lg:gap-5"
      >
        {placas.map((p, i) => {
          const encendida = encendidas.has(p.id);
          const destacada = i < grandes;
          return (
            <li
              key={p.id}
              className={cn(
                "w-[84%] shrink-0 snap-start sm:w-auto",
                destacada ? "lg:col-span-3" : "lg:col-span-2",
                placas.length === 1 && "lg:col-span-6",
              )}
            >
              {/* relative: los textos sr-only (posición absoluta) se quedan dentro del carril; si no, en el
                  celular escapan del scroll horizontal y ensanchan toda la página. */}
              <figure data-encendida={encendida || undefined} className="placa relative overflow-hidden rounded-panel bg-grafito ring-1 ring-perla/10">
                <div
                  aria-hidden="true"
                  onClick={() => alternar(p.id)}
                  className={cn("relative cursor-pointer overflow-hidden", destacada ? "aspect-[4/3]" : "aspect-[4/3] lg:aspect-square")}
                >
                  <div
                    className={cn("placa-imagen absolute inset-0 bg-cover bg-center", encendida && "bg-difusor")}
                    style={p.previa && !encendida ? { backgroundImage: `url(${p.previa})` } : undefined}
                  >
                    {encendida && (
                      <Image
                        src={p.imagen.src}
                        alt=""
                        fill
                        sizes={destacada ? "(min-width: 64rem) 38rem, (min-width: 40rem) 46vw, 92vw" : "(min-width: 64rem) 25rem, (min-width: 40rem) 46vw, 92vw"}
                        className="object-contain p-3 sm:p-4"
                      />
                    )}
                  </div>
                  <div className="placa-destello pointer-events-none absolute inset-0 bg-[#fff8ec]" />
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center gap-2 text-perla/75 transition-opacity duration-300",
                      encendida && "opacity-0",
                    )}
                  >
                    <IconoLuz className="size-7" />
                    <span className="text-[0.85rem]">Enciéndela para verla</span>
                  </div>
                </div>
                <figcaption className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="text-[1.05rem] text-perla">{p.titulo}</p>
                    <p className="mt-0.5 text-[0.85rem] text-niebla">
                      {p.detalle}
                      {p.profesional ? ` · ${p.profesional}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-pressed={encendida}
                    onClick={() => alternar(p.id)}
                    className={cn(
                      "pulsable inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-pill px-4 text-[0.85rem] font-medium",
                      encendida ? "bg-perla/10 text-perla hover:bg-perla/15" : "oro-pan text-noche",
                    )}
                  >
                    {encendida ? "Apagar" : "Encender"}
                    <span className="sr-only">: {p.imagen.alt}</span>
                  </button>
                </figcaption>
                {encendida && <p className="sr-only">{p.imagen.alt}</p>}
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
