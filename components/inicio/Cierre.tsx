import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { CtaWhatsApp } from "@/components/cta/CtaWhatsApp";
import { Enlace } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Foto } from "@/components/ui/Foto";
import { enlaceMapa, SEDE } from "@/data/sedes";
import { SITE } from "@/data/site";

/** Cierre: el llamado a la valoración y dónde está la clínica (una sola sede, en Aguachica). */
export function Cierre() {
  return (
    <section id="ubicacion" aria-labelledby="cierre-titulo" className="scroll-mt-16 bg-carbon pb-seccion">
      <Contenedor className="grid gap-12 border-t border-blanco/15 pt-seccion lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="cierre-titulo" className="max-w-[12ch] text-portada font-light">
            Hablemos de tu caso
          </h2>
          {/* data-cta-portada: mientras este botón se ve, la cabecera guarda el suyo */}
          <div data-cta-portada className="mt-9 flex flex-col items-start gap-3">
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

        <div className="sombra-papel lg:col-span-7">
          <article aria-labelledby="sede-titulo" className="papel grid rounded-troquel p-3 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div className="descubrir relative aspect-[16/10] overflow-hidden bg-algodon-2 sm:aspect-auto sm:min-h-[19rem]">
              <Foto src={SEDE.imagen.src} alt={SEDE.imagen.alt} fill sizes="(min-width: 64rem) 26rem, (min-width: 40rem) 52vw, 92vw" className="object-cover" />
            </div>
            <div className="flex flex-col px-3 pb-2 pt-5 sm:px-6 sm:py-5">
              <h3 id="sede-titulo" className="text-subtitulo font-light">
                {SEDE.nombre}
              </h3>
              <p className="rotulo mt-1 text-carbon">{SEDE.departamento}</p>
              <p className="mt-5 text-[1.05rem]">{SEDE.direccion}</p>
              <p className="mt-0.5 text-[0.95rem] leading-snug text-carbon">{SEDE.referencia}</p>
              <Enlace href={enlaceMapa(SEDE.coordenadas)} externo className="mt-auto pt-5 text-oro-texto">
                Cómo llegar
              </Enlace>
            </div>
          </article>
        </div>
      </Contenedor>
    </section>
  );
}
