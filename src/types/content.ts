export type FleetSlug =
  "hiace-commuter" | "hiace-premio" | "elf-tayo" | "innova-reborn" | "avanza";
export interface FleetItem {
  slug: FleetSlug;
  name: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  category: "minibus" | "mpv";
  capacity?: number;
  facilities?: string[];
  imageIsIllustration: boolean;
  useCases: string[];
}
export interface ServiceItem {
  id: "wisata" | "dinas" | "bandara" | "keluarga";
  title: string;
  description: string;
}
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
export interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  context?: string;
  highlight?: string;
  avatar?: string;
  verified: boolean;
  permissionGranted: boolean;
}
