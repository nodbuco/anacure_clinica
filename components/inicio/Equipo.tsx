import { Contenedor } from "@/components/ui/Contenedor";
import { Foto } from "@/components/ui/Foto";
import { IconoInstagram } from "@/components/ui/Icons";
import { EQUIPO } from "@/data/equipo";

/**
 * Las personas detrás de cada jornada, cada una con su tarjeta de presentación.
 * Mientras no haya retratos de todos, una sola foto: la del Dr. Alan Rodríguez con la Dra. Ana Cure.
 */
export function Equipo() {
  return (
    <section id="equipo" aria-labelledby="equipo-titulo" className="scroll-mt-16 bg-carbon pb-seccion">
      <Contenedor>
        <h2 id="equipo-titulo" className="text-titulo font-light">
          El equipo
        </h2>
        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-4">
            {/* Copia impresa, como las fotos de la tarjeta de controles */}
            <div className="copia">
              <div className="descubrir relative aspect-[4/5] overflow-hidden bg-carbon-hondo sm:aspect-[4/3] lg:aspect-[4/5]">
                <Foto
                  src="/media/equipo/alan-rodriguez-ana-cure.jpg"
                  alt="El Dr. Alan Rodríguez, cirujano plástico, junto a la Dra. Ana Cure"
                  fill
                  sizes="(min-width: 64rem) 25rem, 100vw"
                  className="object-cover object-[50%_22%]"
                />
              </div>
            </div>
            <figcaption className="rotulo mt-3 text-perla">Dr. Alan Rodríguez y Dra. Ana Cure</figcaption>
          </figure>

          <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-8 lg:gap-5">
            {EQUIPO.map((p) => (
              <li key={p.slug} className="sombra-papel">
                <article className="papel h-full rounded-troquel p-6 lg:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-ficha text-oro-texto">{p.nombre}</h3>
                    {/* eslint-disable-next-line @next/next/no-img-element -- isotipo del kit en SVG, sin modificar */}
                    <img src="/brand/isotipo-color.svg" alt="" width={213} height={213} loading="lazy" className="size-6 shrink-0" />
                  </div>
                  <p className="rotulo mt-2 text-carbon">{p.rol}</p>
                  <p className="mt-4 border-t border-linea pt-4 text-[0.98rem] leading-snug">{p.linea}</p>
                  {p.instagram && (
                    <a
                      href={p.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-mb-2 -ml-1 mt-1 inline-flex min-h-11 items-center gap-2 px-1 text-[0.9rem] text-tinta underline decoration-tinta/30 underline-offset-4 hover:decoration-tinta"
                    >
                      <IconoInstagram className="size-4" />
                      Instagram
                      <span className="sr-only">de {p.nombre}</span>
                    </a>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Contenedor>
    </section>
  );
}
