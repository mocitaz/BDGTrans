"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="container section min-h-[70vh]">
      <h1 className="section-heading">Halaman belum dapat dimuat.</h1>
      <p className="mb-7">
        Silakan coba kembali atau hubungi admin melalui WhatsApp.
      </p>
      <Button onClick={reset}>Coba Kembali</Button>
      <a className="text-link ml-6" href="https://wa.me/6289528051760">
        Hubungi Admin
      </a>
    </main>
  );
}
