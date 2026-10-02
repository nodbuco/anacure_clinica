import { Contenedor } from "@/components/ui/Contenedor";
import { Foto } from "@/components/ui/Foto";
import { EQUIPO } from "@/data/equipo";

/** Las personas detrás de cada jornada. Hasta tener retratos de cada médico, dos fotos reales de grupo. */
export function Equipo() {
  return (
    <section id="equipo" data-tema="claro" aria-labelledby="equipo-titulo" className="scroll-mt-14 bg-blanco py-seccion">
      <Contenedor>
        <div className="max-w-3xl">
          <h2 id="equipo-titulo" className="text-titulo font-light text-tinta">
            El equipo.
          </h2>
          <p className="mt-5 max-w-xl text-entrada text-carbon">Quienes te van a valorar, operar y acompañar.</p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          <figure className="encender relative aspect-[4/3] overflow-hidden rounded-panel-lg bg-perla lg:col-span-7 lg:aspect-auto lg:h-[36rem]">
            <Foto
              src="/media/equipo/equipo-quirurgico.jpg"
              alt="Equipo de cirugía de la clínica en el quirófano de Aguachica"
              fill
              sizes="(min-width: 64rem) 58vw, 100vw"
              className="object-cover object-[50%_40%]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(20_19_19/0.7),transparent)] p-6 pt-16 text-[0.9rem] text-perla sm:p-8">
              Equipo de cirugía, en nuestro quirófano
            </figcaption>
          </figure>
          <figure className="encender relative aspect-[3/4] overflow-hidden rounded-panel-lg bg-perla sm:aspect-[4/3] lg:col-span-5 lg:aspect-auto lg:h-[36rem]">
            <Foto
              src="/media/equipo/alan-rodriguez-ana-cure.jpg"
              alt="El Dr. Alan Rodríguez, cirujano plástico, junto a la Dra. Ana Cure"
              fill
              sizes="(min-width: 64rem) 40vw, 100vw"
              className="object-cover object-[50%_20%]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(20_19_19/0.7),transparent)] p-6 pt-16 text-[0.9rem] text-perla sm:p-8">
              Dr. Alan Rodríguez y Dra. Ana Cure
            </figcaption>
          </figure>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {EQUIPO.map((p) => (
            <li key={p.slug} className="border-t border-linea pt-6">
              <h3 className="text-tarjeta font-light text-tinta">{p.nombre}</h3>
              <p className="mt-1 text-[0.9rem] font-medium text-oro-texto">{p.rol}</p>
              <p className="mt-3 leading-relaxed text-carbon">{p.linea}</p>
            </li>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}
