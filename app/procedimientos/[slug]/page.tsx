import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { VistaProcedimiento } from "@/components/procedimientos/VistaProcedimiento";
import { Resultados } from "@/components/resultados/Resultados";
import { EnlaceFlecha } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { Foto } from "@/components/ui/Foto";
import { IconoCheck, IconoChevron } from "@/components/ui/Icons";
import { profesional } from "@/data/equipo";
import { fechaJornada } from "@/data/jornada";
import { PROCEDIMIENTOS, ZONAS, procedimientoPorSlug } from "@/data/procedimientos";
import { resultadosDe } from "@/data/resultados";
import { SITE } from "@/data/site";
import { jsonLdProcedimiento, jsonLdSeguro } from "@/lib/seo";

export function generateStaticParams() {
  return PROCEDIMIENTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/procedimientos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = procedimientoPorSlug(slug);
  if (!p) return {};
  return {
    title: `${p.nombre} en Aguachica`,
    description: p.resumen,
    alternates: { canonical: `/procedimientos/${p.slug}` },
    openGraph: { title: `${p.nombre} · ${SITE.nombre}`, description: p.resumen },
  };
}

export default async function ProcedimientoPage(props: PageProps<"/procedimientos/[slug]">) {
  const { slug } = await props.params;
  const p = procedimientoPorSlug(slug);
  if (!p) notFound();
  const zona = ZONAS.find((z) => z.slug === p.zona)!;
  const resultados = resultadosDe(p.slug);
  const fecha = fechaJornada();
  const equipo = p.equipo.map(profesional).filter((x) => x !== undefined);
  const otros = PROCEDIMIENTOS.filter((o) => o.slug !== p.slug);

  return (
    <main>
      <VistaProcedimiento slug={p.slug} />

      <section data-tema="claro" aria-labelledby="procedimiento-titulo" className="bg-perla pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
        <Contenedor>
          <nav aria-label="Ruta" className="text-[0.9rem] text-carbon">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/#procedimientos" className="rounded-sm hover:text-tinta hover:underline">
                  Procedimientos
                </Link>
              </li>
              <li aria-hidden="true">
                <IconoChevron className="size-3.5" />
              </li>
              <li aria-current="page">{zona.nombre}</li>
            </ol>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 id="procedimiento-titulo" className="text-titan font-light text-tinta lg:col-span-8">
              {p.nombre}
            </h1>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="text-entrada text-carbon">{p.corto}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                <CtaValoracion ubicacion="procedimiento" procedimiento={p.slug} tamano="lg" />
                {resultados.length > 0 && <EnlaceFlecha href="#resultados">Ver resultados</EnlaceFlecha>}
              </div>
            </div>
          </div>

          <div className="encender relative mt-12 aspect-[4/3] overflow-hidden rounded-panel-lg bg-grafito sm:aspect-[16/9] lg:mt-16 lg:aspect-[21/9]">
            <Foto src={p.imagen.src} alt={p.imagen.alt} fill priority sizes="(min-width: 80rem) 76rem, 100vw" className="object-cover" />
          </div>
        </Contenedor>
      </section>

      <section data-tema="claro" aria-label="Detalles del procedimiento" className="bg-blanco py-seccion">
        <Contenedor className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-subtitulo font-light text-tinta">En qué consiste</h2>
            <div className="texto-largo mt-6 max-w-[38rem] text-[1.125rem] leading-relaxed text-carbon">
              {p.queEs.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
            </div>

            <h2 className="mt-14 text-subtitulo font-light text-tinta">Recuperación</h2>
            <p className="mt-6 max-w-[38rem] text-[1.125rem] leading-relaxed text-carbon">
              {p.recuperacion} La duración, el tipo de anestesia y los tiempos exactos se definen contigo en la valoración.
            </p>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <div className="encender difusor rounded-panel-lg bg-perla p-7 sm:p-9">
              <h2 className="text-tarjeta font-light text-tinta">Es para ti si…</h2>
              <ul className="mt-5 space-y-3.5">
                {p.paraQuien.map((x) => (
                  <li key={x} className="flex gap-3 text-carbon">
                    <IconoCheck className="mt-1 size-4.5 shrink-0 text-oro-texto" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="encender difusor rounded-panel-lg bg-perla p-7 sm:p-9">
              <dl className="space-y-5">
                <div>
                  <dt className="text-[0.9rem] text-carbon">Tipo</dt>
                  <dd className="mt-1 text-[1.05rem] text-tinta">
                    {p.tipo === "quirurgico" ? "Quirúrgico, se programa en una jornada" : "Ambulatorio y sin cirugía"}
                  </dd>
                </div>
                {equipo.length > 0 && (
                  <div>
                    <dt className="text-[0.9rem] text-carbon">Lo realiza</dt>
                    <dd className="mt-1 text-[1.05rem] text-tinta">{equipo.map((e) => e.nombre).join(" · ")}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[0.9rem] text-carbon">Próxima jornada</dt>
                  <dd className="mt-1 text-[1.05rem] text-tinta first-letter:uppercase">{fecha ?? "Fechas por anunciar"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Contenedor>
      </section>

      <Resultados resultados={resultados} />

      <section data-tema="claro" className="bg-perla py-seccion">
        <Contenedor>
          <div className="encender tema-oscuro flex flex-col gap-8 rounded-panel-lg bg-noche p-8 text-perla sm:p-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-subtitulo font-light">Tu valoración es gratuita.</h2>
              <p className="mt-3 max-w-md text-niebla">Presencial en Aguachica o El Banco, o virtual desde tu casa.</p>
            </div>
            <CtaValoracion ubicacion="procedimiento-cierre" procedimiento={p.slug} tamano="lg" className="self-start md:self-auto" />
          </div>

          <h2 id="otros-titulo" className="mt-20 text-tarjeta font-light text-tinta">
            Otros procedimientos
          </h2>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((o) => (
              <li key={o.slug}>
                <Link href={`/procedimientos/${o.slug}`} className="group flex items-center justify-between gap-4 border-t border-linea py-4">
                  <span className="text-tinta">{o.nombre}</span>
                  <IconoChevron className="size-4.5 text-oro-texto transition-transform duration-300 ease-luz group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Contenedor>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSeguro(jsonLdProcedimiento(p)) }} />
    </main>
  );
}
