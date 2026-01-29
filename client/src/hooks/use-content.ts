import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { contentSchema, type ContentData } from "@shared/schema";
import { z } from "zod";

export const defaultContent: ContentData = {
  hero: {
    title1: "INHARA",
    title2: "YOGA",
    subtitle: "Conecta cuerpo, mente y alma a través de la práctica consciente.",
    buttonReserve: "Reservar Clase",
    buttonOnline: "Estudio Online",
  },
  services: {
    title: "Nuestras Clases",
    subtitle: "Explora diferentes estilos para cada momento de tu vida",
    items: [
      { title: "Vinyasa Flow", description: "Movimiento fluido sincronizado con la respiración.", image: "/assets/yoga_meditation_peac_79cb9c1b.jpg" },
      { title: "Hatha Yoga", description: "Posturas estáticas para alinear cuerpo y mente.", image: "/assets/yoga_meditation_peac_ef8e6e3a.jpg" },
      { title: "Yin Yoga", description: "Práctica pasiva y restaurativa profunda.", image: "/assets/yoga_meditation_peac_8b4326e1.jpg" },
    ],
  },
  reservation: {
    title: "Reserva tu Esterilla",
    subtitle: "Descarga nuestra app y gestiona tus clases fácilmente",
    description: "La forma más sencilla de reservar tu espacio, ver horarios y gestionar tu abono.",
    buttonIos: "Descargar para iOS",
    buttonAndroid: "Descargar para Android",
    appStoreUrl: "#",
    playStoreUrl: "#",
    features: [
      { title: "Reserva flexible", description: "Reserva y cancela con facilidad." },
      { title: "Horarios en vivo", description: "Consulta la disponibilidad real." },
    ],
    steps: ["Descarga la App", "Crea tu cuenta", "Elige tu clase", "Nos vemos en el mat"],
  },
  online: {
    title: "Tu Práctica, Donde Estés",
    subtitle: "Estudio Online",
    featuredTitle: "Clases Destacadas",
    classPreviews: [
      { title: "Morning Flow", duration: "20 min", level: "Todos", isLocked: false },
      { title: "Power Vinyasa", duration: "45 min", level: "Intermedio", isLocked: true },
      { title: "Meditación Guiada", duration: "10 min", level: "Todos", isLocked: false },
    ],
    patreonTitle: "Únete a la Comunidad en Patreon",
    patreonDescription: "Accede a cientos de clases exclusivas, talleres y contenido profundo.",
    patreonPrice: "Desde 15€/mes",
    patreonButton: "Suscribirse en Patreon",
    patreonUrl: "https://patreon.com",
    patreonFeatures: ["Biblioteca completa (+200 clases)", "Nuevas clases semanales", "Talleres mensuales en vivo"],
    freeTitle: "Contenido Gratuito",
    freeDescription: "Empieza tu viaje con nuestras clases de introducción.",
    freeButton: "Ver en YouTube",
    freeUrl: "https://youtube.com",
  },
  about: {
    title: "Sobre Inhara",
    paragraphs: [
      "Inhara Yoga nació del deseo de crear un espacio seguro donde cada persona pueda explorar su propio camino.",
      "Creemos que el yoga es una herramienta poderosa para el autoconocimiento y la transformación personal.",
    ],
    communityCount: "+500",
    communityLabel: "Alumnos felices",
    image: "/assets/serene_yoga_studio_hero.png",
    values: [
      { title: "Comunidad", description: "Crecemos juntos en cada práctica." },
      { title: "Autenticidad", description: "Sé tú mismo, siempre." },
    ],
  },
  contact: {
    instagram: "@inharayoga",
    instagramUrl: "https://instagram.com",
    email: "hola@inharayoga.com",
    location: "C/ Ejemplo 123, Madrid",
    copyright: "© 2024 Inhara Yoga. Todos los derechos reservados.",
  },
};

export function useContent() {
  return useQuery({
    queryKey: [api.content.get.path],
    queryFn: async () => {
      const res = await fetch(api.content.get.path);
      if (!res.ok) throw new Error("Failed to fetch content");
      const data = await res.json();
      
      // If backend returns null/empty (first run), use default
      if (!data || Object.keys(data).length === 0) return defaultContent;
      
      // Parse content to ensure it matches schema
      const result = contentSchema.safeParse(data);
      if (!result.success) {
        console.warn("Content validation failed, using default/partial", result.error);
        return { ...defaultContent, ...data }; // Fallback merge
      }
      return result.data;
    },
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ content, token }: { content: ContentData; token: string }) => {
      const res = await fetch(api.content.update.path, {
        method: api.content.update.method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update content");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.content.get.path] });
    },
  });
}
