import Link from "next/link";
import type { ReactNode } from "react";
import { IconoChevron } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export type VarianteBoton = "oro" | "contorno-claro" | "contorno-oscuro";

const VARIANTES: Record<VarianteBoton, string> = {
  /* Principal: el pan de oro del logo, texto grafito (8,6:1) */
  oro: "oro-pan text-noche",
  "contorno-claro": "border border-perla/30 text-perla hover:border-perla/70 hover:bg-perla/5",
  "contorno-oscuro": "border border-tinta/20 text-tinta hover:border-tinta/60",
};

const TAMANOS = {
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-13 px-7 text-base",
} as const;

export function clasesBoton(variante: VarianteBoton = "oro", tamano: keyof typeof TAMANOS = "md", className?: string) {
  return cn(
    "pulsable inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium tracking-[-0.01em]",
    VARIANTES[variante],
    TAMANOS[tamano],
    className,
  );
}

interface BotonProps {
  href: string;
  children: ReactNode;
  variante?: VarianteBoton;
  tamano?: keyof typeof TAMANOS;
  className?: string;
  externo?: boolean;
}

/** Botón píldora que navega. Los externos (WhatsApp, Maps) abren en otra pestaña. */
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

interface EnlaceFlechaProps {
  href: string;
  children: ReactNode;
  tono?: "claro" | "oscuro";
  className?: string;
  externo?: boolean;
}

/** Enlace de texto con chevron, al estilo de las páginas de producto («Ver más ›»). */
export function EnlaceFlecha({ href, children, tono = "oscuro", className, externo }: EnlaceFlechaProps) {
  const clases = cn(
    "group inline-flex items-center gap-1 rounded-sm font-medium transition-colors duration-200 hover:underline",
    tono === "claro" ? "text-oro-claro" : "text-oro-texto",
    className,
  );
  const contenido = (
    <>
      {children}
      <IconoChevron className="size-[1.05em] translate-y-px transition-transform duration-300 ease-luz group-hover:translate-x-0.5" />
    </>
  );
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clases}>
        {contenido}
      </a>
    );
  }
  return (
    <Link href={href} className={clases}>
      {contenido}
    </Link>
  );
}
