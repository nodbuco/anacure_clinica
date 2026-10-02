"use client";

import { type FormEvent, useId, useRef, useState } from "react";
import { IconoCheck, IconoWhatsApp } from "@/components/ui/Icons";
import { clasesBoton } from "@/components/ui/Boton";
import { PROCEDIMIENTOS, ZONAS, procedimientoPorSlug } from "@/data/procedimientos";
import { LISTA_SEDES } from "@/data/sedes";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { mensajeValoracion, urlWhatsApp } from "@/lib/whatsapp";

const SIN_DEFINIR = "aun-no-se";

const MODALIDADES = [
  ...LISTA_SEDES.map((s) => ({ id: s.slug, nombre: `Presencial en ${s.nombre}`, detalle: `${s.direccion}, ${s.departamento}` })),
  { id: "virtual", nombre: "Virtual", detalle: "Por videollamada, desde tu casa" },
];

type Campo = "procedimiento" | "modalidad" | "nombre";

const ERRORES: Record<Campo, string> = {
  procedimiento: "Elige un procedimiento o «Aún no lo sé».",
  modalidad: "Elige cómo prefieres tu valoración.",
  nombre: "Escribe tu nombre para saber cómo llamarte.",
};

function Opcion({ name, value, titulo, detalle, checked, onChange }: {
  name: string;
  value: string;
  titulo: string;
  detalle?: string;
  checked: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <label className="opcion flex cursor-pointer items-start gap-3 rounded-2xl border border-linea bg-blanco/60 p-4">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-carbon/40 text-blanco peer-checked:border-tinta peer-checked:bg-tinta"
      >
        <IconoCheck className="size-3.5" />
      </span>
      <span>
        <span className="block text-[1rem] leading-snug text-tinta">{titulo}</span>
        {detalle && <span className="mt-0.5 block text-[0.85rem] leading-snug text-carbon">{detalle}</span>}
      </span>
    </label>
  );
}

/**
 * Pide procedimiento, modalidad y nombre, y abre el WhatsApp de la clínica con el mensaje listo.
 * Esta página no guarda nada: los datos solo viajan en el mensaje que la persona decide enviar.
 */
