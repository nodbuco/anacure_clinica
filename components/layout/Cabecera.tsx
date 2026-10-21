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

/**
 * Barra fija, como el membrete de la papelería. Sobre el video de la portada va transparente;
 * al bajar, y en las demás páginas, es cartulina carbón. Su botón se guarda mientras se ve el
 * llamado principal de la página (data-cta-portada) y en la propia página de valoración:
 * en pantalla hay un solo llamado a la vez.
 */
export function Cabecera() {
  const ruta = usePathname();
  const enPortada = ruta === "/";
  const [desplazada, setDesplazada] = useState(false);
  const [ctaPaginaVisible, setCtaPaginaVisible] = useState(true);
  // El menú guarda la ruta en la que se abrió: al navegar deja de coincidir y se cierra solo.
  const [abiertoEn, setAbiertoEn] = useState<string | null>(null);
  const abierto = abiertoEn === ruta;
  const botonMenu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let pendiente = 0;
    const alDesplazar = () => {
      cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(() => setDesplazada(window.scrollY > 24));
    };
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });

    const cta = document.querySelector("[data-cta-portada]");
    const observador = cta ? new IntersectionObserver(([e]) => setCtaPaginaVisible(e.isIntersecting), { rootMargin: "-56px 0px 0px 0px" }) : null;
    // Sin llamado principal en la página, el de la cabecera queda a la vista.
    const sinCta = cta ? 0 : requestAnimationFrame(() => setCtaPaginaVisible(false));
    if (cta) observador?.observe(cta);
    return () => {
      cancelAnimationFrame(pendiente);
      cancelAnimationFrame(sinCta);
      window.removeEventListener("scroll", alDesplazar);
      observador?.disconnect();
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

  const solida = !enPortada || desplazada || abierto;
  const ctaOculto = abierto || ruta === "/valoracion" || ctaPaginaVisible;

  return (
    <header data-solida={solida || undefined} data-cta-oculto={ctaOculto || undefined} className="fixed inset-x-0 top-0 z-50">
      {/* El fondo vive en su propia capa: así la hoja «fixed» del menú no queda encerrada en la barra */}
      <div aria-hidden="true" className="cabecera-fondo absolute inset-0 -z-10 border-b border-blanco/12 bg-carbon" />
      <a
        href="#contenido"
        className="sr-only-focusable estampado fixed left-4 top-3 z-[60] rounded-[2px] px-4 py-2 text-sm font-semibold"
      >
        Ir al contenido
      </a>

      <Contenedor className="flex h-14 items-center justify-between gap-6 lg:h-16">
        <Link href="/" aria-label="Clínica Estética Ana Cure, ir al inicio" className="block shrink-0">
          <Logo fondo="oscuro" decorativo className="h-8 lg:h-9" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV_PRINCIPAL.map((e) => (
            <Link key={e.href} href={e.href} className="rotulo py-2 text-blanco/80 transition-colors duration-200 hover:text-blanco">
              {e.etiqueta}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <CtaValoracion ubicacion="cabecera" tamano="md" className="cabecera-cta">
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
            className="-mr-2 inline-flex size-11 items-center justify-center text-blanco lg:hidden"
          >
            {abierto ? <IconoCerrar className="size-6" /> : <IconoMenu className="size-6" />}
          </button>
        </div>
      </Contenedor>

      <div
        id="menu-movil"
        data-abierto={abierto || undefined}
        className="menu-hoja fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-carbon text-blanco lg:hidden"
      >
        <Contenedor className="flex min-h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
          <nav aria-label="Principal (celular)">
            <ul>
              {NAV_PRINCIPAL.map((e, i) => (
                <li key={e.href} className="menu-item border-b border-blanco/15" style={{ "--i": i } as CSSProperties}>
                  <Link href={e.href} onClick={() => setAbiertoEn(null)} className="block py-4 text-subtitulo font-light">
                    {e.etiqueta}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-item mt-8 grid gap-3" style={{ "--i": NAV_PRINCIPAL.length } as CSSProperties}>
            <CtaValoracion ubicacion="menu-movil" className="w-full" onClick={() => setAbiertoEn(null)} />
            <CtaWhatsApp ubicacion="menu-movil" className="w-full">
              Escríbenos por WhatsApp
            </CtaWhatsApp>
          </div>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="menu-item mt-auto inline-flex min-h-11 items-center gap-2 pt-10 text-[0.95rem] text-perla transition-colors hover:text-blanco"
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
