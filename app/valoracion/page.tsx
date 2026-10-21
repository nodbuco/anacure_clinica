import type { Metadata } from "next";
import { Suspense } from "react";
import { Contenedor } from "@/components/ui/Contenedor";
import { FormularioDesdeEnlace } from "@/components/valoracion/FormularioDesdeEnlace";
import { FormularioValoracion } from "@/components/valoracion/FormularioValoracion";
import { fechaJornada } from "@/data/jornada";

export const metadata: Metadata = {
  title: "Agenda tu valoración gratuita",
  description:
    "Pide tu valoración gratuita en la Clínica Estética Ana Cure: presencial en Aguachica o virtual. Elige el procedimiento y te respondemos por WhatsApp.",
  alternates: { canonical: "/valoracion" },
};

export default function ValoracionPage() {
  const fecha = fechaJornada();
  return (
    <main className="bg-carbon pb-seccion pt-24 sm:pt-28 lg:pt-36">
      <Contenedor>
        <h1 className="max-w-[14ch] text-titulo font-light">Agenda tu valoración gratuita</h1>
        <p className="mt-4 max-w-[30rem] text-entrada text-perla">Llena la tarjeta y seguimos la conversación por WhatsApp.</p>
        <div className="mt-10 lg:mt-14">
          <Suspense fallback={<FormularioValoracion fecha={fecha} />}>
            <FormularioDesdeEnlace fecha={fecha} />
          </Suspense>
        </div>
      </Contenedor>
    </main>
  );
}
