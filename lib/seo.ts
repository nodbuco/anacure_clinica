import type { Procedimiento } from "@/data/procedimientos";
import { HORARIO, LISTA_SEDES } from "@/data/sedes";
import { SITE } from "@/data/site";

/** JSON-LD listo para un <script>: escapa «<» para que ningún texto pueda cerrar la etiqueta. */
export function jsonLdSeguro(datos: unknown): string {
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}

const horario = HORARIO.estructurado.map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: h.dias,
  opens: h.abre,
  closes: h.cierra,
}));

/** La clínica (schema.org MedicalClinic), una entrada por sede, y el sitio web. */
export function jsonLdClinica() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organizacion`,
        name: SITE.nombre,
        legalName: SITE.legal.razonSocial,
        taxID: SITE.legal.nit,
        url: SITE.url,
        logo: `${SITE.url}/brand/logo-vertical-color-1500.png`,
        image: `${SITE.url}/og/portada.jpg`,
        sameAs: [SITE.instagram],
        telephone: SITE.telefonoInternacional,
        subOrganization: LISTA_SEDES.map((s) => ({ "@id": `${SITE.url}/#sede-${s.slug}` })),
      },
      ...LISTA_SEDES.map((s) => ({
        "@type": "MedicalClinic",
        "@id": `${SITE.url}/#sede-${s.slug}`,
        name: `${SITE.nombre} · ${s.nombre}`,
        url: `${SITE.url}/#sedes`,
        image: `${SITE.url}${s.imagen.src}`,
        telephone: SITE.telefonoInternacional,
        medicalSpecialty: ["PlasticSurgery"],
        isAcceptingNewPatients: true,
        address: {
          "@type": "PostalAddress",
          streetAddress: s.direccion,
          addressLocality: s.nombre,
          addressRegion: s.departamento,
          addressCountry: "CO",
        },
        geo: { "@type": "GeoCoordinates", latitude: s.coordenadas.lat, longitude: s.coordenadas.lng },
        openingHoursSpecification: horario,
        parentOrganization: { "@id": `${SITE.url}/#organizacion` },
      })),
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#sitio`,
        url: SITE.url,
        name: SITE.nombre,
        inLanguage: "es-CO",
        publisher: { "@id": `${SITE.url}/#organizacion` },
      },
    ],
  };
}

/** Página de un procedimiento (schema.org MedicalProcedure). */
export function jsonLdProcedimiento(p: Procedimiento) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${SITE.url}/procedimientos/${p.slug}#procedimiento`,
    name: p.nombre,
    description: p.resumen,
    url: `${SITE.url}/procedimientos/${p.slug}`,
    procedureType: p.tipo === "quirurgico" ? "https://schema.org/SurgicalProcedure" : "https://schema.org/NoninvasiveProcedure",
    howPerformed: p.queEs.join(" "),
    provider: { "@id": `${SITE.url}/#organizacion` },
  };
}
