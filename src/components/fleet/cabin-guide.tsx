import {
  Info,
  MoveUp,
  Luggage,
  UsersRound,
  Rows3,
  DoorOpen,
} from "lucide-react";
import {
  vehicleConfigurations,
  passengerSeats,
  configurationNotice,
} from "@/constants/vehicle-configurations";
import { fleet } from "@/constants/fleet";
import type { FleetSlug } from "@/types/content";

function Seat({
  x,
  y,
  driver = false,
  gradient,
}: {
  x: number;
  y: number;
  driver?: boolean;
  gradient: string;
}) {
  return (
    <g
      transform={"translate(" + x + " " + y + ")"}
      data-seat-kind={driver ? "driver" : "passenger"}
    >
      <ellipse cx="22" cy="51" rx="22" ry="4" fill="#012657" opacity=".08" />
      <rect
        x="4"
        y="13"
        width="36"
        height="35"
        rx="8"
        fill={driver ? "#013274" : "url(#" + gradient + ")"}
        stroke={driver ? "#013274" : "#9cafc4"}
      />
      <rect
        x="5"
        y="10"
        width="34"
        height="17"
        rx="6"
        fill={driver ? "#23558d" : "#f8fafc"}
        stroke={driver ? "#4273a4" : "#b3c2d2"}
      />
      <rect
        x="13"
        y="3"
        width="18"
        height="9"
        rx="3.5"
        fill={driver ? "#013274" : "#e4eaf1"}
        stroke={driver ? "#013274" : "#a7b8ca"}
      />
      <path
        d="M10 30 Q22 26 34 30 L35 42 Q22 47 9 42 Z"
        fill={driver ? "#174b86" : "#edf2f7"}
        stroke={driver ? "#4273a4" : "#bdcad8"}
      />
      <path
        d="M13 34 H31 M13 39 H31"
        stroke={driver ? "#6b8eb6" : "#d4dee8"}
        strokeWidth="1.2"
      />
      <rect
        x="0"
        y="23"
        width="5"
        height="19"
        rx="2.5"
        fill={driver ? "#013274" : "#b6c6d7"}
      />
      <rect
        x="39"
        y="23"
        width="5"
        height="19"
        rx="2.5"
        fill={driver ? "#013274" : "#b6c6d7"}
      />
    </g>
  );
}
function SuitcaseShape() {
  return (
    <g>
      <path
        d="M17 12 V5 Q24 0 31 5 V12"
        fill="none"
        stroke="#738aa6"
        strokeWidth="2.5"
      />
      <rect
        x="5"
        y="12"
        width="38"
        height="47"
        rx="7"
        fill="#dce6f1"
        stroke="#829ab6"
        strokeWidth="1.5"
      />
      <path d="M34 13 H37 Q43 13 43 20 V51 Q43 58 36 58 H34 Z" fill="#becfe1" />
      <path
        d="M15 22 V48 M23 22 V48 M31 22 V48"
        stroke="#adbed1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="9" y="59" width="7" height="6" rx="2" fill="#50657b" />
      <rect x="32" y="59" width="7" height="6" rx="2" fill="#50657b" />
      <rect x="2" y="29" width="4" height="11" rx="2" fill="#829ab6" />
    </g>
  );
}

