import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { CtaWhatsApp } from "@/components/cta/CtaWhatsApp";
import { EnlaceFlecha } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Foto } from "@/components/ui/Foto";
import { enlaceMapa, LISTA_SEDES } from "@/data/sedes";

/** Cierre de la historia: el llamado a la valoración y dónde encontrarnos. */
export function Cierre() {
  return (
    <section data-tema="oscuro" aria-labelledby="cierre-titulo" className="tema-oscuro relative isolate overflow-hidden bg-noche py-seccion text-perla">
      {/* La lámpara: un halo cálido detrás del titular, la única luz de la sección */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[38rem] w-[min(68rem,140vw)] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(ellipse_at_center,rgb(243_201_137/0.16),transparent_62%)]"
      />
      <Contenedor>
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="cierre-titulo" className="text-titan font-light">
            Tu valoración es gratuita.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-entrada text-niebla">Presencial en Aguachica o El Banco, o virtual desde tu casa.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaValoracion ubicacion="cierre" tamano="lg" />
            <CtaWhatsApp ubicacion="cierre" variante="contorno-claro" tamano="lg">
              Escríbenos
            </CtaWhatsApp>
          </div>
        </div>

        <div id="sedes" className="mt-20 grid scroll-mt-20 gap-4 sm:grid-cols-2 lg:mt-28 lg:gap-5">
          {LISTA_SEDES.map((s) => (
            <article key={s.slug} className="encender difusor difusor-oscuro overflow-hidden rounded-panel-lg bg-grafito">
              <div className="relative aspect-[16/10]">
                <Foto src={s.imagen.src} alt={s.imagen.alt} fill sizes="(min-width: 40rem) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-7 sm:p-9">
                <h3 className="text-subtitulo font-light">
                  {s.nombre}
                  <span className="text-niebla">, {s.departamento}</span>
                </h3>
                <p className="mt-3 text-[1.05rem]">{s.direccion}</p>
                <p className="mt-1 text-[0.95rem] text-niebla">{s.referencia}</p>
                <EnlaceFlecha href={enlaceMapa(s.coordenadas)} externo tono="claro" className="mt-5">
                  Cómo llegar
                </EnlaceFlecha>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-[0.95rem] text-niebla">
          ¿Eres docente afiliado a FOMAG? Tenemos convenio: cuéntanoslo en tu valoración.
        </p>
      </Contenedor>
    </section>
  );
}
