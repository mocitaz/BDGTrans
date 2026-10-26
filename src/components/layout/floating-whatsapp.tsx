import Image from "next/image";
import { adminChat } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={adminChat}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi admin BDG TRANS melalui WhatsApp"
      title="Chat admin via WhatsApp"
    >
      <Image
        src="/icons/whatsapp.svg"
        width={28}
        height={28}
        alt="WhatsApp"
        unoptimized
      />
    </a>
  );
}
