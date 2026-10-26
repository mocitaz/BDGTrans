import { fleet } from "@/constants/fleet";
import {
  vehicleConfigurations,
  passengerSeats,
} from "@/constants/vehicle-configurations";

export function recommendVehicles(
  passengers: number,
  bags: number,
  purpose: string,
) {
  if (
    !Number.isInteger(passengers) ||
    passengers < 1 ||
    passengers > 60 ||
    !Number.isInteger(bags) ||
    bags < 0 ||
    bags > 60
  )
    return [];
  return fleet
    .map((vehicle, order) => {
      const configuration = vehicleConfigurations[vehicle.slug];
      const seats = passengerSeats(configuration);
      const units = Math.max(
        1,
        Math.ceil(passengers / seats),
        Math.ceil(bags / configuration.mediumBags),
      );
      const preferMpv =
        passengers <= 6 && ["keluarga", "dinas", "bandara"].includes(purpose);
      const score =
        units * 100 +
        (units * seats - passengers) * 2 +
        (preferMpv && vehicle.category !== "mpv" ? 30 : 0) +
        order / 10;
      return { vehicle, configuration, seats, units, score };
    })
    .filter((item) => item.units <= 10)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);
}
