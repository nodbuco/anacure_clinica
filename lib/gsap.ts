"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/* Registro único de plugins. Importa gsap desde aquí, nunca desde "gsap" directo. */
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Las escenas ligadas al scroll solo corren con movimiento permitido. */
export const CON_MOVIMIENTO = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
