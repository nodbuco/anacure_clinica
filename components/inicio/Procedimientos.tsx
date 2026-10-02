import Link from "next/link";
import { Contenedor } from "@/components/ui/Contenedor";
import { Foto } from "@/components/ui/Foto";
import { IconoChevron } from "@/components/ui/Icons";
import { procedimientosDe, type Procedimiento } from "@/data/procedimientos";
import { cn } from "@/lib/cn";

function Fila({ p, tono }: { p: Procedimiento; tono: "claro" | "oscuro" }) {
  return (
    <li>
      <Link
        href={`/procedimientos/${p.slug}`}
        className={cn(
          "group flex items-center justify-between gap-6 rounded-md py-5 transition-colors duration-200",
          tono === "oscuro" ? "border-t border-perla/15" : "border-t border-linea",
        )}
      >
        <span>
          <span className={cn("block text-[1.2rem] font-normal tracking-[-0.015em]", tono === "oscuro" ? "text-perla" : "text-tinta")}>
            {p.nombre}
          </span>
          <span className={cn("mt-1 block text-[0.95rem]", tono === "oscuro" ? "text-niebla" : "text-carbon")}>{p.corto}</span>
        </span>
        <IconoChevron
          className={cn(
            "size-5 shrink-0 transition-transform duration-300 ease-luz group-hover:translate-x-1",
            tono === "oscuro" ? "text-oro-claro" : "text-oro-texto",
          )}
        />
      </Link>
    </li>
  );
}

/** Mosaico de procedimientos: el cuerpo en un panel grande con la cirugía real; busto y rostro en difusores. */
export function Procedimientos() {
  return (
    <section id="procedimientos" data-tema="claro" aria-labelledby="procedimientos-titulo" className="scroll-mt-14 bg-perla py-seccion">
      <Contenedor>
        <div className="max-w-3xl">
          <h2 id="procedimientos-titulo" className="text-titulo font-light text-tinta">
            Procedimientos.
          </h2>
          <p className="mt-5 max-w-xl text-entrada text-carbon">Cuerpo, busto y rostro. Todos empiezan con una valoración gratuita.</p>
        </div>

        {/* Celular y tableta: los paneles se apilan al bajar (cada uno se queda arriba y el siguiente
            lo cubre); la profundidad sale de la superposición, nunca de una sombra. */}
        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          <article className="encender tema-oscuro relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-panel-lg bg-grafito text-perla max-lg:sticky max-lg:top-[4.5rem] lg:col-span-7 lg:row-span-2 lg:min-h-[44rem]">
            <Foto
              src="/media/clinica/cirugia.jpg"
              alt="Cirujanos de la clínica operando bajo las lámparas del quirófano"
              fill
              sizes="(min-width: 64rem) 58vw, 100vw"
              className="-z-10 object-cover object-[60%_35%]"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_19_19/0.96)_8%,rgb(20_19_19/0.72)_42%,rgb(20_19_19/0.05)_75%)]" />
            <div className="p-7 sm:p-10">
              <h3 className="text-subtitulo font-light">Cuerpo</h3>
              <ul className="mt-5">
                {procedimientosDe("cuerpo").map((p) => (
                  <Fila key={p.slug} p={p} tono="oscuro" />
                ))}
              </ul>
            </div>
          </article>

          {(["busto", "rostro"] as const).map((zona) => (
            <article
              key={zona}
              className={cn(
                "encender difusor rounded-panel-lg bg-blanco p-7 max-lg:sticky sm:p-10 lg:col-span-5",
                zona === "busto" ? "max-lg:top-[5.25rem]" : "max-lg:top-[6rem]",
              )}
            >
              <h3 className="text-subtitulo font-light text-tinta">{zona === "busto" ? "Busto" : "Rostro"}</h3>
              <ul className="mt-5">
                {procedimientosDe(zona).map((p) => (
                  <Fila key={p.slug} p={p} tono="claro" />
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Contenedor>
    </section>
  );
}
