import Image from "next/image";
export function BrandLogo({
  priority = false,
  tone = "navy",
}: {
  priority?: boolean;
  tone?: "white" | "navy";
}) {
  return (
    <span className="brand-logo">
      <Image
        src={`/brand/logo-${tone}.svg`}
        alt="Logo perusahaan"
        fill
        priority={priority}
        sizes="152px"
        className="object-contain"
        unoptimized
      />
    </span>
  );
}
