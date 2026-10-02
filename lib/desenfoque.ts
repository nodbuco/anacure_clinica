import "server-only";
import path from "node:path";
import sharp from "sharp";

const hechas = new Map<string, Promise<string | undefined>>();

/**
 * Vista previa diminuta (16 px, en base64) de una foto de /public para `placeholder="blur"`
 * de next/image. Se calcula al construir el sitio, así que no cuesta nada al visitante: mientras
 * la foto real llega, se ve su versión difuminada en lugar de un hueco.
 */
export function desenfoque(src: string | null | undefined): Promise<string | undefined> {
  if (!src || !src.startsWith("/")) return Promise.resolve(undefined);
  let pendiente = hechas.get(src);
  if (!pendiente) {
    pendiente = previa(src);
    hechas.set(src, pendiente);
  }
  return pendiente;
}

async function previa(src: string): Promise<string | undefined> {
  try {
    const b = await sharp(path.join(process.cwd(), "public", src)).resize(16, 16, { fit: "inside" }).jpeg({ quality: 60 }).toBuffer();
    return `data:image/jpeg;base64,${b.toString("base64")}`;
  } catch {
    // Sin vista previa la foto carga igual, solo que sin el difuminado mientras llega.
    return undefined;
  }
}
