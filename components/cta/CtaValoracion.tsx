"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { clasesBoton, type VarianteBoton } from "@/components/ui/Boton";
import { track } from "@/lib/analytics";

interface Props {
  /** Dónde está el botón, para la analítica (hero, cabecera, cierre…). */
  ubicacion: string;
  /** Procedimiento que llega ya elegido al formulario. */
  procedimiento?: string;
  variante?: VarianteBoton;
  tamano?: "md" | "lg";
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  /** Enlace de texto, sin forma de botón (el oro queda para el llamado principal). */
  simple?: boolean;
}

/** Lleva al formulario de valoración. Es el llamado principal de todo el sitio. */
export function CtaValoracion({
  ubicacion,
  procedimiento,
  variante = "estampado",
  tamano = "lg",
  className,
  children = "Agenda tu valoración gratuita",
  onClick,
  simple,
}: Props) {
  const href = procedimiento ? `/valoracion?procedimiento=${procedimiento}` : "/valoracion";
  return (
    <Link
      href={href}
      className={simple ? className : clasesBoton(variante, tamano, className)}
      onClick={() => {
        track("cta_valoracion", { ubicacion, procedimiento });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
