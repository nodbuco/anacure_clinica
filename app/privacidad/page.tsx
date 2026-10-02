import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Contenedor } from "@/components/ui/Contenedor";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales",
  description: "Cómo la Clínica Estética Ana Cure trata tus datos personales conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: false },
};

function Apartado({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-tarjeta font-light text-tinta">{titulo}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacidadPage() {
  const L = SITE.legal;
  return (
    <main data-tema="claro" className="bg-perla pb-seccion pt-28 sm:pt-32 lg:pt-40">
      <Contenedor ancho="texto">
        <h1 className="text-titulo font-light text-tinta">Tratamiento de datos personales.</h1>
        <p className="mt-5 text-entrada text-carbon">Ley 1581 de 2012 y Decreto 1377 de 2013 de Colombia. Última actualización: octubre de 2026.</p>

        <article className="mt-14 space-y-10 text-[1.02rem] leading-relaxed text-carbon">
          <Apartado titulo="Responsable del tratamiento">
            <p>
              <strong className="font-medium text-tinta">{L.razonSocial}</strong>, NIT {L.nit}, con domicilio en {L.direccion}. Representante legal: {L.representante}.
              Nombre comercial: {SITE.nombre}. Canales de atención: WhatsApp {SITE.whatsappBonito} y el correo {L.correoDatos}.
            </p>
          </Apartado>
          <Apartado titulo="Qué datos recogemos">
            <p>
              Este sitio no guarda los datos del formulario de valoración: los convierte en un mensaje que tú decides enviar por WhatsApp. Cuando nos
              escribes, recibimos tu nombre, tu número y lo que nos cuentes. Si te valoramos o te operamos, tratamos también datos de tu salud, que son
              datos sensibles: solo con tu autorización explícita y sin que estés obligada u obligado a suministrarlos.
            </p>
          </Apartado>
          <Apartado titulo="Para qué los usamos">
            <ul className="list-disc space-y-1 pl-6">
              <li>Agendar, confirmar y reprogramar tu valoración y tu cirugía.</li>
              <li>Realizar la valoración, preparar el procedimiento y acompañar tu recuperación.</li>
              <li>Responder tus mensajes y enviarte información que nos pidas.</li>
              <li>Cumplir obligaciones legales, contables y sanitarias, incluida la historia clínica.</li>
            </ul>
          </Apartado>
          <Apartado titulo="Fotografías de pacientes">
            <p>
              Las fotografías y videos de pacientes que aparecen en este sitio se publican con su autorización. En la sección de resultados se muestran
              apagados y solo se ven si tú decides encenderlos. Quien aparezca puede revocar su autorización en cualquier momento y retiraremos el material.
            </p>
          </Apartado>
          <Apartado titulo="Tus derechos">
            <p>
              Conocer, actualizar y rectificar tus datos; pedir prueba de la autorización; saber cómo se han usado; presentar quejas ante la
              Superintendencia de Industria y Comercio; revocar la autorización y pedir que se borren cuando no exista un deber legal de conservarlos; y
              acceder a ellos sin costo.
            </p>
            <p>
              Escríbenos a {L.correoDatos} o al WhatsApp {SITE.whatsappBonito} con tu nombre, el derecho que quieres ejercer y un medio de contacto.
              Respondemos consultas en máximo diez días hábiles y reclamos en máximo quince.
            </p>
          </Apartado>
          <Apartado titulo="Con quién los compartimos">
            <p>
              Con los profesionales que te atienden y con los proveedores tecnológicos que necesitamos para operar (mensajería y alojamiento web), que
              actúan como encargados con las medidas de seguridad que exige la ley. No vendemos ni cedemos tus datos con fines comerciales.
            </p>
          </Apartado>
          <Apartado titulo="Analítica">
            <p>
              Medimos las visitas de forma agregada y anónima, sin cookies de seguimiento. Los mapas, Instagram y WhatsApp son servicios de terceros que se
              abren solo cuando tú los usas y tienen sus propias políticas.
            </p>
          </Apartado>
          <Apartado titulo="Cambios">
            <p>La versión vigente de esta política estará siempre publicada en esta página con su fecha de actualización.</p>
          </Apartado>
        </article>
      </Contenedor>
    </main>
  );
}
