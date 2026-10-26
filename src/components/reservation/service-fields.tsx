"use client";

import { useWatch } from "react-hook-form";
import { BriefcaseBusiness } from "lucide-react";
import { tripTypes } from "@/constants/fleet";
import { Input, Select, Textarea } from "@/components/ui/input";
import { PlanField, usePlanForm, useFieldAttributes } from "./plan-field";

export function ServiceFields() {
  const { register, control } = usePlanForm();
  const type = useWatch({ control, name: "tripType" });
  const transfer = useWatch({ control, name: "transferKind" });
  const quote = useWatch({ control, name: "needsQuotation" });
  const typeProps = useFieldAttributes("tripType", true),
    kind = useFieldAttributes("transferKind"),
    number = useFieldAttributes("transportNumber"),
    arrival = useFieldAttributes("arrivalTime"),
    company = useFieldAttributes("companyName", Boolean(quote)),
    agenda = useFieldAttributes("tourAgenda");
  return (
    <fieldset>
      <legend>
        <BriefcaseBusiness size={15} />
        Keperluan perjalanan
      </legend>
      <PlanField name="tripType" label="Keperluan" required>
        <Select {...typeProps} {...register("tripType")}>
          <option value="">Pilih keperluan</option>
          {Object.entries(tripTypes).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </PlanField>
      {type === "bandara" && (
        <div className="plan-service-extra">
          <PlanField name="transferKind" label="Jenis antar jemput">
            <Select {...kind} {...register("transferKind")}>
              <option value="bandara">Bandara</option>
              <option value="kereta">Stasiun kereta</option>
            </Select>
          </PlanField>
          <div className="reservation-grid">
            <PlanField
              name="transportNumber"
              label={
                transfer === "kereta"
                  ? "Nomor kereta (opsional)"
                  : "Nomor penerbangan (opsional)"
              }
            >
              <Input
                {...number}
                {...register("transportNumber")}
                maxLength={40}
                placeholder={
                  transfer === "kereta" ? "Contoh: KA 32" : "Contoh: GA 123"
                }
              />
            </PlanField>
            <PlanField
              name="arrivalTime"
              label="Jam kedatangan (WIB, opsional)"
            >
              <Input {...arrival} {...register("arrivalTime")} type="time" />
            </PlanField>
          </div>
          <p className="reservation-field-hint">
            Isi jadwal kedatangan sesuai rencanamu. Jam jemput tetap diisi
            terpisah di bagian Jadwal.
          </p>
        </div>
      )}
      {type === "dinas" && (
        <div className="plan-service-extra">
          <PlanField
            name="companyName"
            label="Nama perusahaan"
            required={Boolean(quote)}
          >
            <Input
              {...company}
              {...register("companyName")}
              maxLength={120}
              autoComplete="organization"
              placeholder="Perusahaan atau instansi"
            />
          </PlanField>
          <label className="plan-checkbox">
            <input
              type="checkbox"
              id="needsQuotation"
              {...register("needsQuotation")}
            />
            Butuh dokumen penawaran dari admin
          </label>
        </div>
      )}
      {type === "wisata" && (
        <div className="plan-service-extra">
          <PlanField name="tourAgenda" label="Agenda wisata (opsional)">
            <Textarea
              {...agenda}
              {...register("tourAgenda")}
              maxLength={300}
              rows={2}
              placeholder="Contoh: liburan keluarga, wisata alam, atau city tour"
            />
          </PlanField>
          <p className="reservation-field-hint">
            Susun daftar tujuan dan urutannya di bagian Rute perjalanan.
          </p>
        </div>
      )}
    </fieldset>
  );
}
