"use client";

import { useFormContext, type FieldPath } from "react-hook-form";
import type {
  ReservationInput,
  ReservationData,
} from "@/lib/reservation-schema";

export function fieldId(name: string) {
  return name.replaceAll(".", "-");
}
export function usePlanForm() {
  return useFormContext<ReservationInput, unknown, ReservationData>();
}
export function useFieldAttributes(
  name: FieldPath<ReservationInput>,
  required = false,
) {
  const { getFieldState, formState } = usePlanForm();
  const error = getFieldState(name, formState).error;
  return {
    id: fieldId(name),
    "aria-invalid": Boolean(error),
    "aria-required": required,
    "aria-describedby": error ? `${fieldId(name)}-error` : undefined,
  };
}
export function PlanField({
  name,
  label,
  required = false,
  children,
  className = "",
}: {
  name: FieldPath<ReservationInput>;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const { getFieldState, formState } = usePlanForm();
  const error = getFieldState(name, formState).error;
  return (
    <div className={`field ${className}`}>
      <label htmlFor={fieldId(name)}>
        {label}
        {required && (
          <span className="required-mark" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${fieldId(name)}-error`} className="field-error">
          {error.message}
        </p>
      )}
    </div>
  );
}
