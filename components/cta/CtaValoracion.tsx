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
}

/** Lleva al formulario de valoración. Es el llamado principal de todo el sitio. */
export function CtaValoracion({ ubicacion, procedimiento, variante = "oro", tamano = "md", className, children = "Agenda tu valoración", onClick }: Props) {
  const href = procedimiento ? `/valoracion?procedimiento=${procedimiento}` : "/valoracion";
  return (
    <Link
      href={href}
      className={clasesBoton(variante, tamano, className)}
      onClick={() => {
        track("cta_valoracion", { ubicacion, procedimiento });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
