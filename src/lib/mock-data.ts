export type ListingCategory =
  | "plomeria"
  | "electricidad"
  | "jardineria"
  | "seguridad"
  | "limpieza"
  | "alimentos"
  | "otros";

export const CATEGORY_LABELS: Record<ListingCategory, string> = {
  plomeria: "Plomería",
  electricidad: "Electricidad",
  jardineria: "Jardinería",
  seguridad: "Seguridad",
  limpieza: "Limpieza",
  alimentos: "Alimentos",
  otros: "Otros",
};

export type ListingType = "negocio" | "proveedor";

export type Listing = {
  id: string;
  type: ListingType;
  name: string;
  category: ListingCategory;
  description: string;
  hours: string;
  phone: string;
  whatsapp: string;
  status: "activo" | "inactivo";
  featured?: boolean;
};

export const LISTINGS: Listing[] = [
  {
    id: "prov-plomeria-martinez",
    type: "proveedor",
    name: "Plomería Martínez",
    category: "plomeria",
    description:
      "Reparación de fugas, destape de drenajes, instalación de tuberías y mantenimiento preventivo. Más de 15 años atendiendo el fraccionamiento.",
    hours: "Lun–Sáb 8:00–18:00",
    phone: "55 1111 2222",
    whatsapp: "5215511112222",
    status: "activo",
  },
  {
    id: "prov-electricidad-valle",
    type: "proveedor",
    name: "Electricidad del Valle",
    category: "electricidad",
    description:
      "Instalaciones eléctricas residenciales, corrección de cortos circuitos, cambio de centros de carga y revisión de instalación.",
    hours: "Lun–Vie 9:00–19:00, Sáb 9:00–14:00",
    phone: "55 2222 3333",
    whatsapp: "5215522223333",
    status: "activo",
  },
  {
    id: "prov-jardines-verdes",
    type: "proveedor",
    name: "Jardines Verdes",
    category: "jardineria",
    description:
      "Mantenimiento de jardines, poda, control de plagas y diseño de áreas verdes para casas y jardineras comunes.",
    hours: "Lun–Sáb 7:00–16:00",
    phone: "55 3333 4444",
    whatsapp: "5215533334444",
    status: "activo",
  },
  {
    id: "prov-seguridad-total",
    type: "proveedor",
    name: "Seguridad Total",
    category: "seguridad",
    description:
      "Instalación y monitoreo de cámaras, alarmas y control de acceso. Servicio y soporte técnico permanente.",
    hours: "24 horas (soporte técnico)",
    phone: "55 4444 5555",
    whatsapp: "5215544445555",
    status: "activo",
  },
  {
    id: "neg-postres-lupita",
    type: "negocio",
    name: "Postres de Lupita",
    category: "alimentos",
    description:
      "Pasteles y postres artesanales para toda ocasión. Pedidos con 48 horas de anticipación. Elaborado por una vecina del fraccionamiento.",
    hours: "Mar–Dom 10:00–20:00",
    phone: "55 5555 6666",
    whatsapp: "5215555556666",
    status: "activo",
    featured: true,
  },
  {
    id: "neg-limpieza-express",
    type: "negocio",
    name: "Limpieza Express",
    category: "limpieza",
    description:
      "Servicio de limpieza doméstica profunda y de mantenimiento, por hora o por visita. Vecina del fraccionamiento con referencias internas.",
    hours: "Lun–Sáb 8:00–17:00",
    phone: "55 6666 7777",
    whatsapp: "5215566667777",
    status: "activo",
  },
  {
    id: "neg-manualidades-ana",
    type: "negocio",
    name: "Manualidades Ana",
    category: "otros",
    description:
      "Decoración personalizada para fiestas infantiles, centros de mesa y detalles para regalo. Catálogo disponible por WhatsApp.",
    hours: "Todos los días 11:00–19:00",
    phone: "55 7777 8888",
    whatsapp: "5215577778888",
    status: "activo",
  },
];

