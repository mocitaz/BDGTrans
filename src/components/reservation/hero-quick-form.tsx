"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, BusFront, CalendarDays, Users } from "lucide-react";
import { fleet } from "@/constants/fleet";
import { jakartaNow } from "@/lib/date-time";
import { Button } from "@/components/ui/button";
export function HeroQuickForm() {
  const router = useRouter();
  const [today, setToday] = useState("");
  useEffect(() => {
    const frame = requestAnimationFrame(() => setToday(jakartaNow().date));
    return () => cancelAnimationFrame(frame);
  }, []);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const date = String(data.get("tanggal"));
    if (date < jakartaNow().date) {
      const input = form.elements.namedItem("tanggal") as HTMLInputElement;
      input.setCustomValidity(
        "Tanggal jemput tidak boleh sebelum hari ini (WIB).",
      );
      input.reportValidity();
      return;
    }
    const params = new URLSearchParams({
      armada: String(data.get("armada")),
      tanggal: date,
      penumpang: String(data.get("penumpang")),
    });
    router.push(`/?${params.toString()}#reservasi`);
  }
  return (
    <form
      className="hero-quick-form"
      aria-label="Rencanakan perjalanan"
      onSubmit={submit}
    >
      <div className="hero-quick-fields">
        <div className="hero-quick-field">
          <label htmlFor="hero-armada">
            <BusFront size={16} />
            Pilihan armada
          </label>
          <select id="hero-armada" name="armada" required defaultValue="">
            <option value="" disabled>
              Pilih kendaraan
            </option>
            {fleet.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hero-quick-field">
          <label htmlFor="hero-tanggal">
            <CalendarDays size={16} />
            Tanggal jemput
          </label>
          <input
            id="hero-tanggal"
            name="tanggal"
            type="date"
            required
            min={today}
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </div>
        <div className="hero-quick-field">
          <label htmlFor="hero-penumpang">
            <Users size={16} />
            Penumpang
          </label>
          <input
            id="hero-penumpang"
            name="penumpang"
            type="number"
            min={1}
            max={60}
            step={1}
            required
            placeholder="Jumlah orang"
          />
        </div>
        <Button type="submit" className="hero-quick-submit">
          Minta Penawaran <ArrowUpRight size={18} />
        </Button>
      </div>
      <p className="hero-quick-note">
        Lengkapi detail perjalanan pada langkah berikutnya.
      </p>
    </form>
  );
}
