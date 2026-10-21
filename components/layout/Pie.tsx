import Link from "next/link";
import type { ReactNode } from "react";
import NodbuFirma from "@/components/nodbu-firma/NodbuFirma";
import { Contenedor } from "@/components/ui/Contenedor";
import { IconoInstagram, IconoWhatsApp } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { NAV_LEGAL } from "@/data/navegacion";
import { HORARIO } from "@/data/sedes";
import { SITE } from "@/data/site";
import { urlWhatsApp } from "@/lib/whatsapp";

function Columna({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="rotulo text-oro-texto">{titulo}</h2>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-tinta">{children}</div>
    </div>
  );
}

const enlace = "inline-flex min-h-11 items-center gap-2 underline decoration-tinta/25 underline-offset-4 transition-colors hover:decoration-tinta";

/** El pie del membrete: contacto, horario, el spa y lo legal, en una hoja de algodón. */
export function Pie() {
  const anio = new Date().getFullYear();
  return (
    <footer id="pie" className="papel relative z-10">
      <Contenedor className="pb-6 pt-12 lg:pt-16">
        <div className="grid gap-10 border-b border-linea pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1.4fr_0.9fr] lg:gap-8">
          <Logo version="horizontal" diferido className="h-10 sm:h-11" />

          <Columna titulo="Contacto">
            <ul className="-my-1.5">
              <li>
                <a href={urlWhatsApp()} target="_blank" rel="noopener noreferrer" className={enlace}>
                  <IconoWhatsApp className="size-4" />
                  <span className="tabular">{SITE.whatsappBonito}</span>
                </a>
              </li>
              <li>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={enlace}>
                  <IconoInstagram className="size-4" />
                  {SITE.instagramUsuario}
                </a>
              </li>
            </ul>
          </Columna>

          <Columna titulo="Horario">
            <p className="tabular">
              Lunes a viernes, {HORARIO.lunesViernes}
              <br />
              Sábados, {HORARIO.sabados}
              <br />
              Domingos y festivos, cerrado
            </p>
          </Columna>

          <Columna titulo="Recuperación">
            <a href={SITE.urlSpa} target="_blank" rel="noopener noreferrer" className={`${enlace} -my-1.5`}>
              Ana Cure Estética &amp; Spa
            </a>
          </Columna>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-[0.875rem] leading-relaxed text-carbon lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1">
            <p>Cada procedimiento se indica después de una valoración médica. Los procedimientos quirúrgicos son solo para mayores de edad.</p>
            <p className="flex flex-wrap items-center gap-x-4">
              <span>
                © {anio} {SITE.legal.razonSocial} · NIT {SITE.legal.nit}
              </span>
              {NAV_LEGAL.map((e) => (
                <Link key={e.href} href={e.href} className="inline-flex min-h-11 items-center underline decoration-carbon/40 underline-offset-4 hover:text-tinta">
                  {e.etiqueta}
                </Link>
              ))}
            </p>
          </div>
          {/* Firma del desarrollador. Hereda el color de la tinta: la firma atenúa «Desarrollado por»
              y con el gris del pie quedaría por debajo del contraste mínimo. */}
          <div className="shrink-0 text-tinta [--nodbu-firma-tamano:0.95rem]">
            <NodbuFirma />
          </div>
        </div>
      </Contenedor>
    </footer>
  );
}
