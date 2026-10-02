import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentPropsWithoutRef<"div"> & { ancho?: "sitio" | "texto" };

/** Ancho del sitio con márgenes laterales de 16 px en el celular. */
export function Contenedor({ ancho = "sitio", className, ...resto }: Props) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", ancho === "sitio" ? "max-w-sitio" : "max-w-texto", className)} {...resto} />;
}
