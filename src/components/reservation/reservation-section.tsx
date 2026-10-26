"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { adminChat } from "@/lib/whatsapp";
import { reservationCopy } from "@/constants/brand";
function FormPlaceholder() {
  return (
    <div className="container section min-h-[1100px] md:min-h-[900px]">
      <h2 className="section-heading">{reservationCopy.title}</h2>
      <p role="status">Menyiapkan formulir perjalanan…</p>
      <noscript>
        <p>
          Aktifkan JavaScript untuk mengisi formulir, atau{" "}
          <a href={adminChat} className="text-link">
            hubungi admin melalui WhatsApp
          </a>
          .
        </p>
      </noscript>
    </div>
  );
}
const Form = dynamic(
  () => import("./reservation-form").then((module) => module.ReservationForm),
  { ssr: false, loading: FormPlaceholder },
);
export function ReservationSection() {
  const target = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.location.hash === "#reservasi") {
      target.current?.scrollIntoView({ behavior: "instant", block: "start" });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px" },
    );
    if (target.current) observer.observe(target.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div id="reservasi" ref={target} className="scroll-mt-24 bg-[#f5f7fb]">
      {ready ? (
        <Suspense fallback={<FormPlaceholder />}>
          <Form />
        </Suspense>
      ) : (
        <FormPlaceholder />
      )}
    </div>
  );
}
