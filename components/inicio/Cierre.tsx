import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { CtaWhatsApp } from "@/components/cta/CtaWhatsApp";
import { Enlace } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Foto } from "@/components/ui/Foto";
import { enlaceMapa, LISTA_SEDES } from "@/data/sedes";
import { SITE } from "@/data/site";

/** Cierre: el llamado a la valoración y dónde encontrarnos. */
export function Cierre() {
  return (
    <section id="sedes" aria-labelledby="cierre-titulo" className="scroll-mt-16 bg-carbon pb-seccion">
      <Contenedor className="grid gap-12 border-t border-blanco/15 pt-seccion lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="cierre-titulo" className="max-w-[12ch] text-portada font-light">
            Hablemos de tu caso
          </h2>
          <div className="mt-9 flex flex-col items-start gap-3">
            <CtaValoracion ubicacion="cierre" className="w-full sm:w-auto" />
            <CtaWhatsApp
              ubicacion="cierre"
              simple
              className="inline-flex min-h-11 items-center text-[1rem] text-perla underline decoration-perla/40 underline-offset-4 hover:text-blanco hover:decoration-blanco"
            >
              o escríbenos por WhatsApp al <span className="tabular ml-1">{SITE.whatsappBonito}</span>
            </CtaWhatsApp>
          </div>
          <p className="mt-8 max-w-[24rem] text-[0.98rem] text-perla">¿Eres docente afiliado a FOMAG? Tenemos convenio.</p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {LISTA_SEDES.map((s) => (
            <li key={s.slug} className="sombra-papel">
              <article className="papel flex h-full flex-col rounded-troquel p-3">
                <div className="descubrir relative aspect-[16/10] overflow-hidden bg-algodon-2">
                  <Foto src={s.imagen.src} alt={s.imagen.alt} fill sizes="(min-width: 64rem) 22rem, (min-width: 40rem) 46vw, 92vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
                  <h3 className="text-subtitulo font-light">{s.nombre}</h3>
                  <p className="rotulo mt-1 text-carbon">{s.departamento}</p>
                  <p className="mt-4 text-[1.05rem]">{s.direccion}</p>
                  <p className="mt-0.5 text-[0.95rem] leading-snug text-carbon">{s.referencia}</p>
                  <Enlace href={enlaceMapa(s.coordenadas)} externo className="mt-auto pt-4 text-oro-texto">
                    Cómo llegar
                  </Enlace>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}
