import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
  Láminas de marcaje: el esquema que el cirujano dibuja antes de operar. Figura en grafito fino y,
  encima, el marcaje en oro (zonas en línea punteada, flechas y signos en línea llena).
  Dibujadas a mano para el sitio (no son fotos de pacientes). Cuerpo y busto se arman con su mitad
  derecha y el espejo de esa mitad; el rostro va por detalles (ojo, nariz, oreja), cada uno en su vista.
*/

type Figura = "frente" | "espalda" | "busto" | "ojo" | "nariz" | "oreja";

interface Marca {
  /** Trazo SVG del marcaje, en las coordenadas de la figura. */
  d: string;
  /** punteada: zona a tratar · llena: flecha o signo · corte: incisión. */
  tipo: "punteada" | "llena" | "corte";
}

interface Ficha {
  figura: Figura;
  /** Encuadre de la figura (viewBox). */
  encuadre: string;
  marcas: Marca[];
  /** Lo que muestra la lámina, para quien no la ve. */
  descripcion: string;
}

/** Elipse como trazo SVG (para que el marcaje se dibuje con la misma técnica que las demás líneas). */
function elipse(cx: number, cy: number, rx: number, ry: number): string {
  return `M${cx - rx} ${cy} a${rx} ${ry} 0 1 0 ${rx * 2} 0 a${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
}

const ESPEJO = "translate(300 0) scale(-1 1)";

export const LAMINAS: Record<string, Ficha> = {
  liposuccion: {
    figura: "frente",
    encuadre: "52 20 196 342",
    descripcion: "Esquema del marcaje de la liposucción: zonas en abdomen y flancos.",
    marcas: [
      { d: elipse(150, 252, 40, 25), tipo: "punteada" },
      { d: elipse(150, 252, 24, 13), tipo: "punteada" },
      { d: elipse(150, 186, 25, 11), tipo: "punteada" },
      { d: "M193 216 C188 226 190 248 199 258 C206 252 208 230 203 218 C200 213 196 212 193 216 Z", tipo: "punteada" },
      { d: "M107 216 C112 226 110 248 101 258 C94 252 92 230 97 218 C100 213 104 212 107 216 Z", tipo: "punteada" },
    ],
  },
  "transferencia-glutea": {
    figura: "espalda",
    encuadre: "52 20 196 350",
    descripcion: "Esquema del marcaje de la transferencia glútea: se retira grasa de la espalda baja y se injerta en los glúteos.",
    marcas: [
      { d: "M118 222 L150 258 L182 222", tipo: "punteada" },
      { d: "M131 222 L150 244 L169 222", tipo: "punteada" },
      { d: "M162 270 C186 266 212 280 214 304 C200 312 176 314 160 308 C156 294 156 280 162 270 Z", tipo: "punteada" },
      { d: "M138 270 C114 266 88 280 86 304 C100 312 124 314 140 308 C144 294 144 280 138 270 Z", tipo: "punteada" },
      { d: "M182 290 h12 M188 284 v12 M106 290 h12 M112 284 v12", tipo: "llena" },
    ],
  },
  "aumento-mamario": {
    figura: "busto",
    encuadre: "62 54 176 124",
    descripcion: "Esquema del aumento mamario: el nuevo contorno de cada mama y la incisión bajo el pliegue.",
    marcas: [
      { d: "M157 112 C155 146 170 166 190 166 C210 166 224 152 228 130", tipo: "punteada" },
      { d: "M143 112 C145 146 130 166 110 166 C90 166 76 152 72 130", tipo: "punteada" },
      { d: "M181 164 C188 166 196 166 203 163", tipo: "corte" },
      { d: "M119 164 C112 166 104 166 97 163", tipo: "corte" },
    ],
  },
  "pexia-mamaria": {
    figura: "busto",
    encuadre: "62 54 176 124",
    descripcion: "Esquema de la pexia mamaria: la nueva posición de la areola, más alta, y la línea vertical del levantamiento.",
    marcas: [
      { d: elipse(189, 126, 8, 8), tipo: "punteada" },
      { d: elipse(111, 126, 8, 8), tipo: "punteada" },
      { d: "M189 134 L189 157 M111 134 L111 157", tipo: "punteada" },
      { d: "M207 152 L207 128 M203 132 L207 127 L211 132 M93 152 L93 128 M89 132 L93 127 L97 132", tipo: "llena" },
    ],
  },
  alectomia: {
    figura: "nariz",
    encuadre: "66 8 168 196",
    descripcion: "Esquema de la alectomía: la cuña que se retira en la base de cada ala de la nariz y el sentido en que se afina.",
    marcas: [
      { d: "M186 158 C194 160 197 168 192 175 C186 175 181 170 181 164 Z", tipo: "punteada" },
      { d: "M114 158 C106 160 103 168 108 175 C114 175 119 170 119 164 Z", tipo: "punteada" },
      { d: "M226 168 L208 168 M213 163 L208 168 L213 173 M74 168 L92 168 M87 163 L92 168 L87 173", tipo: "llena" },
    ],
  },
  blefaroplastia: {
    figura: "ojo",
    encuadre: "48 30 218 130",
    descripcion: "Esquema de la blefaroplastia superior: la piel que se retira del párpado, entre el pliegue y la ceja.",
    marcas: [{ d: "M84 102 C118 66 196 62 232 94 C192 72 118 76 84 102 Z", tipo: "punteada" }],
  },
  "armonizacion-de-orejas": {
    figura: "oreja",
    encuadre: "50 18 200 280",
    descripcion: "Esquema de la armonización de orejas: el borde de la oreja más cerca de la cabeza y el pliegue que se marca.",
    marcas: [
      { d: "M98 96 C94 66 114 46 140 46 C174 46 192 80 190 118 C188 156 172 184 160 208", tipo: "punteada" },
      { d: "M128 70 C162 64 184 92 182 128", tipo: "punteada" },
      { d: "M232 120 C226 110 218 106 208 106 M212 101 L207 106 L212 111", tipo: "llena" },
    ],
  },
};

/* ---------- Figuras ---------- */

function Simetrica({ children }: { children: ReactNode }) {
  return (
    <>
      <g>{children}</g>
      <g transform={ESPEJO}>{children}</g>
    </>
  );
}

/** Mitad derecha del torso, del cuello a la cintura; cada figura sigue el trazo a su manera. */
const TORSO = "M162 26 C162 36 163 44 166 50 C176 57 194 61 212 65 C226 68 234 76 235 88 C236 97 233 104 228 109 C226 126 222 146 216 166 C211 182 207 194 206 205";

function Frente() {
  return (
    <>
      <Simetrica>
        <path className="lamina-trazo" d={`${TORSO} C205 222 214 244 220 262 C225 276 226 290 224 304 C222 318 216 330 210 340 C190 352 170 356 150 356`} />
        <path className="lamina-trazo lamina-fino" d="M160 60 C168 63 180 64 192 63" />
        <path className="lamina-trazo lamina-fino" d="M198 302 C190 316 178 328 164 334" />
        <path className="lamina-trazo" d="M157 124 C157 146 171 158 189 158 C205 158 217 148 222 134" />
        <circle className="lamina-trazo lamina-fino" cx="189" cy="140" r="3.2" />
      </Simetrica>
      <ellipse className="lamina-trazo lamina-fino" cx="150" cy="214" rx="1.6" ry="3.2" />
    </>
  );
}

function Espalda() {
  return (
    <>
      <Simetrica>
        <path className="lamina-trazo" d={`${TORSO} C205 222 214 244 221 264 C227 280 229 296 226 312 C223 330 218 346 214 362`} />
        {/* Corte del muslo y entrepierna */}
        <path className="lamina-trazo" d="M214 362 C196 366 176 366 160 362 C158 348 156 336 152 326" />
        <path className="lamina-trazo lamina-tenue" d="M176 100 C186 100 196 108 197 122" />
        <path className="lamina-trazo lamina-fino" d="M156 252 c2 2 4 2 6 0" />
        {/* Pliegue bajo el glúteo */}
        <path className="lamina-trazo" d="M153 318 C166 326 190 328 210 318" />
      </Simetrica>
      <path className="lamina-trazo lamina-tenue" d="M150 66 C150 130 150 190 150 250" />
      <path className="lamina-trazo lamina-fino" d="M150 266 C150 284 150 302 151 318" />
      <path className="lamina-trazo lamina-fino" d="M148 326 C149 324 151 324 152 326" />
    </>
  );
}

function Busto() {
  return (
    <Simetrica>
      <path className="lamina-trazo" d={`${TORSO} C205 222 214 244 220 262`} />
      <path className="lamina-trazo lamina-fino" d="M160 60 C168 63 180 64 192 63" />
      <path className="lamina-trazo" d="M157 124 C157 146 171 158 189 158 C205 158 217 148 222 134" />
      <circle className="lamina-trazo lamina-fino" cx="189" cy="140" r="3.2" />
    </Simetrica>
  );
}

function Ojo({ recorte }: { recorte: string }) {
  return (
    <>
      <defs>
        <clipPath id={recorte}>
          <path d="M70 118 C102 92 176 86 232 108 C190 138 112 142 70 118 Z" />
        </clipPath>
      </defs>
      {/* Ceja */}
      <path className="lamina-trazo" d="M58 70 C96 46 168 38 214 46 C236 50 250 58 258 68" />
      <path className="lamina-trazo lamina-fino" d="M66 76 C104 56 168 50 212 56" />
      {/* Pliegue del párpado y abertura */}
      <path className="lamina-trazo lamina-fino" d="M82 106 C116 80 190 76 230 98" />
      <path className="lamina-trazo" d="M70 118 C102 92 176 86 232 108" />
      <path className="lamina-trazo" d="M70 118 C112 142 190 138 232 108" />
      <path className="lamina-trazo lamina-fino" d="M70 118 C76 112 84 111 90 116" />
      <g clipPath={`url(#${recorte})`}>
        <circle className="lamina-trazo" cx="152" cy="113" r="24" />
        <circle className="lamina-trazo lamina-tenue" cx="152" cy="113" r="15" />
        <circle className="lamina-punto" cx="152" cy="113" r="8.5" />
        <circle className="lamina-brillo" cx="146" cy="107" r="2.6" />
      </g>
      {/* Pestañas, apenas insinuadas, y surco inferior */}
      <path className="lamina-trazo lamina-tenue" d="M176 96 l4 -7 M190 99 l5 -6 M204 102 l6 -5 M217 105 l6 -3" />
      <path className="lamina-trazo lamina-tenue" d="M92 140 C130 154 188 150 222 128" />
    </>
  );
}

