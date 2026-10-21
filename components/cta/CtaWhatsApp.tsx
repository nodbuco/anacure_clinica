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
  /** Enlace de texto, sin forma de botón: el llamado secundario junto al principal. */
  simple?: boolean;
}

/** Abre el chat de la clínica. En la tinta de la papelería: aquí el verde de WhatsApp sobraría. */
export function CtaWhatsApp({ ubicacion, variante = "linea", tamano = "lg", className, children = "WhatsApp", simple }: Props) {
  return (
    <a
      href={urlWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      className={simple ? className : clasesBoton(variante, tamano, className)}
      onClick={() => track("cta_whatsapp", { ubicacion })}
    >
      {!simple && <IconoWhatsApp className="size-[1.15em]" />}
      {children}
    </a>
  );
}
