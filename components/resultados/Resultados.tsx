import { type Caso, Sobres } from "@/components/resultados/Sobres";
import { Contenedor } from "@/components/ui/Contenedor";
import { profesional } from "@/data/equipo";
import type { Resultado } from "@/data/resultados";

interface Props {
  resultados: Resultado[];
  titulo?: string;
  id?: string;
}

/** Resultados en sobres cerrados (inicio y páginas de procedimiento). */
export function Resultados({ resultados, titulo = "Resultados", id = "resultados" }: Props) {
  if (resultados.length === 0) return null;
  const casos: Caso[] = resultados.map((r) => ({
    id: r.id,
    titulo: r.titulo,
    detalle: r.detalle,
    profesional: r.profesional ? profesional(r.profesional)?.nombre : undefined,
    imagen: r.imagen,
  }));

  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-16 bg-carbon pb-seccion">
      <Contenedor>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 id={`${id}-titulo`} className="text-titulo font-light lg:col-span-5">
            {titulo}
          </h2>
          <p className="max-w-[30rem] text-entrada text-perla lg:col-span-7">
            Publicadas con autorización de cada paciente. Cada sobre se abre con un toque. Los resultados varían de una persona a otra.
          </p>
        </div>
        <div className="mt-8 lg:mt-10">
          <Sobres casos={casos} />
        </div>
      </Contenedor>
    </section>
  );
}
