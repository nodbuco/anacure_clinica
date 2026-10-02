import { SITE } from "@/data/site";

export interface SolicitudValoracion {
  nombre: string;
  procedimiento: string;
  modalidad: string;
  fomag: boolean;
  comentario?: string;
}

/** Mensaje que llega ya escrito al WhatsApp de la clínica desde el formulario de valoración. */
export function mensajeValoracion(s: SolicitudValoracion): string {
  const lineas = [
    "Hola, quiero agendar mi valoración en la Clínica Estética Ana Cure.",
    `Nombre: ${s.nombre}`,
    `Procedimiento: ${s.procedimiento}`,
    `Valoración: ${s.modalidad}`,
  ];
  if (s.fomag) lineas.push("Soy docente afiliado(a) a FOMAG.");
  if (s.comentario) lineas.push(`Comentario: ${s.comentario}`);
  lineas.push("Vengo desde la página web.");
  return lineas.join("\n");
}

/** Enlace wa.me al número de la clínica con el mensaje prellenado. */
export function urlWhatsApp(mensaje = "Hola, quiero información sobre la Clínica Estética Ana Cure. Vengo desde la página web."): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
