import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { VistaProcedimiento } from "@/components/procedimientos/VistaProcedimiento";
import { Resultados } from "@/components/resultados/Resultados";
import { Enlace } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { IconoCheck, IconoFlecha } from "@/components/ui/Icons";
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

/** La ficha de un procedimiento: qué es y su recuperación en el cuerpo; para quién y quién lo hace en el talón. */
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

      <section aria-labelledby="procedimiento-titulo" className="bg-carbon pb-seccion pt-24 sm:pt-28 lg:pt-36">
        <Contenedor>
          <nav aria-label="Ruta">
            <ol className="rotulo flex flex-wrap items-center gap-2 text-perla">
              <li>
                <Link href="/#procedimientos" className="inline-flex min-h-11 items-center underline decoration-perla/40 underline-offset-4 hover:text-blanco">
                  Procedimientos
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{zona.nombre}</li>
            </ol>
          </nav>
          <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1 id="procedimiento-titulo" className="text-portada font-light lg:col-span-7">
              {p.nombre}
            </h1>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-entrada text-perla">{p.corto}</p>
              {/* data-cta-portada: mientras este botón se ve, la cabecera guarda el suyo */}
              <div data-cta-portada className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                <CtaValoracion ubicacion="procedimiento" procedimiento={p.slug} className="w-full sm:w-auto" />
                {resultados.length > 0 && (
                  <Enlace href="#resultados" className="text-blanco">
                    Ver resultados
                  </Enlace>
                )}
              </div>
            </div>
          </div>

          {/* La ficha: cuerpo y talón perforado (en el celular el talón queda debajo) */}
          <div className="sombra-papel mt-12 lg:mt-16">
            <article
              aria-label={`Ficha: ${p.nombre}`}
              className="papel grid rounded-troquel lg:con-talon lg:grid-cols-[minmax(0,1fr)_var(--talon)] lg:[--talon:24rem]"
            >
              <div className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
                <h2 className="rotulo text-oro-texto">En qué consiste</h2>
                <div className="texto-largo mt-4 max-w-[38rem] text-[1.1rem] leading-relaxed">
                  {p.queEs.map((parrafo) => (
                    <p key={parrafo}>{parrafo}</p>
                  ))}
                </div>
                <h2 className="rotulo mt-10 text-oro-texto">Recuperación</h2>
                <p className="mt-4 max-w-[38rem] text-[1.1rem] leading-relaxed">
                  {p.recuperacion} Los tiempos exactos se definen contigo en la valoración.
                </p>
              </div>

              <div className="border-t border-dashed border-tinta/25 bg-algodon-2 px-5 py-8 sm:px-8 lg:linea-corte lg:rounded-r-troquel lg:border-t-0 lg:px-10 lg:py-12">
                <h2 className="rotulo text-oro-texto">Es para ti si…</h2>
                <ul className="mt-4 space-y-3">
                  {p.paraQuien.map((x) => (
                    <li key={x} className="flex gap-3 leading-snug">
                      <IconoCheck className="mt-0.5 size-4.5 shrink-0 text-oro-texto" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-8 space-y-4 border-t border-linea pt-6">
                  <div>
                    <dt className="rotulo text-carbon">Tipo</dt>
                    <dd className="mt-1">{p.tipo === "quirurgico" ? "Cirugía programada en una jornada, solo para mayores de edad" : "Ambulatorio y sin cirugía"}</dd>
                  </div>
                  {equipo.length > 0 && (
                    <div>
                      <dt className="rotulo text-carbon">Lo realiza</dt>
                      <dd className="mt-1">{equipo.map((e) => e.nombre).join(" · ")}</dd>
                    </div>
                  )}
                  {fecha && p.tipo === "quirurgico" && (
                    <div>
                      <dt className="rotulo text-carbon">Próxima jornada</dt>
                      <dd className="mt-1 first-letter:uppercase">{fecha}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </article>
          </div>
        </Contenedor>
      </section>

      <Resultados resultados={resultados} />

      <section aria-labelledby="otros-titulo" className="bg-carbon pb-seccion">
        <Contenedor className="grid gap-10 border-t border-blanco/15 pt-seccion lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-titulo font-light">Empieza por tu valoración</h2>
            <p className="mt-4 max-w-[26rem] text-entrada text-perla">Presencial en Aguachica o El Banco, o virtual desde tu casa.</p>
            <CtaValoracion ubicacion="procedimiento-cierre" procedimiento={p.slug} className="mt-8 w-full sm:w-auto" />
          </div>
          <div className="lg:col-span-7">
            <h2 id="otros-titulo" className="rotulo text-perla">
              Otros procedimientos
            </h2>
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {otros.map((o) => (
                <li key={o.slug}>
                  <Link href={`/procedimientos/${o.slug}`} className="group flex items-center justify-between gap-4 border-t border-blanco/15 py-4">
                    <span>{o.nombre}</span>
                    <IconoFlecha className="h-3.5 w-4.5 shrink-0 text-oro-claro transition-transform duration-300 ease-papel group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Contenedor>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSeguro(jsonLdProcedimiento(p)) }} />
    </main>
  );
}