export function CabinGuide({ slug }: { slug: FleetSlug }) {
  const config = vehicleConfigurations[slug];
  const model = fleet.find((item) => item.slug === slug)!;
  const seats = passengerSeats(config);
  const lastRow = 256 + (config.rows.length - 1) * 68;
  const bagY = lastRow + 90;
  const bottom = bagY + 104;
  const height = bottom + 28;
  const gradient = "cabin-seat-" + slug;
  const bodyGradient = "cabin-body-" + slug;
  const driverX = config.frontPassengers === 2 ? 345 : 322;
  const positions = (count: number) =>
    count === 4
      ? [145, 207, 269, 331]
      : count === 3
        ? [143, 287, 345]
        : count === 2
          ? [168, 308]
          : [238];
  return (
    <section
      id="denah-kabin"
      className="cabin-guide"
      aria-labelledby={"cabin-guide-heading-" + slug}
    >
      <div className="container">
        <header className="cabin-guide-heading">
          <div>
            <p className="cabin-guide-eyebrow">TATA RUANG KENDARAAN</p>
            <h2 id={"cabin-guide-heading-" + slug}>
              Denah kabin &amp; panduan bagasi.
            </h2>
          </div>
          <p>Kenali posisi duduk, akses masuk, dan ruang bawaan.</p>
        </header>
        <div className="cabin-guide-layout">
          <figure className="cabin-drawing-panel">
            <div className="cabin-drawing-heading">
              <span>{model.name.replace(/^(Toyota|Isuzu) /, "")}</span>
              <span>
                <MoveUp size={13} aria-hidden="true" />
                Arah depan
              </span>
            </div>
            <div className="cabin-drawing-stage">
              <svg
                className="cabin-floorplan"
                viewBox={"0 0 520 " + height}
                role="img"
                aria-label={
                  "Denah " +
                  (config.status === "concept" ? "konsep" : "unit") +
                  ": " +
                  seats +
                  " kursi penumpang, pengemudi di kanan depan, akses samping dan area bagasi belakang."
                }
              >
                <defs>
                  <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#f9fbfd" />
                    <stop offset="1" stopColor="#cdd9e6" />
                  </linearGradient>
                  <linearGradient id={bodyGradient} x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#e3eaf2" />
                    <stop offset=".16" stopColor="#fff" />
                    <stop offset=".84" stopColor="#fff" />
                    <stop offset="1" stopColor="#e3eaf2" />
                  </linearGradient>
                </defs>
                <g fill="#718097">
                  {[175, lastRow + 24].map((y) => (
                    <g key={y}>
                      <rect x="101" y={y} width="14" height="48" rx="5" />
                      <rect x="405" y={y} width="14" height="48" rx="5" />
                    </g>
                  ))}
                  <path
                    d="M114 111 H98 V135 H112 M408 111 H422 V135 H408"
                    fill="#ccd7e4"
                    stroke="#a6b7ca"
                    strokeWidth="1.5"
                  />
                </g>
                <rect
                  x="112"
                  y="42"
                  width="296"
                  height={bottom - 42}
                  rx="56"
                  fill={"url(#" + bodyGradient + ")"}
                  stroke="#b4c4d6"
                  strokeWidth="2"
                />
                <rect
                  x="126"
                  y="58"
                  width="268"
                  height={bottom - 74}
                  rx="45"
                  fill="none"
                  stroke="#e0e7ef"
                  strokeWidth="1.5"
                />
                <path
                  d="M138 83 Q260 42 382 83 L376 102 Q260 78 144 102 Z"
                  fill="#c4d7e7"
                  stroke="#9fb6cc"
                  strokeWidth="1.5"
                />
                <path
                  d="M154 83 Q260 56 366 83"
                  fill="none"
                  stroke="#eaf2f8"
                  strokeWidth="3"
                />
                <rect
                  x="144"
                  y="115"
                  width="232"
                  height="14"
                  rx="7"
                  fill="#dfe7ef"
                  stroke="#c6d2df"
                />
                <rect
                  x="135"
                  y="142"
                  width="250"
                  height={bagY - 151}
                  rx="13"
                  fill="#f6f8fb"
                />
                <path
                  d={"M121 258 V" + (bagY - 34) + " M399 258 V" + (bagY - 34)}
                  stroke="#c0d1e1"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d={
                    "M260 232 V" +
                    (config.rows.at(-1) === 4 ? lastRow - 12 : bagY - 20)
                  }
                  stroke="#becddb"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                />
                <text
                  x="89"
                  y="185"
                  textAnchor="end"
                  fill="#667c96"
                  fontSize="11"
                >
                  01
                </text>
                {Array.from({ length: config.frontPassengers }, (_, index) => (
                  <Seat
                    key={index}
                    x={config.frontPassengers === 2 ? 143 + index * 58 : 154}
                    y={154}
                    gradient={gradient}
                  />
                ))}
                <Seat x={driverX} y={154} gradient={gradient} driver />
                <g
                  transform={"translate(" + (driverX + 22) + " 137)"}
                  stroke="#344c68"
                  fill="none"
                >
                  <circle r="11" strokeWidth="3" />
                  <path d="M-9 -3 H9 M0 -2 V10" strokeWidth="2" />
                </g>
                <text
                  x={driverX + 22}
                  y="225"
                  textAnchor="middle"
                  fill="#013274"
                  fontSize="10"
                >
                  Sopir
                </text>
                {config.rows.map((count, row) => (
                  <g key={row}>
                    <text
                      x="89"
                      y={288 + row * 68}
                      textAnchor="end"
                      fill="#667c96"
                      fontSize="11"
                    >
                      {String(row + 2).padStart(2, "0")}
                    </text>
                    {positions(count).map((x, column) => (
                      <Seat
                        key={column}
                        x={x}
                        y={256 + row * 68}
                        gradient={gradient}
                      />
                    ))}
                  </g>
                ))}
                <path d="M114 209 V247" stroke="#013274" strokeWidth="4" />
                {model.category === "mpv" && (
                  <path d="M406 209 V247" stroke="#013274" strokeWidth="4" />
                )}
                <path
                  d="M54 228 H99 M91 222 L99 228 L91 234"
                  fill="none"
                  stroke="#013274"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <text x="54" y="213" fill="#013274" fontSize="10">
                  Akses
                </text>
                <rect
                  x="140"
                  y={bagY}
                  width="240"
                  height="72"
                  rx="12"
                  fill="#e6eef7"
                  stroke="#b6c9de"
                  strokeDasharray="4 3"
                />
                <text
                  x="260"
                  y={bagY + 19}
                  textAnchor="middle"
                  fill="#345778"
                  fontSize="11"
                >
                  AREA BAGASI
                </text>
                {Array.from({ length: config.mediumBags }, (_, index) => (
                  <g
                    key={index}
                    transform={
                      "translate(" +
                      (260 - config.mediumBags * 15 + index * 30) +
                      " " +
                      (bagY + 29) +
                      ") scale(.48)"
                    }
                  >
                    <SuitcaseShape />
                  </g>
                ))}
                <path
                  d={"M183 " + (bottom - 15) + " H337"}
                  stroke="#b7c7d7"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <figcaption>
              Tampak atas · ilustrasi tata ruang, tidak berskala
            </figcaption>
          </figure>
          <div className="cabin-guide-copy">
            <div className="cabin-capacity-heading">
              <span className="plan-caption">
                {config.status === "concept"
                  ? "CONTOH KONFIGURASI"
                  : "KONFIGURASI UNIT"}
              </span>
              <h3>{seats} penumpang + sopir</h3>
            </div>
            <dl className="cabin-summary-metrics">
              <div>
                <UsersRound size={17} aria-hidden="true" />
                <dt>Penumpang</dt>
                <dd>
                  {seats}
                  <span>orang</span>
                </dd>
              </div>
              <div>
                <Rows3 size={17} aria-hidden="true" />
                <dt>Baris kabin</dt>
                <dd>
                  {config.rows.length + 1}
                  <span>baris</span>
                </dd>
              </div>
              <div>
                <Luggage size={17} aria-hidden="true" />
                <dt>Contoh bagasi</dt>
                <dd>
                  {config.mediumBags}
                  <span>koper</span>
                </dd>
              </div>
            </dl>
            <dl className="cabin-layout-facts">
              <div>
                <dt>Baris depan</dt>
                <dd>{config.frontPassengers} penumpang + 1 sopir</dd>
              </div>
              <div>
                <dt>Baris belakang</dt>
                <dd>
                  {seats - config.frontPassengers} penumpang dalam{" "}
                  {config.rows.length} baris
                </dd>
              </div>
              <div>
                <dt>
                  <DoorOpen size={14} aria-hidden="true" />
                  Akses masuk
                </dt>
                <dd>
                  {model.category === "minibus"
                    ? "Pintu samping kiri"
                    : "Pintu sisi kiri dan kanan"}
                </dd>
              </div>
              <div>
                <dt>Posisi bagasi</dt>
                <dd>Di belakang baris penumpang</dd>
              </div>
            </dl>
            <div className="cabin-luggage-guide">
              <div className="cabin-luggage-heading">
                <h4>Ruang untuk barang bawaan.</h4>
                <span>{config.mediumBags} koper sedang</span>
              </div>
              <div className="cabin-luggage-visual" aria-hidden="true">
                {Array.from({ length: config.mediumBags }, (_, index) => (
                  <svg viewBox="0 0 48 70" key={index}>
                    <SuitcaseShape />
                  </svg>
                ))}
              </div>
              <p>
                {config.luggageNote} Ukuran koper dan susunan kursi memengaruhi
                ruang yang tersedia.
              </p>
            </div>
          </div>
        </div>
        <div className="cabin-guide-footer">
          <ul className="cabin-guide-legend">
            <li>
              <span />
              Kursi penumpang
            </li>
            <li>
              <span />
              Kursi sopir
            </li>
            <li>
              <span />
              Area bagasi
            </li>
          </ul>
          <p>
            <Info size={15} aria-hidden="true" />
            {config.status === "concept"
              ? configurationNotice
              : "Pastikan konfigurasi unit dan barang bawaan dengan admin sebelum berangkat."}
          </p>
        </div>
      </div>
    </section>
  );
}
