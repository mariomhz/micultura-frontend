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
}

export const mockEvents: MockEvent[] = [
  {
    id: "1",
    title: "Festival de la Calle San Sebastián",
    date: "2026-05-15",
    startTime: "18:00",
    endTime: "23:00",
    category: "Festival",
    location: { name: "Viejo San Juan", lat: 18.4655, lng: -66.1057 },
    color: "#7c3aed",
  },
  {
    id: "2",
    title: "Exposición de Arte Contemporáneo",
    date: "2026-05-16",
    startTime: "10:00",
    endTime: "17:00",
    category: "Arte",
    location: { name: "Museo de Arte de Puerto Rico, Santurce", lat: 18.4468, lng: -66.0625 },
    color: "#d97706",
  },
  {
    id: "3",
    title: "Concierto de Plena en la Plaza",
    date: "2026-05-17",
    startTime: "19:00",
    endTime: "22:00",
    category: "Música",
    location: { name: "Plaza de Armas, San Juan", lat: 18.4663, lng: -66.1169 },
    color: "#dc2626",
  },
  {
    id: "4",
    title: "Taller de Bomba y Plena",
    date: "2026-05-18",
    startTime: "14:00",
    endTime: "16:00",
    category: "Taller",
    location: { name: "Centro Cultural de Loíza", lat: 18.4313, lng: -65.8801 },
    color: "#059669",
  },
  {
    id: "5",
    title: "Feria de Artesanías",
    date: "2026-05-20",
    startTime: "09:00",
    endTime: "18:00",
    category: "Feria",
    location: { name: "Paseo de la Princesa, San Juan", lat: 18.4607, lng: -66.1161 },
    color: "#facc15",
  },
  {
    id: "6",
    title: "Noche de Trova",
    date: "2026-05-20",
    startTime: "20:00",
    endTime: "23:30",
    category: "Música",
    location: { name: "La Terraza de Bonanza, Ponce", lat: 18.0115, lng: -66.6141 },
    color: "#dc2626",
  },
  {
    id: "7",
    title: "Recorrido Histórico por el Morro",
    date: "2026-05-22",
    startTime: "08:00",
    endTime: "11:00",
    category: "Historia",
    location: { name: "Castillo San Felipe del Morro", lat: 18.4706, lng: -66.1238 },
    color: "#7c3aed",
  },
  {
    id: "8",
    title: "Festival de Cine Puertorriqueño",
    date: "2026-05-23",
    startTime: "17:00",
    endTime: "22:00",
    category: "Cine",
    location: { name: "Fine Arts Miramar, San Juan", lat: 18.4510, lng: -66.0775 },
    color: "#0891b2",
  },
  {
    id: "9",
    title: "Clase de Cocina Criolla",
    date: "2026-05-24",
    startTime: "10:00",
    endTime: "13:00",
    category: "Gastronomía",
    location: { name: "Escuela de Cocina, Mayagüez", lat: 18.2013, lng: -67.1397 },
    color: "#d97706",
  },
  {
    id: "10",
    title: "Teatro: La Carreta",
    date: "2026-05-25",
    startTime: "19:30",
    endTime: "21:30",
    category: "Teatro",
    location: { name: "Teatro Tapia, San Juan", lat: 18.4636, lng: -66.1163 },
    color: "#7c3aed",
  },
  {
    id: "11",
    title: "Yoga al Amanecer en la Playa",
    date: "2026-05-15",
    startTime: "06:00",
    endTime: "07:30",
    category: "Bienestar",
    location: { name: "Playa de Ocean Park, San Juan", lat: 18.4557, lng: -66.0619 },
    color: "#059669",
  },
  {
    id: "12",
    title: "Mercado Agrícola Natural",
    date: "2026-05-17",
    startTime: "07:00",
    endTime: "13:00",
    category: "Feria",
    location: { name: "Old San Juan Farmers Market", lat: 18.4657, lng: -66.1174 },
    color: "#facc15",
  },
  {
    id: "13",
    title: "Exhibición de Fotografía Boricua",
    date: "2026-05-28",
    startTime: "11:00",
    endTime: "18:00",
    category: "Arte",
    location: { name: "Museo de Arte de Ponce", lat: 18.0070, lng: -66.6125 },
    color: "#d97706",
  },
];

export function getEventsByDate(date: string): MockEvent[] {
  return mockEvents.filter((e) => e.date === date);
}

export function getDatesWithEvents(): string[] {
  return [...new Set(mockEvents.map((e) => e.date))];
}
