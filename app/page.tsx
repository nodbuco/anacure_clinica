import { Cierre } from "@/components/inicio/Cierre";
import { Clinica, type Espacio } from "@/components/inicio/Clinica";
import { Equipo } from "@/components/inicio/Equipo";
import { Hero } from "@/components/inicio/Hero";
import { Manifiesto } from "@/components/inicio/Manifiesto";
import { Procedimientos } from "@/components/inicio/Procedimientos";
import { Recorrido } from "@/components/inicio/Recorrido";
import { Recuperacion } from "@/components/inicio/Recuperacion";
import { Resultados } from "@/components/resultados/Resultados";
import { fechaJornada } from "@/data/jornada";
import { RESULTADOS } from "@/data/resultados";
import { desenfoque } from "@/lib/desenfoque";

const ESPACIOS: Espacio[] = [
  {
    id: "recepcion",
    nombre: "Recepción",
    texto: "Te recibimos en el primer piso de la Cra 33 # 3-27, en Aguachica.",
    imagen: { src: "/media/clinica/recepcion.jpg", alt: "Recepción de la Clínica Estética Ana Cure con el logo dorado en la pared" },
  },
  {
    id: "quirofano",
    nombre: "Quirófano",
    texto: "Nuestro propio quirófano, preparado para cada jornada.",
    imagen: { src: "/media/clinica/quirofano.jpg", alt: "Quirófano de la clínica con sus lámparas, mesa quirúrgica y equipos" },
  },
  {
    id: "recuperacion",
    nombre: "Sala de recuperación",
    texto: "A pasos del quirófano, para tus primeras horas después de la cirugía.",
    imagen: { src: "/media/clinica/recuperacion.jpg", alt: "Sala de recuperación con camillas y monitores" },
  },
  {
    id: "hiperbarica",
    nombre: "Cámara hiperbárica",
    texto: "En el mismo edificio, para acompañar tu recuperación.",
    imagen: { src: "/media/recuperacion/hiperbarica.jpg", alt: "Cámara hiperbárica con el logo de la Clínica Estética Ana Cure" },
  },
];

/** La fecha de la próxima jornada se lee al construir el sitio: al cambiarla en data/jornada.ts, se vuelve a publicar. */
export default async function InicioPage() {
  const espacios = await Promise.all(ESPACIOS.map(async (e) => ({ ...e, imagen: { ...e.imagen, previa: await desenfoque(e.imagen.src) } })));
  return (
    <main>
      <Hero />
      <Manifiesto />
      <Procedimientos />
      <Clinica espacios={espacios} />
      <Recorrido fecha={fechaJornada()} />
      <Resultados resultados={RESULTADOS} />
      <Recuperacion />
      <Equipo />
      <Cierre />
    </main>
  );
}
