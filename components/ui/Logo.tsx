import { cn } from "@/lib/cn";

type Version = "horizontal" | "vertical";
type Fondo = "claro" | "oscuro";

/* Proporciones de los SVG del kit (viewBox), para reservar el espacio y evitar saltos. */
const DIMENSIONES: Record<Version, { w: number; h: number }> = {
  horizontal: { w: 875, h: 213 },
  vertical: { w: 626, h: 406 },
};

const ARCHIVOS: Record<Version, Record<Fondo, string>> = {
  horizontal: { claro: "/brand/logo-horizontal-color.svg", oscuro: "/brand/logo-horizontal-oscuro.svg" },
  vertical: { claro: "/brand/logo-vertical-color.svg", oscuro: "/brand/logo-vertical-oscuro.svg" },
};

interface LogoProps {
  version?: Version;
  fondo?: Fondo;
  /** Define la altura (p. ej. "h-8"); el ancho sale solo. */
  className?: string;
  /** El logo ya está nombrado por un enlace o un texto vecino. */
  decorativo?: boolean;
  /** Fuera de la primera vista (pie de página): se descarga al acercarse. */
  diferido?: boolean;
}

/**
 * Logos del kit sin modificar (nunca se reconstruye el nombre con una fuente).
 * Se sirven como <img> SVG: el degradado dorado del kit se conserva tal cual.
 */
export function Logo({ version = "horizontal", fondo = "claro", className = "h-8", decorativo, diferido }: LogoProps) {
  const { w, h } = DIMENSIONES[version];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG vectorial del kit: next/image no aporta nada aquí
    <img
      src={ARCHIVOS[version][fondo]}
      alt={decorativo ? "" : "Clínica Estética Ana Cure"}
      width={w}
      height={h}
      className={cn("w-auto", className)}
      decoding="async"
      loading={diferido ? "lazy" : undefined}
    />
  );
}
