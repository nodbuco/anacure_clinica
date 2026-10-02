import Link from "next/link";
import type { ReactNode } from "react";
import NodbuFirma from "@/components/nodbu-firma/NodbuFirma";
import { Contenedor } from "@/components/ui/Contenedor";
import { IconoInstagram, IconoWhatsApp } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { NAV_LEGAL } from "@/data/navegacion";
import { PROCEDIMIENTOS } from "@/data/procedimientos";
import { HORARIO } from "@/data/sedes";
import { SITE } from "@/data/site";
import { urlWhatsApp } from "@/lib/whatsapp";

const CLINICA = [
  { href: "/#clinica", etiqueta: "La clínica" },
  { href: "/#resultados", etiqueta: "Resultados" },
  { href: "/#equipo", etiqueta: "Equipo" },
  { href: "/#sedes", etiqueta: "Sedes" },
  { href: "/valoracion", etiqueta: "Agenda tu valoración" },
];

function Columna({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-[0.8rem] font-semibold tracking-[0.01em] text-tinta">{titulo}</h2>
      <ul className="mt-3 space-y-2.5 text-[0.8rem] text-carbon">{children}</ul>
    </div>
  );
}

const enlace = "rounded-sm transition-colors duration-200 hover:text-tinta hover:underline";

export function Pie() {
  const anio = new Date().getFullYear();
  return (
    <footer id="pie" data-tema="claro" className="relative z-10 bg-perla text-tinta">
      <Contenedor className="pt-14 pb-8">
        <div className="border-b border-linea pb-6 text-[0.75rem] leading-relaxed text-carbon">
          <p>Cada procedimiento se indica después de una valoración médica. Los procedimientos quirúrgicos son solo para mayores de edad.</p>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo version="vertical" diferido className="h-20" />
            <p className="mt-5 max-w-60 text-[0.8rem] leading-relaxed text-carbon">
              Tu recuperación sigue en{" "}
              <a href={SITE.urlSpa} target="_blank" rel="noopener noreferrer" className="text-oro-texto underline-offset-2 hover:underline">
                Ana Cure Estética &amp; Spa
              </a>
              , en el mismo edificio.
            </p>
          </div>

          <Columna titulo="Procedimientos">
            {PROCEDIMIENTOS.map((p) => (
              <li key={p.slug}>
                <Link href={`/procedimientos/${p.slug}`} className={enlace}>
                  {p.nombre}
                </Link>
              </li>
            ))}
          </Columna>

          <Columna titulo="Clínica">
            {CLINICA.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={enlace}>
                  {e.etiqueta}
                </Link>
              </li>
            ))}
          </Columna>

          <Columna titulo="Contacto">
            <li>
              <a href={urlWhatsApp()} target="_blank" rel="noopener noreferrer" className={`${enlace} inline-flex items-center gap-2`}>
                <IconoWhatsApp className="size-4" />
                <span className="tabular">{SITE.whatsappBonito}</span>
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={`${enlace} inline-flex items-center gap-2`}>
                <IconoInstagram className="size-4" />
                {SITE.instagramUsuario}
              </a>
            </li>
            <li className="pt-2 tabular">
              Lunes a viernes, {HORARIO.lunesViernes}
              <br />
              Sábados, {HORARIO.sabados}
              <br />
              Domingos y festivos, cerrado
            </li>
          </Columna>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-linea pt-6 text-center text-[0.75rem] text-carbon sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-x-5 gap-y-2 sm:flex-row sm:flex-wrap">
            <p>
              © {anio} {SITE.legal.razonSocial} · NIT {SITE.legal.nit}
            </p>
            {NAV_LEGAL.map((e) => (
              <Link key={e.href} href={e.href} className={enlace}>
                {e.etiqueta}
              </Link>
            ))}
          </div>
          {/* Firma del desarrollador: un 20 % más grande que el © (0,75 rem × 1,2 = 0,9 rem).
              Hereda el color de la tinta: la firma atenúa «Desarrollado por» y con el gris del pie
              quedaría por debajo del contraste mínimo. */}
          <div className="shrink-0 text-tinta [--nodbu-firma-tamano:0.9rem]">
            <NodbuFirma />
          </div>
        </div>
      </Contenedor>
    </footer>
  );
}
