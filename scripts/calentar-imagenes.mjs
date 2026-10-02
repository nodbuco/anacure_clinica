/**
 * Calienta la caché de fotos después de cada despliegue.
 *
 * El servidor genera cada tamaño de cada foto (AVIF) la primera vez que alguien la pide, y cada
 * despliegue empieza con esa caché vacía: la primera visita espera cerca de un segundo por foto.
 * Este script recorre todas las páginas del sitemap y pide cada variante, para que ninguna
 * visitante sea la primera.
 *
 * Uso: npm run calentar -- https://<dominio-de-la-clinica>
 */
if (!process.argv[2]) {
  console.error("Falta el dominio: npm run calentar -- https://<dominio-de-la-clinica>");
  process.exit(1);
}
const base = process.argv[2].replace(/\/$/, "");
const EN_PARALELO = 4;

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paginas = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => base + new URL(m[1]).pathname);

const variantes = new Set();
for (const pagina of paginas) {
  const html = await (await fetch(pagina)).text();
  for (const m of html.matchAll(/\/_next\/image\?url=[^"\s,]+/g)) variantes.add(m[0].replaceAll("&amp;", "&"));
}

const inicio = Date.now();
const pendientes = [...variantes];
let generadas = 0;
async function trabajador() {
  for (let v = pendientes.shift(); v; v = pendientes.shift()) {
    const r = await fetch(base + v, { headers: { Accept: "image/avif,image/webp,*/*" } });
    await r.arrayBuffer();
    if (r.headers.get("x-nextjs-cache") !== "HIT") generadas++;
  }
}
await Promise.all(Array.from({ length: EN_PARALELO }, trabajador));
console.log(`${paginas.length} páginas · ${variantes.size} variantes de foto · ${generadas} generadas ahora · ${((Date.now() - inicio) / 1000).toFixed(0)} s`);
