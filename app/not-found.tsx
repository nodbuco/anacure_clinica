import { Boton } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";

export default function NoEncontrada() {
  return (
    <main className="flex min-h-svh items-center bg-carbon py-seccion">
      <Contenedor ancho="texto">
        <div className="sombra-papel">
          <div className="papel rounded-troquel px-6 py-10 sm:px-12 sm:py-14">
            <h1 className="text-titulo font-light">Esta página no existe</h1>
            <p className="mt-4 text-entrada text-carbon">Puede que el enlace haya cambiado. Vuelve al inicio o agenda tu valoración.</p>
            <div data-cta-portada className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Boton href="/valoracion">Agenda tu valoración</Boton>
              <Boton href="/" variante="linea">
                Ir al inicio
              </Boton>
            </div>
          </div>
        </div>
      </Contenedor>
    </main>
  );
}
