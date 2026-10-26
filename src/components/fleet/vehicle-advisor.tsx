"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { recommendVehicles } from "@/lib/vehicle-advisor";
import { configurationNotice } from "@/constants/vehicle-configurations";
import { tripTypes } from "@/constants/fleet";
import type { FleetSlug } from "@/types/content";

export interface AdvisorSelection {
  slug: FleetSlug;
  passengers: number;
  bags: number;
  purpose: string;
  units: number;
}

export function VehicleAdvisor({
  onChoose,
  hero = false,
  initialRequest,
}: {
  onChoose?: (selection: AdvisorSelection) => void;
  hero?: boolean;
  initialRequest?: { passengers: number; bags: number; purpose: string };
}) {
  const router = useRouter();
  const selected = useRef(false);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof recommendVehicles>>(
    [],
  );
  const [request, setRequest] = useState({
    passengers: 6,
    bags: 2,
    purpose: "keluarga",
  });
  const [submitted, setSubmitted] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    setResults(
      recommendVehicles(request.passengers, request.bags, request.purpose),
    );
    setSubmitted(true);
  }
  function choose(slug: FleetSlug, units: number) {
    selected.current = true;
    const selection = { slug, units, ...request };
    if (onChoose) onChoose(selection);
    else
      router.push(
        `/?${new URLSearchParams({ armada: slug, penumpang: String(request.passengers), unit: String(units), koper: String(request.bags), jenis: request.purpose })}#reservasi`,
      );
    setOpen(false);
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value && initialRequest) {
          setRequest(initialRequest);
          setSubmitted(false);
          setResults([]);
        }
        setOpen(value);
      }}
    >
      <DialogTrigger
        className={
          hero ? "advisor-trigger advisor-trigger-hero" : "advisor-trigger"
        }
      >
        Bantu pilih kendaraan <ArrowUpRight size={15} aria-hidden="true" />
      </DialogTrigger>
      <DialogContent
        className="advisor-dialog"
        onCloseAutoFocus={(event) => {
          if (selected.current) {
            event.preventDefault();
            selected.current = false;
            if (onChoose)
              document
                .getElementById("fleetSlug")
                ?.focus({ preventScroll: true });
          }
        }}
      >
        <DialogTitle className="advisor-title">
          Cari yang pas untuk perjalananmu.
        </DialogTitle>
        <DialogDescription className="advisor-description">
          Ceritakan jumlah rombongan dan barang bawaanmu.
        </DialogDescription>
        <p className="plan-disclaimer">{configurationNotice}</p>
        <form onSubmit={submit} className="advisor-form">
          <label htmlFor="advisor-passengers">
            Penumpang
            <input
              id="advisor-passengers"
              type="number"
              min="1"
              max="60"
              step="1"
              required
              value={request.passengers || ""}
              onChange={(event) => {
                setRequest({
                  ...request,
                  passengers: Number(event.target.value),
                });
                setSubmitted(false);
              }}
            />
          </label>
          <label htmlFor="advisor-bags">
            Koper sedang
            <input
              id="advisor-bags"
              type="number"
              min="0"
              max="60"
              step="1"
              required
              value={Number.isNaN(request.bags) ? "" : request.bags}
              onChange={(event) => {
                setRequest({
                  ...request,
                  bags:
                    event.target.value === ""
                      ? NaN
                      : Number(event.target.value),
                });
                setSubmitted(false);
              }}
            />
          </label>
          <label htmlFor="advisor-purpose">
            Keperluan
            <select
              id="advisor-purpose"
              value={request.purpose}
              onChange={(event) => {
                setRequest({ ...request, purpose: event.target.value });
                setSubmitted(false);
              }}
            >
              {Object.entries(tripTypes).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <button className="plan-primary" type="submit">
            Lihat saran kendaraan
          </button>
        </form>
        <div className="advisor-results" aria-live="polite">
          {submitted && (
            <p className="advisor-results-label">
              Pilihan berdasarkan contoh kursi dan bagasi
            </p>
          )}
          {submitted &&
            results.map(({ vehicle, configuration, units, seats }) => (
              <article className="advisor-result" key={vehicle.slug}>
                <div className="advisor-result-image">
                  <Image
                    src={vehicle.image}
                    alt={`Ilustrasi ${vehicle.name}`}
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3>{vehicle.name}</h3>
                  <p>
                    {units} unit · contoh {seats} penumpang/unit
                  </p>
                  <p>{configuration.focus}</p>
                  <p className="advisor-reason">
                    Perkiraan {units * seats} tempat penumpang dan{" "}
                    {units * configuration.mediumBags} koper sedang untuk{" "}
                    {request.passengers} peserta, {request.bags} koper.
                  </p>
                  <button
                    type="button"
                    onClick={() => choose(vehicle.slug, units)}
                  >
                    Gunakan rencana ini{" "}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          {submitted && results.length === 0 && (
            <p>
              Periksa kembali jumlah peserta dan koper. Admin bisa membantu
              membahas rencana yang lebih besar.
            </p>
          )}
        </div>
        <DialogClose className="advisor-cancel">Kembali ke halaman</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
