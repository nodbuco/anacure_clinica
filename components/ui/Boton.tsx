import Link from "next/link";
import type { ReactNode } from "react";
import { IconoFlecha } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export type VarianteBoton = "estampado" | "linea";

const VARIANTES: Record<VarianteBoton, string> = {
  /* Principal: estampado en el oro del logo, rótulo en tinta (8:1) */
  estampado: "estampado",
  /* Secundario: filete del color del texto (blanco sobre carbón, tinta sobre algodón) */
  linea: "boton-linea",
};

export function clasesBoton(variante: VarianteBoton = "estampado", tamano: "md" | "lg" = "lg", className?: string) {
  return cn("boton", VARIANTES[variante], tamano === "md" && "boton-chico", className);
}

interface BotonProps {
  href: string;
  children: ReactNode;
  variante?: VarianteBoton;
  tamano?: "md" | "lg";
  className?: string;
  externo?: boolean;
}

/** Botón que navega. Los externos (WhatsApp, Maps) abren en otra pestaña. */
export function Boton({ href, children, variante, tamano, className, externo }: BotonProps) {
  const clases = clasesBoton(variante, tamano, className);
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clases}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={clases}>
      {children}
    </Link>
  );
}

interface EnlaceProps {
  href: string;
  children: ReactNode;
  className?: string;
  externo?: boolean;
}

/** Enlace secundario: rótulo subrayado con flecha larga. Toma el color del texto que lo rodea. */
export function Enlace({ href, children, className, externo }: EnlaceProps) {
  const contenido = (
    <>
      {children}
      <IconoFlecha className="h-3.5 w-4.5 shrink-0" />
    </>
  );
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn("enlace", className)}>
        {contenido}
      </a>
    );
  }
  return (
    <Link href={href} className={cn("enlace", className)}>
      {contenido}
    </Link>
  );
}
