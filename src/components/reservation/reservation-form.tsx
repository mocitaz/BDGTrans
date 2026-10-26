"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle, ArrowUpRight, Info } from "lucide-react";
import { reservationCopy } from "@/constants/brand";
import {
  reservationSchema,
  jakartaNow,
  fleetSlugs,
  tripTypeKeys,
  type ReservationData,
  type ReservationInput,
} from "@/lib/reservation-schema";
import {
  buildReservationMessage,
  buildWhatsAppUrl,
  adminChat,
} from "@/lib/whatsapp";
import { validCalendarDate } from "@/lib/date-time";
import { Button } from "@/components/ui/button";
import { ReservationFields } from "./reservation-fields";
import { ReservationSummary } from "./reservation-summary";
export function ReservationForm() {
  const params = useSearchParams();
  const [summary, setSummary] = useState<ReservationData | null>(null);
  const selectedSlug = params.get("armada");
  const invalidFleet = Boolean(
    selectedSlug && !fleetSlugs.some((slug) => slug === selectedSlug),
  );
  const [minimumDate, setMinimumDate] = useState("");
  const [status, setStatus] = useState("");
  const form = useForm<ReservationInput, unknown, ReservationData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      fullName: "",
      whatsappNumber: "",
      passengers: 1,
      vehicleQuantity: 1,
      additionalVehicles: [],
      luggageCount: 0,
      pickupDate: "",
      pickupTime: "",
      endDate: "",
      endTime: "",
      journeyType: "one-way",
      overnight: false,
      pickupLocation: "",
      pickupMapUrl: "",
      stops: [],
      destination: "",
      transferKind: "bandara",
      transportNumber: "",
      arrivalTime: "",
      companyName: "",
      needsQuotation: false,
      tourAgenda: "",
      notes: "",
      consent: false,
    },
  });
  const {
    handleSubmit,
    setValue,
    control,
    setFocus,
    formState: { errors, isSubmitting },
  } = form;
  const consent = useWatch({ control, name: "consent" });
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setMinimumDate(jakartaNow().date),
    );
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    const slug = params.get("armada");
    const type = params.get("jenis");
    const date = params.get("tanggal");
    const passengers = params.get("penumpang");
    const units = params.get("unit");
    const bags = params.get("koper");
    const valid = slug && fleetSlugs.some((item) => item === slug);
    const frame = requestAnimationFrame(() => {
      if (valid) {
        setValue("fleetSlug", slug as ReservationInput["fleetSlug"]);
        setSummary(null);
      } else if (slug)
        setValue("fleetSlug", "" as ReservationInput["fleetSlug"]);
      if (type && tripTypeKeys.some((item) => item === type)) {
        setValue("tripType", type as ReservationInput["tripType"]);
        setSummary(null);
      }
      if (date && validCalendarDate(date) && date >= jakartaNow().date) {
        setValue("pickupDate", date);
        setSummary(null);
      }
      if (
        passengers &&
        /^\d{1,2}$/.test(passengers) &&
        Number(passengers) >= 1 &&
        Number(passengers) <= 60
      ) {
        setValue("passengers", Number(passengers));
        setSummary(null);
      }
      if (
        units &&
        /^\d{1,2}$/.test(units) &&
        Number(units) >= 1 &&
        Number(units) <= 10
      ) {
        setValue("vehicleQuantity", Number(units));
        setSummary(null);
      }
      if (
        bags &&
        /^\d{1,2}$/.test(bags) &&
        Number(bags) >= 0 &&
        Number(bags) <= 60
      ) {
        setValue("luggageCount", Number(bags));
        setSummary(null);
      }
      if (slug || type || date || passengers || units || bags)
        document
          .getElementById("reservation-heading")
          ?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [params, setValue]);
  const submit = (data: ReservationData) => {
    setSummary(data);
    setStatus("Detail valid. Periksa ringkasan sebelum membuka WhatsApp.");
    requestAnimationFrame(() =>
      document.getElementById("summary-heading")?.focus(),
    );
  };
  const openWhatsApp = () => {
    if (!summary) return;
    const fresh = reservationSchema.safeParse(summary);
    if (!fresh.success) {
      setSummary(null);
      setStatus(
        "Waktu penjemputan perlu diperiksa kembali. Silakan perbarui detail perjalanan.",
      );
      return;
    }
    window.location.assign(
      buildWhatsAppUrl(buildReservationMessage(fresh.data)),
    );
  };
  return (
    <section
      className="section reservation-section"
      aria-labelledby="reservation-heading"
    >
      <div className="container reservation-layout">
        <aside className="reservation-intro">
          <div className="reservation-intro-copy" data-reveal="up">
            <h2 id="reservation-heading" tabIndex={-1}>
              {reservationCopy.title}
            </h2>
            <p className="reservation-intro-body">{reservationCopy.body}</p>
          </div>
          <div
            className="reservation-portrait"
            data-reveal="fade"
            data-reveal-delay="80"
          >
            <Image
              src={reservationCopy.image}
              alt={reservationCopy.imageAlt}
              fill
              sizes="(max-width:639px) calc(100vw - 40px), (max-width:1023px) 32vw, 440px"
              className="reservation-portrait-image"
            />
            <a href={adminChat} className="reservation-help">
              <MessageCircle size={17} />
              Tanya Admin <ArrowUpRight size={16} />
            </a>
          </div>
        </aside>
        <div className="reservation-form-shell">
          <p className="sr-only" role="status" aria-live="polite">
            {status}
          </p>
          {invalidFleet && (
            <p role="status" className="reservation-alert">
              Armada pada tautan tidak dikenal. Silakan pilih kendaraan dari
              daftar.
            </p>
          )}
          {summary ? (
            <ReservationSummary
              data={summary}
              onContinue={openWhatsApp}
              onEdit={() => {
                setSummary(null);
                requestAnimationFrame(() => setFocus("fullName"));
              }}
            />
          ) : (
            <FormProvider {...form}>
              <form
                noValidate
                onSubmit={handleSubmit(submit, () =>
                  setStatus(
                    "Periksa field yang ditandai. Detail perjalanan belum lengkap atau belum valid.",
                  ),
                )}
              >
                <ReservationFields minimumDate={minimumDate} />
                <Button
                  className="reservation-review-submit"
                  type="submit"
                  disabled={!consent || isSubmitting}
                >
                  Periksa Permintaan <ArrowUpRight size={17} />
                </Button>
                {Object.keys(errors).length > 0 && (
                  <p role="alert" className="field-error">
                    Periksa field yang ditandai sebelum melanjutkan.
                  </p>
                )}
                <p className="reservation-legal-note">
                  <Info size={14} />
                  <span>
                    Pengajuanmu belum mengikat. Ketersediaan unit dan harga
                    terbaik akan disepakati bareng admin via WhatsApp.
                  </span>
                </p>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </section>
  );
}
