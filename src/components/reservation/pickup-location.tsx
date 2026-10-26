"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, LocateFixed, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PlanField, usePlanForm, useFieldAttributes } from "./plan-field";

export function PickupLocation() {
  const { register, setValue } = usePlanForm();
  const attributes = useFieldAttributes("pickupMapUrl");
  const [pending, setPending] = useState(false),
    [error, setError] = useState("");
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);
  const request = useRef(0);
  useEffect(
    () => () => {
      request.current++;
    },
    [],
  );
  function locate() {
    setError("");
    setPosition(null);
    if (!window.isSecureContext || !navigator.geolocation) {
      setError(
        "Lokasi perangkat tidak tersedia. Isi alamat atau tempel tautan Google Maps.",
      );
      return;
    }
    const id = ++request.current;
    setPending(true);
    navigator.geolocation.getCurrentPosition(
      (result) => {
        if (id !== request.current) return;
        setPending(false);
        const { latitude, longitude, accuracy } = result.coords;
        if (
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude) ||
          Math.abs(latitude) > 90 ||
          Math.abs(longitude) > 180
        ) {
          setError(
            "Titik lokasi tidak valid. Gunakan alamat atau tautan Maps.",
          );
          return;
        }
        setPosition({ latitude, longitude, accuracy });
      },
      (result) => {
        if (id !== request.current) return;
        setPending(false);
        setError(
          result.code === 1
            ? "Izin lokasi tidak diberikan. Kamu tetap bisa mengisi alamat atau tautan Maps."
            : result.code === 3
              ? "Pencarian lokasi melewati batas waktu. Coba lagi atau isi tautan Maps."
              : "Lokasi belum dapat ditemukan. Coba lagi atau isi alamat manual.",
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 },
    );
  }
  const map = position
    ? `https://www.google.com/maps/search/?api=1&query=${position.latitude.toFixed(6)},${position.longitude.toFixed(6)}`
    : "";
  return (
    <div className="plan-map-field">
      <PlanField name="pickupMapUrl" label="Tautan Google Maps (opsional)">
        <Input
          {...attributes}
          {...register("pickupMapUrl")}
          type="url"
          maxLength={1200}
          placeholder="https://maps.app.goo.gl/…"
          inputMode="url"
        />
      </PlanField>
      <button
        className="plan-text-button"
        type="button"
        onClick={locate}
        disabled={pending}
      >
        <LocateFixed size={15} />
        {pending ? "Mencari lokasi…" : "Gunakan lokasi saya"}
      </button>
      {error && (
        <p className="plan-location-error" role="status">
          {error}
        </p>
      )}
      {position && (
        <div className="plan-location-preview" role="status">
          <MapPin size={22} aria-hidden="true" />
          <div>
            <strong>Periksa titik penjemputan</strong>
            <p>
              {position.latitude.toFixed(6)}, {position.longitude.toFixed(6)} ·
              akurasi perkiraan {Math.round(position.accuracy)} m
            </p>
            <a href={map} target="_blank" rel="noopener noreferrer">
              Lihat pin di Maps <ExternalLink size={13} aria-hidden="true" />
              <span className="sr-only"> (tab baru)</span>
            </a>
            <div className="plan-location-actions">
              <button
                type="button"
                className="plan-small-primary"
                onClick={() => {
                  setValue("pickupMapUrl", map, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  setPosition(null);
                }}
              >
                Gunakan titik ini
              </button>
              <button
                type="button"
                className="plan-text-button"
                onClick={() => setPosition(null)}
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
