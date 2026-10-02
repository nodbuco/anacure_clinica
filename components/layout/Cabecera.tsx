"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CtaValoracion } from "@/components/cta/CtaValoracion";
import { CtaWhatsApp } from "@/components/cta/CtaWhatsApp";
import { Contenedor } from "@/components/ui/Contenedor";
import { IconoCerrar, IconoInstagram, IconoMenu } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { NAV_PRINCIPAL } from "@/data/navegacion";
import { SITE } from "@/data/site";

/** Alto de la barra (h-14). Debe coincidir con la clase del <Contenedor> de abajo. */
const ALTO = 56;

type Tema = "oscuro" | "claro";

/**
 * Barra local fija. Mira qué sección pasa por debajo de su línea media (secciones con
 * data-tema) y cambia de tono: grafito sobre las oscuras, perla sobre las claras.
 * El fondo translúcido vive en una capa propia: si el desenfoque estuviera en el <header>,
 * este se volvería el marco de la hoja «fixed» del menú móvil y la encerraría en 56 px.
 */
export function Cabecera() {
  const ruta = usePathname();
  // El inicio abre sobre el video (oscuro); las demás páginas abren claras. Luego manda la sección de debajo.
  const [tema, setTema] = useState<Tema>(ruta === "/" ? "oscuro" : "claro");
  const [desplazada, setDesplazada] = useState(false);
  // El menú guarda la ruta en la que se abrió: al navegar deja de coincidir y se cierra solo.
  const [abiertoEn, setAbiertoEn] = useState<string | null>(null);
  const abierto = abiertoEn === ruta;
  const botonMenu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const secciones = [...document.querySelectorAll<HTMLElement>("[data-tema]")].filter((s) => !s.closest("header"));
    let observador: IntersectionObserver | null = null;
    const vigilar = () => {
      observador?.disconnect();
      const medio = Math.round(ALTO / 2);
      observador = new IntersectionObserver(
        (entradas) => {
          const visible = entradas.find((e) => e.isIntersecting);
          if (visible) setTema((visible.target as HTMLElement).dataset.tema === "claro" ? "claro" : "oscuro");
        },
        { rootMargin: `-${medio}px 0px -${Math.max(0, window.innerHeight - medio - 1)}px 0px` },
      );
      secciones.forEach((s) => observador?.observe(s));
    };
    vigilar();

    let pendiente = 0;
    const alDesplazar = () => {
      cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(() => setDesplazada(window.scrollY > 8));
    };
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", vigilar);
    return () => {
      observador?.disconnect();
      cancelAnimationFrame(pendiente);
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", vigilar);
    };
  }, [ruta]);

  // Menú abierto: sin scroll de fondo, el resto de la página inerte y Escape para cerrar.
  useEffect(() => {
    if (!abierto) return;
    const raiz = document.documentElement;
    const fondo = [document.getElementById("contenido"), document.getElementById("pie")].filter(Boolean) as HTMLElement[];
    raiz.style.overflow = "hidden";
    fondo.forEach((el) => (el.inert = true));
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbiertoEn(null);
        botonMenu.current?.focus();
      }
    };
    window.addEventListener("keydown", alTeclear);
    return () => {
      raiz.style.overflow = "";
      fondo.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", alTeclear);
    };
  }, [abierto]);

  const temaVisible: Tema = abierto ? "oscuro" : tema;

  return (
    <header
      data-tema={temaVisible}
      data-desplazada={desplazada || abierto || undefined}
      className="group/cab fixed inset-x-0 top-0 z-50"
    >
      <div aria-hidden="true" className="cabecera-fondo absolute inset-0 -z-10 border-b backdrop-blur-xl backdrop-saturate-150" />
      <a
        href="#contenido"
        className="sr-only-focusable fixed left-4 top-3 z-[60] rounded-pill bg-oro px-4 py-2 text-sm font-medium text-noche"
      >
        Ir al contenido
      </a>

      <Contenedor className="flex h-14 items-center justify-between gap-6">
        <Link href="/" aria-label="Clínica Estética Ana Cure, ir al inicio" className="relative block h-8 shrink-0 rounded-sm lg:h-9">
          <Logo fondo="oscuro" decorativo className="cabecera-logo cabecera-logo-oscuro h-8 lg:h-9" />
          <Logo fondo="claro" decorativo className="cabecera-logo cabecera-logo-claro absolute inset-0 h-8 lg:h-9" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV_PRINCIPAL.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="rounded-sm text-[0.82rem] tracking-[0.005em] text-perla/75 transition-colors duration-200 hover:text-perla group-data-[tema=claro]/cab:text-tinta/70 group-data-[tema=claro]/cab:hover:text-tinta"
            >
              {e.etiqueta}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaValoracion ubicacion="cabecera" className="min-h-9 px-4 text-[0.82rem]">
            <span className="sm:hidden">Agendar</span>
            <span className="hidden sm:inline">Agenda tu valoración</span>
          </CtaValoracion>
          <button
            ref={botonMenu}
            type="button"
            onClick={() => setAbiertoEn(abierto ? null : ruta)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            className="pulsable -mr-2 inline-flex size-11 items-center justify-center rounded-pill text-perla group-data-[tema=claro]/cab:text-tinta lg:hidden"
          >
            {abierto ? <IconoCerrar className="size-6" /> : <IconoMenu className="size-6" />}
          </button>
        </div>
      </Contenedor>

      <div
        id="menu-movil"
        data-abierto={abierto || undefined}
        className="menu-hoja tema-oscuro fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-noche text-perla lg:hidden"
      >
        <Contenedor className="flex min-h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
          <nav aria-label="Principal (celular)">
            <ul>
              {NAV_PRINCIPAL.map((e, i) => (
                <li key={e.href} className="menu-item border-b border-humo" style={{ "--i": i } as CSSProperties}>
                  <Link href={e.href} onClick={() => setAbiertoEn(null)} className="block py-4 text-subtitulo font-light">
                    {e.etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-item mt-8 grid gap-3" style={{ "--i": NAV_PRINCIPAL.length } as CSSProperties}>
            <CtaValoracion ubicacion="menu-movil" tamano="lg" className="w-full" onClick={() => setAbiertoEn(null)} />
            <CtaWhatsApp ubicacion="menu-movil" variante="contorno-claro" tamano="lg" className="w-full">
              Escríbenos por WhatsApp
            </CtaWhatsApp>
          </div>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-item mt-auto inline-flex items-center gap-2 pt-10 text-sm text-niebla transition-colors hover:text-perla"
            style={{ "--i": NAV_PRINCIPAL.length + 1 } as CSSProperties}
          >
            <IconoInstagram className="size-5" />
            {SITE.instagramUsuario}
          </a>
        </Contenedor>
      </div>
    </header>
  );
}
