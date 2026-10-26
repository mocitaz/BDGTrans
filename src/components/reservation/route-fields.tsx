"use client";

import { useFieldArray, useWatch } from "react-hook-form";
import { Route, Plus, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { PlanField, usePlanForm, useFieldAttributes } from "./plan-field";
import { PickupLocation } from "./pickup-location";

function Stop({
  index,
  count,
  move,
  remove,
}: {
  index: number;
  count: number;
  move: (from: number, to: number) => void;
  remove: () => void;
}) {
  const { register } = usePlanForm();
  const name = `stops.${index}.location` as const;
  const attributes = useFieldAttributes(name, true);
  return (
    <div className="plan-stop">
      <PlanField name={name} label={`Pemberhentian ${index + 1}`} required>
        <Input
          {...attributes}
          {...register(name)}
          maxLength={250}
          placeholder="Nama lokasi pemberhentian"
        />
      </PlanField>
      <div className="plan-stop-actions">
        <button
          type="button"
          className="plan-icon-button"
          disabled={index === 0}
          onClick={() => move(index, index - 1)}
          aria-label={`Naikkan pemberhentian ${index + 1}`}
        >
          <ArrowUp size={15} />
        </button>
        <button
          type="button"
          className="plan-icon-button"
          disabled={index === count - 1}
          onClick={() => move(index, index + 1)}
          aria-label={`Turunkan pemberhentian ${index + 1}`}
        >
          <ArrowDown size={15} />
        </button>
        <button
          type="button"
          className="plan-icon-button"
          onClick={remove}
          aria-label={`Hapus pemberhentian ${index + 1}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}
export function RouteFields() {
  const { register, control, setFocus } = usePlanForm();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "stops",
  });
  const mapUrl = useWatch({ control, name: "pickupMapUrl" });
  const pickup = useFieldAttributes("pickupLocation", !mapUrl),
    destination = useFieldAttributes("destination", true);
  return (
    <fieldset>
      <legend>
        <Route size={15} />
        Rute perjalanan
      </legend>
      <div className="reservation-grid reservation-route-grid">
        <div>
          <PlanField
            name="pickupLocation"
            label="Titik jemput"
            required={!mapUrl}
          >
            <Textarea
              {...pickup}
              {...register("pickupLocation")}
              maxLength={250}
              rows={2}
              placeholder="Stasiun, hotel, atau alamat penjemputan"
            />
          </PlanField>
          <PickupLocation />
        </div>
        {fields.map((field, index) => (
          <Stop
            key={field.id}
            index={index}
            count={fields.length}
            move={(from, to) => {
              move(from, to);
              requestAnimationFrame(() => setFocus(`stops.${to}.location`));
            }}
            remove={() => {
              remove(index);
              requestAnimationFrame(() => {
                if (fields.length > 1)
                  setFocus(
                    `stops.${Math.min(index, fields.length - 2)}.location`,
                  );
                else document.getElementById("add-stop")?.focus();
              });
            }}
          />
        ))}
        <PlanField name="destination" label="Tujuan akhir" required>
          <Textarea
            {...destination}
            {...register("destination")}
            maxLength={500}
            rows={2}
            placeholder="Kota atau lokasi tujuan akhir"
          />
        </PlanField>
      </div>
      <button
        type="button"
        id="add-stop"
        className="plan-text-button"
        disabled={fields.length >= 6}
        onClick={() =>
          append(
            { location: "" },
            { focusName: `stops.${fields.length}.location` },
          )
        }
      >
        <Plus size={15} />
        Tambah pemberhentian
      </button>
      <p className="reservation-field-hint">
        Isi alamat atau tautan Maps untuk titik jemput. Atur urutan lokasi
        singgah dengan tombol panah; maksimal 6 pemberhentian.
      </p>
    </fieldset>
  );
}