function Nariz() {
  return (
    <>
      <Simetrica>
        <path className="lamina-trazo lamina-tenue" d="M161 14 C162 52 164 86 167 112" />
        <path className="lamina-trazo" d="M176 128 C189 136 195 153 188 164 C184 170 177 171 171 168" />
        <path className="lamina-trazo lamina-fino" d="M158 166 C162 169 166 169 170 167" />
        <path className="lamina-trazo lamina-tenue" d="M196 126 C206 138 207 158 198 172" />
      </Simetrica>
      {/* Punta y labio superior */}
      <path className="lamina-trazo" d="M138 154 C141 164 159 164 162 154" />
      <path className="lamina-trazo lamina-tenue" d="M143 140 C147 136 153 136 157 140" />
      <path className="lamina-trazo lamina-tenue" d="M124 194 C137 188 145 188 150 192 C155 188 163 188 176 194" />
    </>
  );
}

function Oreja() {
  return (
    <>
      {/* Hélix hasta el lóbulo */}
      <path
        className="lamina-trazo"
        d="M98 96 C92 62 114 34 146 34 C186 34 210 70 208 116 C206 160 186 188 172 214 C162 232 164 254 150 270 C138 284 114 284 108 266 C104 254 106 242 112 232"
      />
      {/* Antihélix, raíz superior y concha */}
      <path className="lamina-trazo lamina-fino" d="M122 76 C152 62 182 82 186 114 C190 144 176 170 160 190 C152 200 146 208 144 218" />
      <path className="lamina-trazo lamina-tenue" d="M136 72 C150 86 160 100 164 114" />
      <path className="lamina-trazo lamina-fino" d="M118 130 C130 118 150 122 154 142 C158 164 144 182 126 186" />
      {/* Trago, antitrago y unión con la cabeza */}
      <path className="lamina-trazo" d="M108 148 C98 154 98 172 108 180" />
      <path className="lamina-trazo lamina-fino" d="M130 208 C138 202 148 206 150 214" />
      <path className="lamina-trazo lamina-tenue" d="M98 96 C100 112 104 128 108 148" />
      <path className="lamina-trazo lamina-tenue" d="M112 232 C110 214 108 196 108 180" />
    </>
  );
}

