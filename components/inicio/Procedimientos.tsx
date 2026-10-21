import Link from "next/link";
import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { Lamina } from "@/components/procedimientos/Lamina";
import { Contenedor } from "@/components/ui/Contenedor";
import { IconoFlecha } from "@/components/ui/Icons";
import { PROCEDIMIENTOS, ZONAS, procedimientosDe } from "@/data/procedimientos";
import { cn } from "@/lib/cn";

/* Las pestañas van escalonadas, como en un fichero: en el celular, donde las fichas se montan
   una sobre otra, así se ven las tres. */
const PESTANA = ["ml-0", "ml-[34%] md:ml-0", "ml-[64%] md:ml-0"];
/* En el PC: cuerpo y busto comparten la primera fila; rostro y la ficha en blanco, la segunda. */
const ANCHO = ["lg:col-span-6", "lg:col-span-6", "lg:col-span-9"];

/**
 * El fichero de procedimientos: una ficha por zona, con su pestaña, y dentro un procedimiento por
 * casilla con su lámina de marcaje. La última ficha va en blanco: para quien aún no sabe cuál.
 */
export function Procedimientos() {
  return (
    <section id="procedimientos" aria-labelledby="procedimientos-titulo" className="scroll-mt-16 bg-carbon pb-seccion pt-12 lg:pt-0">
      {/* Las pestañas son el borde superior de la sección: en el PC asoman al pie de la portada.
          El título va en la misma fila, a la derecha, como el rótulo del fichero. */}
      <Contenedor className="relative">
        <h2 id="procedimientos-titulo" className="rotulo absolute right-4 top-3 text-perla sm:right-6 lg:right-8">
          Procedimientos · {PROCEDIMIENTOS.length}
        </h2>

        <div className="grid gap-y-0 md:gap-y-8 lg:grid-cols-12 lg:gap-x-5">
          {ZONAS.map((z, i) => {
            const lista = procedimientosDe(z.slug);
            return (
              <article
                key={z.slug}
                aria-labelledby={`zona-${z.slug}`}
                className={cn("sombra-papel relative flex flex-col", ANCHO[i], i > 0 && "-mt-5 md:mt-0")}
              >
                <h3 id={`zona-${z.slug}`} className={cn("papel pestana rotulo -mb-px self-start px-5 pb-2.5 pt-3 text-oro-texto", PESTANA[i])}>
                  {z.nombre}
                </h3>
                <ul
                  className={cn(
                    "papel grid flex-1 grid-cols-2 rounded-troquel pb-4 md:pb-0",
                    lista.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
                    i === 0 ? "rounded-tl-none" : "md:rounded-tl-none",
                  )}
                >
                  {lista.map((p, j) => {
                    // En el celular, una casilla que queda sola en su fila ocupa las dos columnas, en horizontal.
                    const sola = lista.length % 2 === 1 && j === lista.length - 1;
                    return (
                      <li
                        key={p.slug}
                        className={cn(
                          j % 2 === 1 && "border-l border-linea",
                          j >= 2 && "border-t border-linea sm:border-t-0",
                          j > 0 && "sm:border-l",
                          sola && "col-span-2 sm:col-span-1",
                        )}
                      >
                        <Link
                          href={`/procedimientos/${p.slug}`}
                          className={cn(
                            "group flex h-full flex-col px-4 pb-5 pt-4 transition-colors duration-300 hover:bg-blanco/55 sm:px-5 lg:px-6 lg:pb-6",
                            sola && "max-sm:grid max-sm:grid-cols-[8.5rem_minmax(0,1fr)] max-sm:items-center max-sm:gap-4",
                          )}
                        >
                          <span className="marco-lamina relative block aspect-[4/5]">
                            <Lamina slug={p.slug} decorativa className="absolute inset-0 p-[6%]" />
                          </span>
                          <span className="mt-3 block lg:mt-4">
                            <span className="flex items-start justify-between gap-3">
                              <span className="text-balance text-[1.05rem] leading-snug sm:text-ficha">{p.nombre}</span>
                              <IconoFlecha className="mt-1.5 h-3.5 w-4.5 shrink-0 text-oro-texto transition-transform duration-300 ease-papel group-hover:translate-x-1" />
                            </span>
                            <span className="mt-1.5 block text-[0.92rem] leading-snug text-carbon sm:text-[0.95rem]">{p.corto}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}

          {/* La ficha en blanco: renglones vacíos para quien todavía no sabe qué procedimiento busca */}
          <aside aria-labelledby="ficha-blanco" className="sombra-papel mt-8 lg:col-span-3 lg:mt-[2.4rem]">
            <div className="papel flex h-full flex-col rounded-troquel px-5 py-6 lg:px-6">
              <h3 id="ficha-blanco" className="text-subtitulo font-light">
                ¿Aún no sabes cuál?
              </h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-carbon">Te orientamos en la valoración.</p>
              <div aria-hidden="true" className="renglones mt-6 min-h-[6rem] flex-1" />
              <CtaValoracion
                ubicacion="ficha-en-blanco"
                procedimiento="aun-no-se"
                simple
                className="enlace mt-2 self-start text-oro-texto"
              >
                Agenda tu valoración
                <IconoFlecha className="h-3.5 w-4.5 shrink-0" />
              </CtaValoracion>
            </div>
          </aside>
        </div>
      </Contenedor>
    </section>
  );
}
