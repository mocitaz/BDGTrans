export const quoteScope = [
  {
    label: "Sopir",
    detail: "Apakah sopir termasuk, serta bagaimana jam tugasnya.",
  },
  {
    label: "BBM",
    detail: "Apakah bahan bakar termasuk atau dihitung terpisah.",
  },
  {
    label: "Tol & parkir",
    detail: "Siapa yang menanggung biaya selama perjalanan.",
  },
  {
    label: "Durasi",
    detail: "Batas jam pemakaian dan ketentuan jika melebihi waktu.",
  },
  {
    label: "Menginap",
    detail: "Kebutuhan akomodasi dan konsumsi sopir bila bermalam.",
  },
  {
    label: "Rute",
    detail: "Titik jemput, tujuan, dan perubahan rute yang disepakati.",
  },
] as const;

export const quoteScopeSummary =
  "Konfirmasikan apakah sopir, BBM, tol, dan parkir termasuk dalam penawaran. Sepakati juga durasi pemakaian, biaya kelebihan waktu, serta akomodasi dan konsumsi sopir jika perjalanan menginap. Rincian mengikuti penawaran admin, bukan paket otomatis dari website.";
