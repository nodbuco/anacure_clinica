import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PlausibleScript } from "@/components/analytics/PlausibleScript";
import { Cabecera } from "@/components/layout/Cabecera";
import { Pie } from "@/components/layout/Pie";
import { LuzPuntero } from "@/components/ui/LuzPuntero";
import { SITE } from "@/data/site";
import { jsonLdClinica, jsonLdSeguro } from "@/lib/seo";
import "./globals.css";

/*
  Inter del kit (06_Tipografias), variable en peso y en tamaño óptico (los titulares toman el
  corte «Display» solos), recortada a los caracteres del español: 50 KB. Es la única fuente del
  sitio y la del titular del hero, así que se precarga.
*/
const inter = localFont({
  src: "./fonts/inter-es-var.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Clínica Estética Ana Cure · Cirugía plástica en Aguachica y El Banco",
    template: "%s · Clínica Estética Ana Cure",
  },
  description: SITE.descripcion,
  applicationName: SITE.nombre,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE.nombre,
    url: SITE.url,
    images: [{ url: "/og/portada.jpg", width: 1200, height: 630, alt: "Clínica Estética Ana Cure: tu cirugía, a la luz" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#141313",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" data-scroll-behavior="smooth" className={inter.variable}>
      <body>
        <Cabecera />
        <div id="contenido">{children}</div>
        <Pie />
        <LuzPuntero />
        <PlausibleScript />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSeguro(jsonLdClinica()) }} />
      </body>
    </html>
  );
}
