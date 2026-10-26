"use client";

import { useFieldArray, useWatch } from "react-hook-form";
import { BusFront, Plus, Trash2 } from "lucide-react";
import { fleet } from "@/constants/fleet";
import { VehicleAdvisor } from "@/components/fleet/vehicle-advisor";
import { Input, Select } from "@/components/ui/input";
import type { ReservationInput } from "@/lib/reservation-schema";
import { PlanField, usePlanForm, useFieldAttributes } from "./plan-field";

function ExtraVehicle({
  index,
  onRemove,
}: {
  index: number;
  onRemove: () => void;
}) {
  const { register } = usePlanForm();
  const slugName = `additionalVehicles.${index}.fleetSlug` as const;
  const quantityName = `additionalVehicles.${index}.quantity` as const;
  const passengersName = `additionalVehicles.${index}.passengers` as const;
  const slug = useFieldAttributes(slugName, true);
  const quantity = useFieldAttributes(quantityName, true);
  const passengers = useFieldAttributes(passengersName, true);
  return (
    <div className="plan-extra-vehicle">
      <div className="plan-row-heading">
        <h4>Kelompok {index + 2}</h4>
        <button
          type="button"
          className="plan-icon-button"
          onClick={onRemove}
          aria-label={`Hapus kelompok armada ${index + 2}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="plan-vehicle-grid">
        <PlanField name={slugName} label="Kendaraan" required>
          <Select {...slug} {...register(slugName)}>
            <option value="">Pilih kendaraan</option>
            {fleet.map((item) => (
              <option value={item.slug} key={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>
        </PlanField>
        <PlanField name={quantityName} label="Unit" required>
          <Input
            {...quantity}
            {...register(quantityName, { valueAsNumber: true })}
            type="number"
            min={1}
            max={10}
            step={1}
          />
        </PlanField>
        <PlanField name={passengersName} label="Penumpang" required>
          <Input
            {...passengers}
            {...register(passengersName, { valueAsNumber: true })}
            type="number"
            min={1}
            max={60}
            step={1}
          />
        </PlanField>
      </div>
    </div>
  );
}

export function FleetRequestFields() {
  const { register, control, setValue, setFocus } = usePlanForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalVehicles",
  });
  const primary = useWatch({ control, name: "passengers" });
  const purpose = useWatch({ control, name: "tripType" });
  const bagCount = useWatch({ control, name: "luggageCount" });
  const extras = useWatch({ control, name: "additionalVehicles" }) ?? [];
  const total =
    (Number(primary) || 0) +
    extras.reduce((sum, item) => sum + (Number(item.passengers) || 0), 0);
  const slug = useFieldAttributes("fleetSlug", true);
  const quantity = useFieldAttributes("vehicleQuantity", true);
  const passengers = useFieldAttributes("passengers", true);
  const luggage = useFieldAttributes("luggageCount");
  return (
    <fieldset>
      <legend>
        <BusFront size={15} />
        Armada &amp; rombongan
      </legend>
      <VehicleAdvisor
        initialRequest={{
          passengers: Number(primary) || 1,
          bags: Number(bagCount) || 0,
          purpose: purpose || "keluarga",
        }}
        onChoose={(selection) => {
          setValue("fleetSlug", selection.slug, { shouldDirty: true });
          setValue("vehicleQuantity", selection.units, { shouldDirty: true });
          setValue("passengers", selection.passengers, { shouldDirty: true });
          setValue("luggageCount", selection.bags, { shouldDirty: true });
          setValue(
            "tripType",
            selection.purpose as ReservationInput["tripType"],
            { shouldDirty: true },
          );
        }}
      />
      {fields.length > 0 && (
        <>
          <p className="reservation-field-hint">
            Saran kendaraan diterapkan ke kelompok 1.
          </p>
          <h4 className="plan-group-title">Kelompok 1</h4>
        </>
      )}
      <div className="plan-vehicle-grid">
        <PlanField name="fleetSlug" label="Pilihan armada" required>
          <Select {...slug} {...register("fleetSlug")}>
            <option value="">Pilih kendaraan</option>
            {fleet.map((item) => (
              <option value={item.slug} key={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>
        </PlanField>
        <PlanField name="vehicleQuantity" label="Unit" required>
          <Input
            {...quantity}
            {...register("vehicleQuantity", { valueAsNumber: true })}
            type="number"
            min={1}
            max={10}
            step={1}
          />
        </PlanField>
        <PlanField name="passengers" label="Penumpang" required>
          <Input
            {...passengers}
            {...register("passengers", { valueAsNumber: true })}
            type="number"
            min={1}
            max={60}
            step={1}
          />
        </PlanField>
      </div>
      {fields.map((field, index) => (
        <ExtraVehicle
          key={field.id}
          index={index}
          onRemove={() => {
            remove(index);
            requestAnimationFrame(() => {
              if (fields.length > 1)
                setFocus(
                  `additionalVehicles.${Math.min(index, fields.length - 2)}.fleetSlug`,
                );
              else document.getElementById("add-vehicle")?.focus();
            });
          }}
        />
      ))}
      <div className="plan-fleet-footer">
        <button
          type="button"
          id="add-vehicle"
          className="plan-text-button"
          disabled={fields.length >= 4}
          onClick={() =>
            append(
              {
                fleetSlug: "" as ReservationInput["fleetSlug"],
                quantity: 1,
                passengers: 1,
              },
              { focusName: `additionalVehicles.${fields.length}.fleetSlug` },
            )
          }
        >
          <Plus size={15} />
          Tambah armada
        </button>
        <span aria-live="polite">Total {total} penumpang</span>
      </div>
      <PlanField
        name="luggageCount"
        label="Koper sedang / tas besar (opsional)"
      >
        <Input
          {...luggage}
          {...register("luggageCount", {
            setValueAs: (value) => (value === "" ? 0 : Number(value)),
          })}
          type="number"
          min={0}
          max={60}
          step={1}
        />
      </PlanField>
      <p className="reservation-field-hint">
        Penumpang dihitung per kelompok, bukan per unit. Maksimal 60 peserta dan
        10 unit per pengajuan; kapasitas tetap dikonfirmasi admin.
      </p>
    </fieldset>
  );
}
