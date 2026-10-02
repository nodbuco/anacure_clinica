export interface Profesional {
  slug: string;
  nombre: string;
  rol: string;
  /** Una línea con lo que hace en la clínica, según sus publicaciones. */
  linea: string;
  instagram?: string;
}

/**
 * Equipo visible (decisión del 1 de octubre de 2026: equipo ampliado).
 * Los roles de Diana García y Javier de la Rosa salen de las publicaciones de la clínica;
 * conviene confirmarlos con Ana junto con un retrato de cada uno.
 */
export const EQUIPO: Profesional[] = [
  {
    slug: "ana-cure",
    nombre: "Dra. Ana Cure",
    rol: "Gerente y fundadora",
    linea: "Fundó Ana Cure en 2015 y dirige la clínica y el spa.",
  },
  {
    slug: "alan-rodriguez",
    nombre: "Dr. Alan Rodríguez",
    rol: "Cirujano plástico",
    linea: "Alectomía, blefaroplastia y cirugía corporal en nuestras jornadas.",
    instagram: "https://www.instagram.com/dr_alanrodriguez",
  },
  {
    slug: "diana-garcia",
    nombre: "Dra. Diana García",
    rol: "Equipo médico",
    linea: "Liposucción y cirugía corporal.",
    instagram: "https://www.instagram.com/dra.dianagarcia",
  },
  {
    slug: "javier-de-la-rosa",
    nombre: "Dr. Javier de la Rosa",
    rol: "Medicina estética facial",
    linea: "Armonización de orejas y armonización facial.",
    instagram: "https://www.instagram.com/dr.javierdelarosa",
  },
];

export function profesional(slug: string): Profesional | undefined {
  return EQUIPO.find((p) => p.slug === slug);
}
