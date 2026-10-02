import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker/Coolify: genera .next/standalone con lo mínimo para correr en producción.
  output: "standalone",
  // Raíz explícita: evita que Turbopack suba a la carpeta de usuario buscando lockfiles.
  turbopack: { root: path.resolve() },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  async redirects() {
    // El índice de procedimientos vive en el inicio.
    return [{ source: "/procedimientos", destination: "/#procedimientos", permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Video y pósters del hero: archivos con nombre estable, se cachean una semana.
        source: "/media/hero/:archivo*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
