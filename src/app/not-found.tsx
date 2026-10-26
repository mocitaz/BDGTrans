import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { buttonVariants } from "@/components/ui/button";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container section min-h-[65vh]">
        <div className="eyebrow">HALAMAN TIDAK DITEMUKAN · 404</div>
        <h1 className="section-heading">
          Sepertinya kita perlu
          <br />
          kembali ke rencana awal.
        </h1>
        <p className="mb-8">
          Halaman atau pilihan armada yang Anda cari tidak tersedia.
        </p>
        <Link className={buttonVariants()} href="/">
          Kembali ke Beranda
        </Link>
      </main>
      <Footer />
    </>
  );
}
