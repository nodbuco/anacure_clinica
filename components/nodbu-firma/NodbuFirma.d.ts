import type { CSSProperties, ReactElement } from 'react';

export interface NodbuFirmaProps {
  /** Texto antes de la marca. Por defecto «Desarrollado por». */
  texto?: string;
  /** "en" muestra «Built by». */
  lang?: string;
  /**
   * Fuerza la variante del logo y el color del texto: "claro" (logo negro, texto negro),
   * "oscuro" (logo blanco, texto blanco) o "naranja" (logo negro con el apoyo blanco).
   * Por defecto se elige sola con el color del texto del pie.
   */
  fondo?: 'claro' | 'oscuro' | 'naranja';
  /** Logo de una tinta, la del texto del pie, sin naranja. */
  mono?: boolean;
  /** Sin el empujón periódico de la palanca. */
  quieto?: boolean;
  /** Añade rel="nofollow". */
  nofollow?: boolean;
  /** Tamaño del texto: 14 o "0.875rem". Por defecto 13px. El logotipo mide 6,8 veces esto, con 96 px de mínimo. */
  tamano?: number | string;
  className?: string;
  style?: CSSProperties;
}

declare function NodbuFirma(props: NodbuFirmaProps): ReactElement;
export default NodbuFirma;
