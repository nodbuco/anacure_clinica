import Image, { type ImageProps } from "next/image";
import { desenfoque } from "@/lib/desenfoque";

type Props = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & { src: string };

/** next/image con la versión difuminada de la propia foto mientras carga (fotos de /public). */
export async function Foto({ src, alt, ...resto }: Props) {
  const previa = await desenfoque(src);
  return <Image src={src} alt={alt} placeholder={previa ? "blur" : "empty"} blurDataURL={previa} {...resto} />;
}
