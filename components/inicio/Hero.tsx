"use client";

import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { EnlaceFlecha } from "@/components/ui/Boton";
import { IconoPausa, IconoReproducir } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";

type Fuente = "movil" | "escritorio";

const VIDEO: Record<Fuente, { av1: string; h264: string }> = {
  movil: { av1: "/media/hero/quirofano-movil-av1.mp4", h264: "/media/hero/quirofano-movil.mp4" },
  escritorio: { av1: "/media/hero/quirofano-1280-av1.mp4", h264: "/media/hero/quirofano-1280.mp4" },
};

/** El bucle abre y cierra con un fundido a grafito; el póster es el cuadro de este segundo. */
const INICIO_VIDEO = 1;

const SIN_MOVIMIENTO = "(prefers-reduced-motion: reduce)";
const CELULAR = "(max-width: 47.99rem)";

/** El video solo se pide si hay movimiento permitido y no hay ahorro de datos; en el celular, el recorte vertical. */
function fuenteActual(): Fuente | null {
  const conexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (matchMedia(SIN_MOVIMIENTO).matches || conexion?.saveData) return null;
  return matchMedia(CELULAR).matches ? "movil" : "escritorio";
}

function suscribirFuente(avisar: () => void) {
  const consultas = [matchMedia(SIN_MOVIMIENTO), matchMedia(CELULAR)];
  consultas.forEach((c) => c.addEventListener("change", avisar));
  return () => consultas.forEach((c) => c.removeEventListener("change", avisar));
}

/**
 * Primera vista: las lámparas del quirófano real, graduadas en grafito y oro.
 * Al bajar, el video se recoge en un panel de esquinas curvas y «la lámpara se apaga».
 * Sin movimiento (prefers-reduced-motion) o con ahorro de datos, queda el póster quieto.
 */
export function Hero() {
  const pista = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const fuente = useSyncExternalStore(suscribirFuente, fuenteActual, () => null);
  const [listo, setListo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const pausadoPorUsuario = useRef(false);

  // Fuera de pantalla el video descansa; vuelve a correr al regresar, salvo que la persona lo pausara.
  useEffect(() => {
    const v = video.current;
    const seccion = pista.current;
    if (!v || !seccion) return;
    const observador = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting && !pausadoPorUsuario.current) v.play().catch(() => undefined);
      else v.pause();
    });
    observador.observe(seccion);
    return () => observador.disconnect();
  }, [fuente]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { movimiento: CON_MOVIMIENTO, celular: CELULAR },
        (contexto) => {
          if (!contexto.conditions?.movimiento) return;
          const celular = contexto.conditions.celular;
          const linea = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: pista.current, start: "top top", end: "bottom bottom", scrub: 0.5 },
          });
          linea
            .to("[data-hero-texto]", { yPercent: -14, opacity: 0, filter: "blur(10px)", duration: 0.42 }, 0)
            .fromTo(
              "[data-hero-marco]",
              { clipPath: "inset(0% 0% 0% 0% round 0px)" },
              { clipPath: celular ? "inset(12% 4% 12% 4% round 28px)" : "inset(9% 4.5% 9% 4.5% round 36px)", duration: 0.75 },
              0.08,
            )
            .fromTo("[data-hero-escala]", { scale: 1.12 }, { scale: 1, duration: 0.83 }, 0)
            .to("[data-hero-velo]", { opacity: 0.82, duration: 0.45 }, 0.55)
            .fromTo("[data-hero-cierre]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3 }, 0.68);
        },
      );
      return () => mm.revert();
    },
    { scope: pista },
  );

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      pausadoPorUsuario.current = false;
      v.play().catch(() => undefined);
      setPausado(false);
    } else {
      pausadoPorUsuario.current = true;
      v.pause();
      setPausado(true);
      track("video_pausado");
    }
  };

  return (
    <section
      ref={pista}
      id="inicio"
      data-tema="oscuro"
      aria-labelledby="hero-titulo"
      className="tema-oscuro relative h-svh bg-noche motion-safe:h-[190svh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div data-hero-marco className="absolute inset-0 overflow-hidden will-change-[clip-path]">
          <div data-hero-escala className="absolute inset-0 will-change-transform">
            <div className="hero-lampara absolute inset-0">
              <picture>
                <source media="(max-width: 47.99rem)" srcSet="/media/hero/quirofano-poster-movil.jpg" />
                <img
                  src="/media/hero/quirofano-poster.jpg"
                  alt=""
                  width={1280}
                  height={720}
                  fetchPriority="high"
                  className="absolute inset-0 size-full object-cover"
                />
              </picture>
              {fuente && (
                <video
                  key={fuente}
                  ref={video}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="auto"
                  aria-hidden="true"
                  tabIndex={-1}
                  onLoadedMetadata={(e) => {
                    e.currentTarget.currentTime = INICIO_VIDEO;
                  }}
                  onPlaying={() => setListo(true)}
                  data-listo={listo || undefined}
                  className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-1000 ease-luz data-[listo]:opacity-100"
                >
                  <source src={VIDEO[fuente].av1} type='video/mp4; codecs="av01.0.05M.08"' />
                  <source src={VIDEO[fuente].h264} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
          {/* Velo: oscurece los bordes y el centro, donde vive el titular, sin apagar las lámparas */}
          <div
            data-hero-velo
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_48%,rgb(20_19_19/0.7),rgb(20_19_19/0.28)_72%),linear-gradient(to_bottom,rgb(20_19_19/0.55),rgb(20_19_19/0.1)_30%,rgb(20_19_19/0.25)_70%,rgb(20_19_19/0.9))] opacity-75"
          />
        </div>

        <div
          data-hero-texto
          className="relative z-10 mx-auto flex h-full max-w-sitio flex-col items-center justify-center px-4 pt-14 text-center sm:px-6"
        >
          <h1 id="hero-titulo" className="hero-enfocar text-titan font-light text-perla">
            Tu cirugía, <span className="whitespace-nowrap">a la luz.</span>
          </h1>
          <p
            className="hero-aparecer mt-6 max-w-[36rem] text-balance text-entrada text-perla/85"
            style={{ "--retraso": "0.55s" } as CSSProperties}
          >
            Quirófano propio, cirujanos plásticos y tu recuperación en el mismo edificio. La valoración es gratuita.
          </p>
          <div
            className="hero-aparecer mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-7"
            style={{ "--retraso": "0.75s" } as CSSProperties}
          >
            <CtaValoracion ubicacion="hero" tamano="lg" />
            <EnlaceFlecha href="/#procedimientos" tono="claro" className="text-[1.0625rem]">
              Ver procedimientos
            </EnlaceFlecha>
          </div>
        </div>

        {/* Al recogerse el video, una frase sobre el panel apagado */}
        <p
          data-hero-cierre
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-8 text-center text-subtitulo font-light text-perla opacity-0"
        >
          Este es nuestro quirófano.
        </p>

        {fuente && (
          <button
            type="button"
            onClick={alternar}
            aria-label={pausado ? "Reproducir el video de fondo" : "Pausar el video de fondo"}
            className="pulsable absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-20 inline-flex size-11 items-center justify-center rounded-pill border border-perla/20 bg-noche/45 text-perla backdrop-blur-md hover:bg-noche/70 sm:right-6"
          >
            {pausado ? <IconoReproducir className="size-4" /> : <IconoPausa className="size-4" />}
          </button>
        )}
      </div>
    </section>
  );
}
