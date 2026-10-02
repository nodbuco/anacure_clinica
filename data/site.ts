/** Datos generales del sitio. Cambia aquí y se actualiza en todas las páginas. */
export const SITE = {
  nombre: "Clínica Estética Ana Cure",
  nombreCorto: "Clínica Ana Cure",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinica.anacure.co",
  descripcion:
    "Cirugía plástica y medicina estética en Aguachica (Cesar) y El Banco (Magdalena): quirófano propio, cirujanos plásticos y recuperación en el mismo edificio. Tu valoración es gratuita, presencial o virtual.",
  /** WhatsApp oficial de la clínica (el de la biografía de Instagram), sin «+», listo para wa.me. */
  whatsapp: "573187019075",
  whatsappBonito: "318 701 9075",
  telefonoInternacional: "+57 318 701 9075",
  instagram: "https://www.instagram.com/clinicaanacure",
  instagramUsuario: "@clinicaanacure",
  /** Sitio hermano: el spa, donde sigue la recuperación. URL temporal hasta que exista anacure.co. */
  urlSpa: process.env.NEXT_PUBLIC_SPA_URL ?? "https://anacure.agenda.nodbu.com",
  legal: {
    /** Pendiente de confirmar con Ana si la clínica factura con la misma sociedad del spa. */
    razonSocial: "Clínica Ana Cure Spa S.A.S.",
    nit: "901.438.992",
    representante: "Ana Mercedes Cure Saltaren",
    direccion: "Cra 33 # 3-27, primer piso, Aguachica, Cesar, Colombia",
    /** TODO: correo real para peticiones de habeas data. */
    correoDatos: "datos@anacure.co",
  },
} as const;
