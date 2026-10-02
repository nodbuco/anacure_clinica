"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Registra la visita a la página de un procedimiento (una vez por carga). */
export function VistaProcedimiento({ slug }: { slug: string }) {
  useEffect(() => {
    track("vista_procedimiento", { procedimiento: slug });
  }, [slug]);
  return null;
}