function Figura({ figura, recorte }: { figura: Figura; recorte: string }) {
  switch (figura) {
    case "frente":
      return <Frente />;
    case "espalda":
      return <Espalda />;
    case "busto":
      return <Busto />;
    case "ojo":
      return <Ojo recorte={recorte} />;
    case "nariz":
      return <Nariz />;
    case "oreja":
      return <Oreja />;
  }
}

interface Props {
  slug: string;
  className?: string;
  /** En una tarjeta que ya nombra el procedimiento, la lámina es decorativa. */
  decorativa?: boolean;
}

/**
 * La lámina de un procedimiento. El marcaje se dibuja trazo a trazo cuando entra en pantalla
 * (ver DibujarLaminas); sin JavaScript o sin movimiento queda dibujado desde el principio.
 */
export function Lamina({ slug, className, decorativa }: Props) {
  const ficha = LAMINAS[slug];
  if (!ficha) return null;
  const mascara = `lamina-${slug}`;
  return (
    <svg
      viewBox={ficha.encuadre}
      data-lamina
      className={cn("lamina block h-full w-full", className)}
      role={decorativa ? undefined : "img"}
      aria-hidden={decorativa || undefined}
      aria-label={decorativa ? undefined : ficha.descripcion}
    >
      <Figura figura={ficha.figura} recorte={`${mascara}-recorte`} />
      <defs>
        <mask id={mascara} maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="380">
          {ficha.marcas.map((m, i) => (
            <path key={i} d={m.d} pathLength={1} className="lamina-pluma" style={{ "--i": i } as CSSProperties} />
          ))}
        </mask>
      </defs>
      <g mask={`url(#${mascara})`}>
        {ficha.marcas.map((m, i) => (
          <path key={i} d={m.d} className={m.tipo === "punteada" ? "lamina-marca" : m.tipo === "corte" ? "lamina-corte" : "lamina-flecha"} />
        ))}
      </g>
    </svg>
  );
}
