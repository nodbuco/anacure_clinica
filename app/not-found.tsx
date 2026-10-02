import { Boton } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";

export default function NoEncontrada() {
  return (
    <main data-tema="oscuro" className="tema-oscuro flex min-h-svh items-center bg-noche py-seccion text-perla">
      <Contenedor ancho="texto" className="text-center">
        <h1 className="text-titulo font-light">Aquí no hay nada.</h1>
        <p className="mt-5 text-entrada text-niebla">Puede que el enlace haya cambiado. Vuelve al inicio o agenda tu valoración.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Boton href="/" variante="contorno-claro" tamano="lg">
            Ir al inicio
          </Boton>
          <Boton href="/valoracion" tamano="lg">
            Agenda tu valoración
          </Boton>
        </div>
      </Contenedor>
    </main>
  );
}