export function FormularioValoracion({ fecha, procedimientoInicial = "" }: { fecha: string | null; procedimientoInicial?: string }) {
  const id = useId();
  const [procedimiento, setProcedimiento] = useState(procedimientoInicial);
  const [modalidad, setModalidad] = useState("");
  const [nombre, setNombre] = useState("");
  const [fomag, setFomag] = useState(false);
  const [comentario, setComentario] = useState("");
  const [errores, setErrores] = useState<Partial<Record<Campo, string>>>({});
  const [enviado, setEnviado] = useState<string | null>(null);
  const formulario = useRef<HTMLFormElement>(null);

  const nombreProcedimiento = procedimiento === SIN_DEFINIR ? "Aún no lo sé" : procedimientoPorSlug(procedimiento)?.nombre;
  const nombreModalidad = MODALIDADES.find((m) => m.id === modalidad)?.nombre;

  const limpiar = (campo: Campo) => setErrores((e) => ({ ...e, [campo]: undefined }));

  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const nuevos: Partial<Record<Campo, string>> = {};
    if (!procedimiento) nuevos.procedimiento = ERRORES.procedimiento;
    if (!modalidad) nuevos.modalidad = ERRORES.modalidad;
    if (nombre.trim().length < 2) nuevos.nombre = ERRORES.nombre;
    setErrores(nuevos);
    const primero = (["procedimiento", "modalidad", "nombre"] as const).find((c) => nuevos[c]);
    if (primero) {
      formulario.current?.querySelector<HTMLElement>(`[data-campo="${primero}"]`)?.focus();
      return;
    }
    const url = urlWhatsApp(
      mensajeValoracion({
        nombre: nombre.trim(),
        procedimiento: nombreProcedimiento ?? "",
        modalidad: nombreModalidad ?? "",
        fomag,
        comentario: comentario.trim() || undefined,
      }),
    );
    track("valoracion_enviada", { procedimiento, modalidad, fomag });
    // Sin la opción «noopener», window.open devuelve la ventana y se puede saber si el navegador la bloqueó.
    const ventana = window.open(url, "_blank");
    if (ventana) ventana.opener = null;
    else window.location.href = url;
    setEnviado(url);
  };

  const resumen = [
    { etiqueta: "Procedimiento", valor: nombreProcedimiento },
    { etiqueta: "Valoración", valor: nombreModalidad },
    { etiqueta: "Nombre", valor: nombre.trim() || undefined },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <form ref={formulario} id={`${id}-formulario`} noValidate onSubmit={enviar} className="space-y-12 lg:col-span-7">
        <fieldset aria-describedby={errores.procedimiento ? `${id}-e-procedimiento` : undefined}>
          <legend
            tabIndex={-1}
            data-campo="procedimiento"
            className="text-tarjeta font-light text-tinta outline-none"
          >
            ¿Qué te interesa?
          </legend>
          {errores.procedimiento && (
            <p id={`${id}-e-procedimiento`} role="alert" className="mt-2 text-[0.9rem] font-medium text-alerta">
              {errores.procedimiento}
            </p>
          )}
          <div className="mt-5 space-y-6">
            {ZONAS.map((z) => (
              <div key={z.slug}>
                <p className="text-[0.9rem] font-medium text-carbon">{z.nombre}</p>
                <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                  {PROCEDIMIENTOS.filter((p) => p.zona === z.slug).map((p) => (
                    <Opcion
                      key={p.slug}
                      name="procedimiento"
                      value={p.slug}
                      titulo={p.nombre}
                      checked={procedimiento === p.slug}
                      onChange={(v) => {
                        setProcedimiento(v);
                        limpiar("procedimiento");
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
            <Opcion
              name="procedimiento"
              value={SIN_DEFINIR}
              titulo="Aún no lo sé"
              detalle="Te orientamos en la valoración"
              checked={procedimiento === SIN_DEFINIR}
              onChange={(v) => {
                setProcedimiento(v);
                limpiar("procedimiento");
              }}
            />
          </div>
        </fieldset>

        <fieldset aria-describedby={errores.modalidad ? `${id}-e-modalidad` : undefined}>
          <legend tabIndex={-1} data-campo="modalidad" className="text-tarjeta font-light text-tinta outline-none">
            ¿Cómo prefieres tu valoración?
          </legend>
          {errores.modalidad && (
            <p id={`${id}-e-modalidad`} role="alert" className="mt-2 text-[0.9rem] font-medium text-alerta">
              {errores.modalidad}
            </p>
          )}
          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            {MODALIDADES.map((m) => (
              <Opcion
                key={m.id}
                name="modalidad"
                value={m.id}
                titulo={m.nombre}
                detalle={m.detalle}
                checked={modalidad === m.id}
                onChange={(v) => {
                  setModalidad(v);
                  limpiar("modalidad");
                }}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="text-tarjeta font-light text-tinta">Tus datos</legend>
          <div>
            <label htmlFor={`${id}-nombre`} className="block text-[0.9rem] font-medium text-tinta">
              Nombre y apellido
            </label>
            <input
              id={`${id}-nombre`}
              data-campo="nombre"
              type="text"
              autoComplete="name"
              value={nombre}
              maxLength={80}
              onChange={(e) => {
                setNombre(e.target.value);
                limpiar("nombre");
              }}
              aria-invalid={errores.nombre ? true : undefined}
              aria-describedby={errores.nombre ? `${id}-e-nombre` : undefined}
              placeholder="María Fernanda Pérez"
              className={cn(
                "mt-2 block min-h-13 w-full rounded-2xl border bg-blanco px-4 text-[1.0625rem] text-tinta placeholder:text-carbon/60 focus:border-tinta focus:outline-none focus-visible:outline-2 focus-visible:outline-oro",
                errores.nombre ? "border-alerta" : "border-linea",
              )}
            />
            {errores.nombre && (
              <p id={`${id}-e-nombre`} role="alert" className="mt-2 text-[0.9rem] font-medium text-alerta">
                {errores.nombre}
              </p>
            )}
          </div>

          <label className="opcion flex cursor-pointer items-center gap-3 rounded-2xl border border-linea bg-blanco/60 p-4">
            <input type="checkbox" checked={fomag} onChange={(e) => setFomag(e.target.checked)} className="peer sr-only" />
            <span
              aria-hidden="true"
              className="inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-carbon/40 text-blanco peer-checked:border-tinta peer-checked:bg-tinta"
            >
              <IconoCheck className="size-3.5" />
            </span>
            <span className="text-[1rem] text-tinta">Soy docente afiliado(a) a FOMAG</span>
          </label>

          <div>
            <label htmlFor={`${id}-comentario`} className="block text-[0.9rem] font-medium text-tinta">
              ¿Algo que quieras contarnos? <span className="font-normal text-carbon">(opcional)</span>
            </label>
            <textarea
              id={`${id}-comentario`}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
              maxLength={400}
              placeholder="Por ejemplo, la zona que te gustaría tratar o tus dudas."
              className="mt-2 block w-full resize-y rounded-2xl border border-linea bg-blanco px-4 py-3 text-[1.0625rem] text-tinta placeholder:text-carbon/60 focus:border-tinta focus:outline-none focus-visible:outline-2 focus-visible:outline-oro"
            />
          </div>
        </fieldset>
      </form>

      <aside aria-label="Resumen de tu valoración" className="lg:col-span-5">
        <div className="tema-oscuro rounded-panel-lg bg-noche p-7 text-perla sm:p-9 lg:sticky lg:top-24">
          <h2 className="text-tarjeta font-light">Tu valoración</h2>
          <dl className="mt-6 divide-y divide-humo border-y border-humo">
            {resumen.map((r) => (
              <div key={r.etiqueta} className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="text-[0.9rem] text-niebla">{r.etiqueta}</dt>
                <dd className={cn("text-right text-[0.98rem]", r.valor ? "text-perla" : "text-niebla")}>{r.valor ?? "Sin elegir"}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 py-3.5">
              <dt className="text-[0.9rem] text-niebla">Próxima jornada</dt>
              <dd className="text-right text-[0.98rem] first-letter:uppercase">{fecha ?? "Por anunciar"}</dd>
            </div>
          </dl>
          <p className="mt-6 text-[1.05rem]">Gratuita</p>

          <button type="submit" form={`${id}-formulario`} className={clasesBoton("oro", "lg", "mt-6 w-full")}>
            <IconoWhatsApp className="size-5" />
            Continuar en WhatsApp
          </button>
          <p className="mt-4 text-[0.85rem] leading-relaxed text-niebla">
            Se abre WhatsApp con tu mensaje listo para enviar. Esta página no guarda tus datos.
          </p>

          {enviado && (
            <div role="status" className="mt-6 rounded-2xl bg-grafito-2 p-5">
              <p className="text-perla">Listo. Envía el mensaje en WhatsApp y te respondemos para darte la cita.</p>
              <a href={enviado} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[0.95rem] font-medium text-oro-claro hover:underline">
                Abrir WhatsApp de nuevo
              </a>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
