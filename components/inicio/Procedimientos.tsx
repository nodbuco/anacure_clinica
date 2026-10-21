import Link from "next/link";
import { Contenedor } from "@/components/ui/Contenedor";
import { IconoFlecha } from "@/components/ui/Icons";
import { PROCEDIMIENTOS, ZONAS, procedimientosDe } from "@/data/procedimientos";
import { cn } from "@/lib/cn";

/* Las pestañas van escalonadas, como en un fichero: en el celular, donde las fichas se montan
   una sobre otra, así se ven las tres. */
const PESTANA = ["ml-0", "ml-[34%] md:ml-0", "ml-[68%] md:ml-0"];

/** El fichero de procedimientos: una ficha por zona, con su pestaña, y un renglón por procedimiento. */
export function Procedimientos() {
  return (
    <section id="procedimientos" aria-labelledby="procedimientos-titulo" className="scroll-mt-16 bg-carbon pb-seccion pt-12 lg:pt-0">
      {/* Las pestañas son el borde superior de la sección: en el PC asoman al pie de la portada.
          El título va en la misma fila, a la derecha, como el rótulo del fichero. */}
      <Contenedor className="relative">
        <h2 id="procedimientos-titulo" className="rotulo absolute right-4 top-3 text-perla sm:right-6 lg:right-8">
          Procedimientos · {PROCEDIMIENTOS.length}
        </h2>

        <div className="grid md:grid-cols-3 md:gap-5">
          {ZONAS.map((z, i) => (
            <article
              key={z.slug}
              aria-labelledby={`zona-${z.slug}`}
              className={cn("sombra-papel relative flex flex-col transition-transform duration-500 ease-papel md:hover:-translate-y-1", i > 0 && "-mt-5 md:mt-0")}
            >
              <h3
                id={`zona-${z.slug}`}
                className={cn("papel pestana rotulo -mb-px self-start px-5 pb-2.5 pt-3 text-oro-texto", PESTANA[i])}
              >
                {z.nombre}
              </h3>
              <ul
                className={cn(
                  "papel flex-1 rounded-troquel px-5 pb-8 pt-2 md:pb-4",
                  i === 0 ? "rounded-tl-none" : "md:rounded-tl-none",
                )}
              >
                {procedimientosDe(z.slug).map((p, j) => (
                  <li key={p.slug} className={cn(j > 0 && "border-t border-linea")}>
                    <Link href={`/procedimientos/${p.slug}`} className="group flex items-start justify-between gap-4 py-4">
                      <span>
                        <span className="block text-ficha">{p.nombre}</span>
                        <span className="mt-1 block text-[0.95rem] leading-snug text-carbon">{p.corto}</span>
                      </span>
                      <IconoFlecha className="mt-1.5 h-3.5 w-4.5 shrink-0 text-oro-texto transition-transform duration-300 ease-papel group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Contenedor>
    </section>
  );
}
