import { Negatoscopio, type Placa } from "@/components/resultados/Negatoscopio";
import { Contenedor } from "@/components/ui/Contenedor";
import { profesional } from "@/data/equipo";
import type { Resultado } from "@/data/resultados";
import { desenfoque } from "@/lib/desenfoque";

interface Props {
  resultados: Resultado[];
  titulo?: string;
  id?: string;
}

/** Sección oscura de resultados (inicio y páginas de procedimiento). Prepara las vistas borrosas en el build. */
export async function Resultados({ resultados, titulo = "Resultados reales.", id = "resultados" }: Props) {
  if (resultados.length === 0) return null;
  const placas: Placa[] = await Promise.all(
    resultados.map(async (r) => ({
      id: r.id,
      titulo: r.titulo,
      detalle: r.detalle,
      profesional: r.profesional ? profesional(r.profesional)?.nombre : undefined,
      imagen: r.imagen,
      previa: await desenfoque(r.imagen.src),
    })),
  );

  return (
    <section id={id} data-tema="oscuro" aria-labelledby={`${id}-titulo`} className="tema-oscuro scroll-mt-14 bg-noche py-seccion text-perla">
      <Contenedor>
        <div className="max-w-3xl">
          <h2 id={`${id}-titulo`} className="text-titulo font-light">
            {titulo}
          </h2>
          <p className="mt-5 max-w-xl text-entrada text-niebla">
            Fotos de pacientes publicadas con su autorización. Llegan apagadas: enciende las que quieras ver. Los resultados varían de una persona a otra.
          </p>
        </div>
        <div className="mt-10 lg:mt-14">
          <Negatoscopio placas={placas} />
        </div>
      </Contenedor>
    </section>
  );
}
