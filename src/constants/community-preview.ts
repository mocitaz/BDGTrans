import type { TestimonialItem } from "@/types/content";
import type { PartnerItem } from "@/constants/partners";

export const previewTestimonials: TestimonialItem[] = [
  {
    id: "preview-family",
    name: "Dina P.",
    avatar: "/images/testimonials/dina-preview.webp",
    context: "Liburan keluarga · Lembang",
    quote:
      "Kami pergi sekeluarga ke Lembang. Enaknya, rute dan kebutuhan perjalanan bisa dibahas dulu, jadi persiapannya lebih tenang.",
    highlight: "persiapannya lebih tenang",
    verified: false,
    permissionGranted: false,
  },
  {
    id: "preview-office",
    name: "Rizky A.",
    avatar: "/images/testimonials/rizky-preview.webp",
    context: "Perjalanan kantor · Bandung",
    quote:
      "Buat perjalanan kantor, saya perlu menyamakan jadwal banyak orang. Terbantu karena detailnya bisa dibicarakan langsung dengan admin.",
    highlight: "dibicarakan langsung dengan admin",
    verified: false,
    permissionGranted: false,
  },
  {
    id: "preview-group",
    name: "Anisa R.",
    avatar: "/images/testimonials/anisa-preview.webp",
    context: "Wisata rombongan · Ciwidey",
    quote:
      "Sebelum berangkat, saya bisa tanya soal pilihan mobil dan titik jemput. Jadi lebih mudah menyesuaikan rencana dengan kebutuhan rombongan.",
    highlight: "menyesuaikan rencana",
    verified: false,
    permissionGranted: false,
  },
];

const previewInstitutions = [
  ["kemenkeu", "Kementerian Keuangan"],
  ["disdik-jabar", "Disdik Jawa Barat"],
  ["telkom", "Telkom Indonesia"],
  ["dispora", "Dispora Bandung"],
  ["pertamina", "Pertamina"],
  ["kai", "Kereta Api Indonesia"],
  ["pos", "Pos Indonesia"],
  ["mandiri", "Bank Mandiri"],
  ["ojk", "Otoritas Jasa Keuangan"],
  ["itb", "Institut Teknologi Bandung"],
  ["bps", "Badan Pusat Statistik"],
  ["telkomsel", "Telkomsel"],
  ["it-telu", "Telkom University"],
  ["unpar", "Universitas Parahyangan"],
  ["polban", "Politeknik Negeri Bandung"],
] as const;

export const previewPartners: PartnerItem[] = previewInstitutions.map(
  ([id, name]) => ({
    id: `preview-${id}`,
    name,
    logo: `/brand/partners/${id}.webp`,
    verified: false,
    permissionGranted: false,
  }),
);
