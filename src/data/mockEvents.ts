export interface MockEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  category: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  color: string;
  price: string;
  description: string;
  imagen: string;
  enlace_compra: string | null;
}

export const mockEvents: MockEvent[] = [
  {
    id: "1",
    title: "Festival de las Artes de Santa Cruz",
    date: "2026-05-15",
    startTime: "18:00",
    endTime: "23:00",
    category: "Festival",
    location: { name: "Plaza de España, Santa Cruz", lat: 28.4682, lng: -16.2546 },
    color: "#7c3aed",
    price: "Gratis",
    description: "Gran festival artístico con música en vivo, danza y exposiciones al aire libre. Disfruta de una noche mágica en la Plaza de España con artistas locales e internacionales que transformarán el corazón de Santa Cruz en un escenario vibrante de creatividad y cultura.",
    imagen: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=600&fit=crop",
    enlace_compra: null,
  },
  {
    id: "2",
    title: "Exposición de Arte Contemporáneo",
    date: "2026-05-16",
    startTime: "10:00",
    endTime: "17:00",
    category: "Arte",
    location: { name: "TEA Tenerife Espacio de las Artes, Santa Cruz", lat: 28.4516, lng: -16.2527 },
    color: "#d97706",
    price: "5€",
    description: "Muestra colectiva de artistas canarios con obras de pintura, escultura e instalación. Una exploración visual que dialoga entre la tradición insular y las corrientes artísticas contemporáneas más innovadoras del panorama europeo.",
    imagen: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=1200&h=600&fit=crop",
    enlace_compra: "https://www.teatenerife.es/entradas",
  },
  {
    id: "3",
    title: "Concierto de Timple y Folclore",
    date: "2026-05-17",
    startTime: "19:00",
    endTime: "22:00",
    category: "Música",
    location: { name: "Auditorio de Tenerife, Santa Cruz", lat: 28.4575, lng: -16.2420 },
    color: "#dc2626",
    price: "12€",
    description: "Noche de música tradicional canaria con los mejores timplistas de la isla. Desde isas y folías hasta malagueñas, un recorrido sonoro por las raíces musicales del archipiélago en el incomparable Auditorio de Tenerife.",
    imagen: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=600&fit=crop",
    enlace_compra: "https://www.auditoriodetenerife.com/entradas",
  },
  {
    id: "4",
    title: "Taller de Cerámica Guanche",
    date: "2026-05-18",
    startTime: "14:00",
    endTime: "16:00",
    category: "Taller",
    location: { name: "Casa de la Cultura, La Laguna", lat: 28.4853, lng: -16.3150 },
    color: "#059669",
    price: "8€",
    description: "Aprende las técnicas ancestrales de cerámica de los antiguos habitantes de Tenerife. Un taller práctico donde moldearás barro con tus propias manos siguiendo los métodos tradicionales guanches, guiado por artesanos expertos.",
    imagen: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=600&fit=crop",
    enlace_compra: "https://www.eventbrite.es",
  },
  {
    id: "5",
    title: "Feria de Artesanía Canaria",
    date: "2026-05-20",
    startTime: "09:00",
    endTime: "18:00",
    category: "Feria",
    location: { name: "Plaza del Adelantado, La Laguna", lat: 28.4869, lng: -16.3140 },
    color: "#facc15",
    price: "Gratis",
    description: "Mercado artesanal con productos locales: bordados, cestería, quesos y vinos. Encuentra piezas únicas hechas a mano por artesanos de toda la isla y degusta los mejores productos gastronómicos de Tenerife.",
    imagen: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&h=600&fit=crop",
    enlace_compra: null,
  },
  {
    id: "6",
    title: "Noche de Jazz en Puerto de la Cruz",
    date: "2026-05-20",
    startTime: "20:00",
    endTime: "23:30",
    category: "Música",
    location: { name: "Lago Martiánez, Puerto de la Cruz", lat: 28.4147, lng: -16.5484 },
    color: "#dc2626",
    price: "15€",
    description: "Velada de jazz con músicos internacionales junto al emblemático Lago Martiánez. Una fusión de sonidos bajo las estrellas con el océano Atlántico como telón de fondo, en uno de los enclaves más icónicos de Tenerife.",
    imagen: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200&h=600&fit=crop",
    enlace_compra: "https://www.entrees.es",
  },
  {
    id: "7",
    title: "Ruta Histórica por La Laguna",
    date: "2026-05-22",
    startTime: "08:00",
    endTime: "11:00",
    category: "Historia",
    location: { name: "Centro Histórico, San Cristóbal de La Laguna", lat: 28.4870, lng: -16.3153 },
    color: "#7c3aed",
    price: "Gratis",
    description: "Paseo guiado por el casco histórico Patrimonio de la Humanidad de La Laguna. Descubre iglesias centenarias, casonas señoriales y las historias ocultas de la primera capital de Tenerife en un recorrido de tres horas.",
    imagen: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=600&fit=crop",
    enlace_compra: null,
  },
  {
    id: "8",
    title: "Festival de Cine de Tenerife",
    date: "2026-05-23",
    startTime: "17:00",
    endTime: "22:00",
    category: "Cine",
    location: { name: "Multicines Tenerife, Santa Cruz", lat: 28.4600, lng: -16.2650 },
    color: "#0891b2",
    price: "6€",
    description: "Proyecciones de cortometrajes y largometrajes de directores canarios emergentes. Una ventana al nuevo cine insular con coloquios, encuentros con cineastas y premios del público.",
    imagen: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop",
    enlace_compra: "https://www.cinesentradas.com",
  },
  {
    id: "9",
    title: "Taller de Cocina Canaria",
    date: "2026-05-24",
    startTime: "10:00",
    endTime: "13:00",
    category: "Gastronomía",
    location: { name: "Mercado Municipal, La Orotava", lat: 28.3906, lng: -16.5231 },
    color: "#d97706",
    price: "20€",
    description: "Cocina papas arrugadas con mojo, gofio amasado y otras delicias tinerfeñas. Un taller gastronómico donde aprenderás los secretos de la cocina canaria de la mano de chefs locales en el histórico mercado de La Orotava.",
    imagen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=600&fit=crop",
    enlace_compra: "https://www.eventbrite.es",
  },
  {
    id: "10",
    title: "Teatro: Bodas de Sangre",
    date: "2026-05-25",
    startTime: "19:30",
    endTime: "21:30",
    category: "Teatro",
    location: { name: "Teatro Leal, La Laguna", lat: 28.4862, lng: -16.3136 },
    color: "#7c3aed",
    price: "10€",
    description: "Representación del clásico de Lorca por la compañía de teatro insular. Una puesta en escena moderna y visualmente impactante que reinterpreta la tragedia lorquiana con raíces canarias.",
    imagen: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1200&h=600&fit=crop",
    enlace_compra: "https://www.teatroleal.es/entradas",
  },
  {
    id: "11",
    title: "Yoga al Amanecer en El Médano",
    date: "2026-05-15",
    startTime: "06:00",
    endTime: "07:30",
    category: "Bienestar",
    location: { name: "Playa de El Médano, Granadilla", lat: 28.0454, lng: -16.5364 },
    color: "#059669",
    price: "Gratis",
    description: "Sesión de yoga al amanecer frente al mar con vista a la Montaña Roja. Conecta cuerpo y mente mientras el sol emerge sobre el horizonte atlántico en una de las playas más bellas de Tenerife.",
    imagen: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=600&fit=crop",
    enlace_compra: null,
  },
  {
    id: "12",
    title: "Mercado del Agricultor",
    date: "2026-05-17",
    startTime: "07:00",
    endTime: "13:00",
    category: "Feria",
    location: { name: "Mercado del Agricultor, Adeje", lat: 28.1227, lng: -16.7260 },
    color: "#facc15",
    price: "Gratis",
    description: "Productos frescos de kilómetro cero: frutas tropicales, verduras y flores. Conecta directamente con los agricultores de Tenerife y lleva a casa lo mejor de la tierra volcánica.",
    imagen: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=600&fit=crop",
    enlace_compra: null,
  },
  {
    id: "13",
    title: "Exposición Fotográfica: Paisajes Volcánicos",
    date: "2026-05-28",
    startTime: "11:00",
    endTime: "18:00",
    category: "Arte",
    location: { name: "Castillo de San Miguel, Garachico", lat: 28.3726, lng: -16.7638 },
    color: "#d97706",
    price: "3€",
    description: "Fotografías del Teide y los paisajes volcánicos de Tenerife a lo largo de las estaciones. Una colección impresionante que captura la majestuosidad del volcán más alto de España en todas sus formas.",
    imagen: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1200&h=600&fit=crop",
    enlace_compra: "https://www.garachico.es/cultura",
  },
];

export function getEventsByDate(date: string): MockEvent[] {
  return mockEvents.filter((e) => e.date === date);
}

export function getEventById(id: string): MockEvent | undefined {
  return mockEvents.find((e) => e.id === id);
}

export function getDatesWithEvents(): string[] {
  return [...new Set(mockEvents.map((e) => e.date))];
}
