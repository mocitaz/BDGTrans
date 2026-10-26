import { MessageCircle, ArrowLeft } from "lucide-react";
import { tripTypes } from "@/constants/fleet";
import {
  journeyLabels,
  totalPassengers,
  vehicleRequestText,
  serviceRequestRows,
  tripDuration,
} from "@/lib/travel-plan";
import type { ReservationData } from "@/lib/reservation-schema";
import { formatDate } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
export function ReservationSummary({
  data,
  onContinue,
  onEdit,
}: {
  data: ReservationData;
  onContinue: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="summary reservation-summary">
      <p className="reservation-kicker">PERIKSA DETAIL PERJALANANMU</p>
      <h3 id="summary-heading" tabIndex={-1}>
        Ringkasan perjalanan
      </h3>
      <dl>
        {[
          ["Nama pemesan", data.fullName],
          ["WhatsApp", data.whatsappNumber],
          ["Kelompok armada", vehicleRequestText(data)],
          ["Total penumpang", `${totalPassengers(data)} orang`],
          ["Koper sedang / tas besar", String(data.luggageCount)],
          [
            "Penjemputan",
            `${formatDate(data.pickupDate)}, ${data.pickupTime} WIB`,
          ],
          ["Selesai", `${formatDate(data.endDate)}, ${data.endTime} WIB`],
          ["Arah perjalanan", journeyLabels[data.journeyType]],
          ["Perlu menginap", data.overnight ? "Ya" : "Tidak"],
          [
            "Rentang jadwal",
            tripDuration(
              data.pickupDate,
              data.pickupTime,
              data.endDate,
              data.endTime,
            ),
          ],
          ["Titik jemput", data.pickupLocation || "Lihat pin Google Maps"],
          ...(data.pickupMapUrl
            ? [["Pin penjemputan", data.pickupMapUrl]]
            : []),
          ...(data.stops.length
            ? [
                [
                  "Pemberhentian",
                  data.stops
                    .map((stop, index) => `${index + 1}. ${stop.location}`)
                    .join("\n"),
                ],
              ]
            : []),
          ["Tujuan", data.destination],
          ["Keperluan", tripTypes[data.tripType]],
          ...serviceRequestRows(data),
          ["Catatan", data.notes || "Tidak ada catatan"],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd className="whitespace-pre-wrap">{value}</dd>
          </div>
        ))}
      </dl>
      {data.pickupMapUrl && (
        <a
          className="plan-map-summary"
          href={data.pickupMapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Periksa titik jemput di Google Maps
          <span className="sr-only"> (tab baru)</span>
        </a>
      )}
      <p className="reservation-field-hint">
        Rentang jadwal bukan perhitungan hari sewa. Jumlah unit, kapasitas
        kursi, dan bagasi dikonfirmasi admin.
      </p>
      <p className="reservation-review-note">
        Permintaanmu belum mengikat. Admin akan konfirmasi ketersediaan armada
        dan harga hematnya via WhatsApp.
      </p>
      <Button
        className="reservation-whatsapp-submit"
        onClick={onContinue}
        type="button"
      >
        <MessageCircle size={17} />
        Lanjut ke WhatsApp
      </Button>
      <Button
        className="reservation-edit"
        variant="outline"
        onClick={onEdit}
        type="button"
      >
        <ArrowLeft size={15} />
        Ubah Detail Perjalanan
      </Button>
    </div>
  );
}
