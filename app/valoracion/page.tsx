import type { Metadata } from "next";
import { Suspense } from "react";
import { FormularioDesdeEnlace } from "@/components/valoracion/FormularioDesdeEnlace";
import { FormularioValoracion } from "@/components/valoracion/FormularioValoracion";
import { Contenedor } from "@/components/ui/Contenedor";
import { fechaJornada } from "@/data/jornada";

export const metadata: Metadata = {
  title: "Agenda tu valoración gratuita",
  description:
    "Pide tu valoración gratuita en la Clínica Estética Ana Cure: presencial en Aguachica o El Banco, o virtual. Elige el procedimiento y te respondemos por WhatsApp.",
  alternates: { canonical: "/valoracion" },
};

export default function ValoracionPage() {
  const fecha = fechaJornada();
  return (
    <main data-tema="claro" className="bg-perla pb-seccion pt-28 sm:pt-32 lg:pt-40">
      <Contenedor>
        <div className="max-w-3xl">
          <h1 className="text-titulo font-light text-tinta">Agenda tu valoración.</h1>
          <p className="mt-5 max-w-xl text-entrada text-carbon">
            Es gratuita. Cuéntanos qué te interesa y cómo prefieres tu cita, y seguimos la conversación por WhatsApp.
          </p>
        </div>
        <div className="mt-12 lg:mt-16">
          <Suspense fallback={<FormularioValoracion fecha={fecha} />}>
            <FormularioDesdeEnlace fecha={fecha} />
          </Suspense>
        </div>
      </Contenedor>
    </main>
  );
}
