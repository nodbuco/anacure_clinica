import { cn } from "@/lib/cn";

interface Props {
  sello: { semana: string; dia: string; mes: string } | null;
  className?: string;
}

/**
 * La tarjeta de valoración que entrega la clínica: modalidad y cómo te respondemos en el cuerpo.
 * El talón perforado lleva la próxima jornada estampada con el sello de fecha, a escala de cartel.
 * Mientras no hay fecha (data/jornada.ts), el talón no anuncia un no-dato: lleva el isotipo del kit.
 */
export function TarjetaValoracion({ sello, className }: Props) {
  return (
    <div className={cn("sombra-papel-alta", className)}>
      <aside
        aria-label="Tarjeta de valoración"
        className="papel con-talon grid grid-cols-[1fr_var(--talon)] rounded-troquel [--talon:7.5rem] sm:[--talon:8.75rem]"
      >
        <div className="px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
          <p className="rotulo text-oro-texto">Tarjeta de valoración</p>
          <dl className="mt-4">
            <div className="border-b border-linea pb-3">
              <dt className="rotulo text-carbon">Modalidad</dt>
              <dd className="mt-1 text-[1.02rem] leading-snug">Presencial o virtual</dd>
            </div>
            <div className="pt-3">
              <dt className="rotulo text-carbon">Respuesta</dt>
              <dd className="mt-1 text-[1.02rem] leading-snug">Por WhatsApp</dd>
            </div>
          </dl>
        </div>
        {sello ? (
          <div className="linea-corte flex flex-col justify-between rounded-r-troquel bg-algodon-2 px-4 pb-5 pt-5 sm:px-5 sm:pt-6">
            <p className="rotulo text-carbon">
              Próxima
              <br />
              jornada
            </p>
            <p className="portada-sello sello mt-4 self-start">
              <span className="text-[0.62rem] tracking-[0.2em]">{sello.semana}</span>
              <span className="tabular text-fecha font-semibold tracking-[-0.02em]">{sello.dia}</span>
              <span className="text-[0.75rem]">{sello.mes}</span>
            </p>
          </div>
        ) : (
          <div className="linea-corte flex items-center justify-center rounded-r-troquel bg-algodon-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- isotipo del kit en SVG, sin modificar */}
            <img src="/brand/isotipo-color.svg" alt="" width={213} height={213} className="portada-sello size-14 sm:size-16" />
          </div>
        )}
      </aside>
    </div>
  );
}
