"use client";

import { useSearchParams } from "next/navigation";
import { FormularioValoracion } from "@/components/valoracion/FormularioValoracion";
import { procedimientoPorSlug } from "@/data/procedimientos";

/**
 * Si se llega desde la página de un procedimiento (?procedimiento=…), ese procedimiento queda elegido.
 * Lee la URL en el navegador; en el HTML estático va el mismo formulario sin elegir (Suspense), así
 * que la página no salta al cargar.
 */
export function FormularioDesdeEnlace({ fecha }: { fecha: string | null }) {
  const pedido = useSearchParams().get("procedimiento");
  const inicial = pedido && procedimientoPorSlug(pedido) ? pedido : "";
  return <FormularioValoracion key={inicial} fecha={fecha} procedimientoInicial={inicial} />;
}
