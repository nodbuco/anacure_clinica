import { Cierre } from "@/components/inicio/Cierre";
import { Equipo } from "@/components/inicio/Equipo";
import { Hero } from "@/components/inicio/Hero";
import { Procedimientos } from "@/components/inicio/Procedimientos";
import { type Paso, Recorrido } from "@/components/inicio/Recorrido";
import { Resultados } from "@/components/resultados/Resultados";
import { selloJornada } from "@/data/jornada";
import { RESULTADOS } from "@/data/resultados";
import { desenfoque } from "@/lib/desenfoque";

/* Cada dato una sola vez: el quirófano propio y la recuperación en el mismo edificio los dice la
   portada; aquí cada paso cuenta solo lo suyo. */
const PASOS: Paso[] = [
  {
    nombre: "Valoración",
    texto: "Te escuchamos, revisamos tu caso y te decimos con honestidad si el procedimiento es para ti.",
    fotos: [{ src: "/media/clinica/recepcion.jpg", alt: "Recepción de la Clínica Estética Ana Cure con el logo dorado en la pared", pie: "Recepción" }],
  },
  {
    nombre: "Jornada",
    texto: "En fechas programadas, el cirujano plástico te valora y te opera en nuestro quirófano de Aguachica.",
    fotos: [{ src: "/media/clinica/quirofano.jpg", alt: "Quirófano de la clínica con sus lámparas, mesa quirúrgica y equipos", pie: "Quirófano" }],
  },
  {
    nombre: "Recuperación",
    texto:
      "Tus primeras horas, en la sala junto al quirófano. Después, controles con el mismo equipo y terapias en el spa: drenaje linfático, Ultra Z y cámara hiperbárica.",
    fotos: [
      { src: "/media/clinica/recuperacion.jpg", alt: "Sala de recuperación con camillas y monitores", pie: "Sala de recuperación" },
      {
        src: "/media/recuperacion/hiperbarica.jpg",
        alt: "Paciente en la cámara hiperbárica, acompañada por el equipo",
        pie: "Cámara hiperbárica",
      },
    ],
    spa: true,
  },
];

/** La fecha de la próxima jornada se lee al construir el sitio: al cambiarla en data/jornada.ts, se vuelve a publicar. */
export default async function InicioPage() {
  const pasos = await Promise.all(
    PASOS.map(async (p) => ({ ...p, fotos: await Promise.all(p.fotos.map(async (f) => ({ ...f, previa: await desenfoque(f.src) }))) })),
  );
  return (
    <main>
      <Hero sello={selloJornada()} />
      <Procedimientos />
      <Recorrido pasos={pasos} />
      <Equipo />
      <Resultados resultados={RESULTADOS} />
      <Cierre />
    </main>
  );
}
