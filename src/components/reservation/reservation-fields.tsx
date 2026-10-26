"use client";

import { useWatch } from "react-hook-form";
import { useEffect } from "react";
import { UserRound, CalendarDays } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { tripDuration, journeyLabels } from "@/lib/travel-plan";
import { PlanField, usePlanForm, useFieldAttributes } from "./plan-field";
import { FleetRequestFields } from "./fleet-request-fields";
import { ServiceFields } from "./service-fields";
import { RouteFields } from "./route-fields";

export function ReservationFields({ minimumDate }: { minimumDate: string }) {
  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = usePlanForm();
  const [pickupDate, pickupTime, endDate, endTime] = useWatch({
    control,
    name: ["pickupDate", "pickupTime", "endDate", "endTime"],
  });
  const duration = tripDuration(
    pickupDate ?? "",
    pickupTime ?? "",
    endDate ?? "",
    endTime ?? "",
  );
  const finishError = Boolean(errors.endTime);
  useEffect(() => {
    if (finishError) void trigger("endTime");
  }, [pickupDate, pickupTime, endDate, endTime, finishError, trigger]);
  const fullName = useFieldAttributes("fullName", true),
    whatsapp = useFieldAttributes("whatsappNumber", true),
    pickup = useFieldAttributes("pickupDate", true),
    pickupHour = useFieldAttributes("pickupTime", true),
    end = useFieldAttributes("endDate", true),
    endHour = useFieldAttributes("endTime", true),
    notes = useFieldAttributes("notes"),
    consent = useFieldAttributes("consent", true);
  return (
    <div className="reservation-fields">
      <fieldset>
        <legend>
          <UserRound size={15} />
          Kontak kamu <span>Wajib diisi *</span>
        </legend>
        <div className="reservation-grid reservation-contact-grid">
          <PlanField name="fullName" label="Nama lengkap" required>
            <Input
              {...fullName}
              {...register("fullName")}
              autoComplete="name"
              maxLength={100}
              placeholder="Nama lengkap pemesan"
            />
          </PlanField>
          <PlanField name="whatsappNumber" label="Nomor WhatsApp" required>
            <Input
              {...whatsapp}
              {...register("whatsappNumber")}
              autoComplete="tel"
              type="tel"
              maxLength={25}
              placeholder="08xxxxxxxxxx"
            />
          </PlanField>
        </div>
      </fieldset>
      <ServiceFields />
      <FleetRequestFields />
      <fieldset>
        <legend>
          <CalendarDays size={15} />
          Jadwal perjalanan
        </legend>
        <div
          className="plan-direction"
          role="group"
          aria-label="Arah perjalanan"
        >
          {Object.entries(journeyLabels).map(([value, label]) => (
            <label key={value}>
              <input type="radio" value={value} {...register("journeyType")} />
              {label}
            </label>
          ))}
        </div>
        <div className="reservation-grid plan-schedule-grid">
          <PlanField name="pickupDate" label="Tanggal jemput" required>
            <Input
              {...pickup}
              {...register("pickupDate")}
              type="date"
              min={minimumDate}
            />
          </PlanField>
          <PlanField name="pickupTime" label="Jam jemput (WIB)" required>
            <Input {...pickupHour} {...register("pickupTime")} type="time" />
          </PlanField>
          <PlanField name="endDate" label="Tanggal selesai" required>
            <Input
              {...end}
              {...register("endDate")}
              type="date"
              min={pickupDate || minimumDate}
            />
          </PlanField>
          <PlanField name="endTime" label="Jam selesai (WIB)" required>
            <Input {...endHour} {...register("endTime")} type="time" />
          </PlanField>
        </div>
        <label className="plan-checkbox">
          <input type="checkbox" id="overnight" {...register("overnight")} />
          Perjalanan membutuhkan menginap
        </label>
        {duration && (
          <p className="plan-duration" role="status">
            Rentang jadwal: <strong>{duration}</strong>. Bukan perhitungan hari
            sewa atau harga.
          </p>
        )}
        <p className="reservation-field-hint">
          Semua waktu dalam WIB. Untuk lewat tengah malam, pilih tanggal selesai
          berikutnya.
        </p>
      </fieldset>
      <RouteFields />
      <PlanField
        name="notes"
        label="Catatan tambahan (opsional)"
        className="reservation-note"
      >
        <Textarea
          {...notes}
          {...register("notes")}
          maxLength={1000}
          rows={1}
          placeholder="Ada kebutuhan khusus? Tulis di sini."
        />
      </PlanField>
      <div className="reservation-consent">
        <label htmlFor="consent">
          <input {...consent} {...register("consent")} type="checkbox" />
          Saya setuju detail perjalanan ini dibuka di WhatsApp untuk konsultasi
          dengan admin BDG TRANS.
        </label>
        {errors.consent && (
          <p id="consent-error" className="field-error">
            {errors.consent.message}
          </p>
        )}
      </div>
    </div>
  );
}