export type MyBusinessStatus = "en_revision" | "aprobado" | "bloqueado";

export const MY_BUSINESS_STATUS_LABELS: Record<MyBusinessStatus, string> = {
  en_revision: "En revisión",
  aprobado: "Aprobado",
  bloqueado: "Bloqueado",
};

export type MyBusiness = {
  id: string;
  name: string;
  category: ListingCategory;
  description: string;
  hours: string;
  phone: string;
  status: MyBusinessStatus;
  /** Matches a LISTINGS id once aprobado — that's what makes it visible in the public catálogo. */
  publicListingId?: string;
};

export const MY_BUSINESSES: MyBusiness[] = [
  {
    id: "mine-postres-lupita",
    name: "Postres de Lupita",
    category: "alimentos",
    description:
      "Pasteles y postres artesanales para toda ocasión. Pedidos con 48 horas de anticipación. Elaborado por una vecina del fraccionamiento.",
    hours: "Mar–Dom 10:00–20:00",
    phone: "55 5555 6666",
    status: "aprobado",
    publicListingId: "neg-postres-lupita",
  },
  {
    id: "mine-renta-sillas-mesas",
    name: "Renta de Sillas y Mesas",
    category: "otros",
    description:
      "Renta de sillas, mesas y manteles para eventos familiares dentro del fraccionamiento. Entrega y recolección incluida.",
    hours: "Todos los días 9:00–19:00",
    phone: "55 8888 9999",
    status: "en_revision",
  },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  date: string;
  urgent: boolean;
};

export const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Corte de agua programado",
    body: "El martes 15 de julio habrá corte de agua de 9:00 a 14:00 por mantenimiento de la cisterna principal. Se recomienda almacenar agua con anticipación.",
    date: "2026-07-12T09:00:00",
    urgent: true,
  },
  {
    id: "n2",
    title: "Fumigación de áreas comunes",
    body: "Este fin de semana se realizará fumigación en jardines y andadores. Se recomienda mantener mascotas dentro de casa durante el proceso.",
    date: "2026-07-10T15:30:00",
    urgent: false,
  },
  {
    id: "n3",
    title: "Nuevo proveedor en el directorio",
    body: 'Ya está disponible "Jardines Verdes" en la categoría de jardinería dentro del catálogo de proveedores.',
    date: "2026-07-08T11:00:00",
    urgent: false,
  },
  {
    id: "n4",
    title: "Recolección de basura — cambio de horario",
    body: "A partir de este lunes, el camión recolector pasará a las 7:00 am en lugar de las 8:00 am. Favor de sacar la basura desde la noche anterior.",
    date: "2026-07-05T08:00:00",
    urgent: false,
  },
];

export type ReglamentoSection = {
  id: string;
  title: string;
  body: string;
};

export const REGLAMENTO_SECTIONS: ReglamentoSection[] = [
  {
    id: "convivencia",
    title: "Convivencia y ruido",
    body: "Se debe respetar el horario de silencio de 22:00 a 8:00 horas. Cualquier evento con música o ruido elevado debe notificarse a la administración con 48 horas de anticipación.",
  },
  {
    id: "mascotas",
    title: "Mascotas",
    body: "Las mascotas deben pasearse con correa dentro del fraccionamiento. El dueño es responsable de recoger los desechos en áreas comunes.",
  },
  {
    id: "vehiculos",
    title: "Vehículos y estacionamiento",
    body: "El estacionamiento en áreas comunes es exclusivo para visitas por un máximo de 24 horas. Queda prohibido obstruir accesos y andadores peatonales.",
  },
  {
    id: "areas-comunes",
    title: "Áreas comunes",
    body: "El uso de áreas comunes es para todos los residentes en igualdad de condiciones. El daño a instalaciones comunes será responsabilidad de quien lo ocasione.",
  },
];
