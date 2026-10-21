"use client";

import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { TarjetaValoracion } from "@/components/inicio/TarjetaValoracion";
import { Contenedor } from "@/components/ui/Contenedor";
import { IconoPausa, IconoReproducir } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";
import { CON_MOVIMIENTO, gsap, useGSAP } from "@/lib/gsap";

type Fuente = "movil" | "escritorio";

const VIDEO: Record<Fuente, { av1: string; h264: string }> = {
  movil: { av1: "/media/hero/quirofano-movil-av1.mp4", h264: "/media/hero/quirofano-movil.mp4" },
  escritorio: { av1: "/media/hero/quirofano-1280-av1.mp4", h264: "/media/hero/quirofano-1280.mp4" },
};

/** El bucle abre y cierra con un fundido; el póster es el cuadro de este segundo. */
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
 * Portada: el quirófano real en video, el titular abajo a la izquierda con el único botón,
 * y la tarjeta de valoración a la derecha (en el celular, asomando bajo el video).
 * Al bajar, el video se aleja un poco y la tarjeta se endereza.
 */
export function Hero({ sello }: { sello: { semana: string; dia: string; mes: string } | null }) {
  const raiz = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const fuente = useSyncExternalStore(suscribirFuente, fuenteActual, () => null);
  const [listo, setListo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const pausadoPorUsuario = useRef(false);

  // Fuera de pantalla el video descansa; vuelve a correr al regresar, salvo que la persona lo pausara.
  useEffect(() => {
    const v = video.current;
    const seccion = raiz.current;
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
      mm.add({ movimiento: CON_MOVIMIENTO, escritorio: "(min-width: 64rem)" }, (contexto) => {
        if (!contexto.conditions?.movimiento) return;
        const linea = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom top", scrub: 0.4 },
        });
        linea.to("[data-portada-media]", { scale: 1.08, yPercent: 8 }, 0).to("[data-portada-texto]", { y: -60 }, 0);
        if (contexto.conditions.escritorio) linea.fromTo("[data-portada-tarjeta]", { rotation: -3 }, { rotation: 0, y: -90 }, 0);
      });
      return () => mm.revert();
    },
    { scope: raiz },
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
    <section ref={raiz} id="inicio" aria-labelledby="portada-titulo" className="relative overflow-x-clip bg-carbon">
      <div className="relative h-[calc(100svh-4.5rem)] min-h-[36rem] overflow-hidden bg-noche lg:h-[calc(100svh-3.25rem)] lg:min-h-[40rem]">
        <div data-portada-media className="absolute inset-0 will-change-transform">
          <div className="portada-video absolute inset-0">
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
                className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-1000 ease-papel data-[listo]:opacity-100"
              >
                <source src={VIDEO[fuente].av1} type='video/mp4; codecs="av01.0.05M.08"' />
                <source src={VIDEO[fuente].h264} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
        {/* Velo: oscurece donde vive el texto (abajo en el celular, a la izquierda en el PC) y deja ver las lámparas */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(33_31_31/0.96)_0%,rgb(33_31_31/0.78)_34%,rgb(33_31_31/0.25)_68%,rgb(33_31_31/0.5)_100%)] lg:bg-[linear-gradient(90deg,rgb(33_31_31/0.9)_0%,rgb(33_31_31/0.66)_38%,rgb(33_31_31/0.14)_70%,rgb(33_31_31/0.32)_100%),linear-gradient(to_top,rgb(33_31_31/0.6),transparent_45%)] lg:[background-blend-mode:normal]"
        />

        <Contenedor className="relative z-10 flex h-full flex-col justify-end pb-16 pt-24 lg:pb-[clamp(3.5rem,9vh,6rem)]">
          <div data-portada-texto className="max-w-[40rem]">
            <h1 id="portada-titulo" className="portada-texto text-portada font-light text-blanco" style={{ "--retraso": "0.1s" } as CSSProperties}>
              Cirugía plástica
              <span className="block text-oro-claro">en Aguachica</span>
            </h1>
            <p className="portada-texto mt-6 max-w-[27rem] text-entrada text-perla" style={{ "--retraso": "0.3s" } as CSSProperties}>
              Quirófano propio y tu recuperación en el mismo edificio.
            </p>
            {/* data-cta-portada: mientras este botón se ve, la cabecera guarda el suyo (un solo llamado a la vista) */}
            <div data-cta-portada className="portada-texto mt-9" style={{ "--retraso": "0.45s" } as CSSProperties}>
              <CtaValoracion ubicacion="hero" className="w-full sm:w-auto" />
            </div>
          </div>
        </Contenedor>

        {fuente && (
          <button
            type="button"
            onClick={alternar}
            aria-label={pausado ? "Reproducir el video de fondo" : "Pausar el video de fondo"}
            className="absolute right-4 top-[4.5rem] z-20 inline-flex size-11 items-center justify-center rounded-[2px] border border-blanco/30 bg-noche/55 text-blanco transition-colors hover:border-blanco/70 sm:right-6 lg:right-8 lg:top-20"
          >
            {pausado ? <IconoReproducir className="size-4" /> : <IconoPausa className="size-4" />}
          </button>
        )}
      </div>

      {/* La tarjeta: en el celular asoma bajo el video; en el PC se apoya abajo a la derecha */}
      <div className="relative z-10 -mt-10 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-[clamp(3.5rem,9vh,6rem)] lg:mt-0">
        <Contenedor className="flex justify-end">
          <div data-portada-tarjeta className="w-[min(100%,24rem)] -rotate-2 sm:w-[26rem] lg:pointer-events-auto lg:w-[27rem] lg:rotate-0">
            <TarjetaValoracion sello={sello} className="portada-tarjeta" />
          </div>
        </Contenedor>
      </div>
    </section>
  );
}
