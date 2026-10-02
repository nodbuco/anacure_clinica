"use client";

import type { ReactNode } from "react";
import { clasesBoton, type VarianteBoton } from "@/components/ui/Boton";
import { IconoWhatsApp } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";
import { urlWhatsApp } from "@/lib/whatsapp";

interface Props {
  ubicacion: string;
  variante?: VarianteBoton;
  tamano?: "md" | "lg";
  className?: string;
  children?: ReactNode;
}

/** Abre el chat de la clínica. En grafito y oro como todo el sitio: aquí el verde de WhatsApp sobraría. */
export function CtaWhatsApp({ ubicacion, variante = "contorno-oscuro", tamano = "md", className, children = "WhatsApp" }: Props) {
  return (
    <a
      href={urlWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      className={clasesBoton(variante, tamano, className)}
      onClick={() => track("cta_whatsapp", { ubicacion })}
    >
      <IconoWhatsApp className="size-[1.15em]" />
      {children}
    </a>
  );
}
