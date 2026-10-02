import { EnlaceFlecha } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Foto } from "@/components/ui/Foto";
import { RECUPERACION } from "@/data/procedimientos";
import { SITE } from "@/data/site";

/** «Opérate aquí, recupérate aquí»: el puente natural con el sitio del spa. */
export function Recuperacion() {
  return (
    <section id="recuperacion" data-tema="claro" aria-labelledby="recuperacion-titulo" className="scroll-mt-14 bg-perla py-seccion">
      <Contenedor>
        <div className="max-w-3xl">
          <h2 id="recuperacion-titulo" className="text-titulo font-light text-tinta">
            Opérate aquí. Recupérate aquí.
          </h2>
          <p className="mt-5 max-w-xl text-entrada text-carbon">
            Tu postoperatorio sigue en Ana Cure Estética &amp; Spa, en el mismo edificio de Aguachica.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          <figure className="encender relative aspect-[4/3] overflow-hidden rounded-panel-lg bg-grafito lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
            <Foto
              src="/media/recuperacion/hiperbarica.jpg"
              alt="Paciente en la cámara hiperbárica de la Clínica Estética Ana Cure, acompañada por el equipo"
              fill
              sizes="(min-width: 64rem) 58vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(20_19_19/0.75),transparent)] p-6 pt-16 text-[0.9rem] text-perla sm:p-8 sm:pt-20">
              Cámara hiperbárica, en la sede de Aguachica
            </figcaption>
          </figure>

          <div className="encender difusor flex flex-col rounded-panel-lg bg-blanco p-7 sm:p-10 lg:col-span-5">
            <ul className="flex-1">
              {RECUPERACION.map((r, i) => (
                <li key={r.nombre} className={i === 0 ? "pb-5" : "border-t border-linea py-5"}>
                  <h3 className="text-[1.2rem] font-normal tracking-[-0.015em] text-tinta">{r.nombre}</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-carbon">{r.texto}</p>
                </li>
              ))}
            </ul>
            <EnlaceFlecha href={SITE.urlSpa} externo className="mt-4 text-[1.0625rem]">
              Conoce el spa
            </EnlaceFlecha>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
