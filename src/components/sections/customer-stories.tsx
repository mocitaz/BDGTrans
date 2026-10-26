import { ArrowUpRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/constants/testimonials";
import { partners } from "@/constants/partners";
import {
  previewTestimonials,
  previewPartners,
} from "@/constants/community-preview";
import { adminChat } from "@/lib/whatsapp";
import { PartnerMarquee } from "@/components/sections/partner-marquee";

function QuoteText({ text, highlight }: { text: string; highlight?: string }) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (index < 0 || !highlight) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark>{highlight}</mark>
      {text.slice(index + highlight.length)}
    </>
  );
}

export function CustomerStories({
  showSocialProof = true,
}: {
  showSocialProof?: boolean;
}) {
  const verifiedStories = testimonials.filter(
    (item) => item.verified && item.permissionGranted,
  );
  const verifiedClients = partners.filter(
    (item) => item.verified && item.permissionGranted,
  );
  const storiesArePreview =
    process.env.NODE_ENV === "development" && !verifiedStories.length;
  const clientsArePreview =
    process.env.NODE_ENV === "development" && !verifiedClients.length;
  const stories = storiesArePreview ? previewTestimonials : verifiedStories;
  const clients = clientsArePreview ? previewPartners : verifiedClients;
  return (
    <div className="journey-community">
      <div className="container">
        {showSocialProof && stories.length > 0 && (
          <section
            className="journey-proof journey-stories"
            aria-labelledby="stories-heading"
          >
            <div className="stories-heading">
              <p className="journey-kicker">CERITA PELANGGAN</p>
              <h2 id="stories-heading">Cerita Seru dari Mereka.</h2>
              {storiesArePreview && (
                <p className="stories-preview-note">
                  Preview desain · nama, foto, dan kutipan merupakan contoh.
                </p>
              )}
            </div>
            <div className="journey-quotes">
              {stories.map((item) => (
                <figure key={item.id}>
                  <blockquote>
                    <p>
                      “
                      <QuoteText text={item.quote} highlight={item.highlight} />
                      ”
                    </p>
                  </blockquote>
                  <figcaption>
                    <span className="story-avatar">
                      {item.avatar ? (
                        <Image
                          src={item.avatar}
                          width={44}
                          height={44}
                          sizes="44px"
                          alt={
                            storiesArePreview
                              ? `Avatar sintetis untuk profil contoh ${item.name}`
                              : `Foto ${item.name}`
                          }
                          className="story-avatar-photo"
                        />
                      ) : (
                        <span aria-hidden="true">
                          {item.name
                            .split(/\s+/)
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")}
                        </span>
                      )}
                    </span>
                    <span>
                      <span className="story-name">{item.name}</span>
                      {item.context && (
                        <span className="story-context">{item.context}</span>
                      )}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        {showSocialProof && clients.length > 0 && (
          <section
            className="journey-proof journey-institutions"
            aria-labelledby="partners-heading"
          >
            <div className="partners-heading">
              <div>
                <p className="journey-kicker">DIPERCAYA OLEH</p>
                <h2 id="partners-heading">Bersama berbagai instansi.</h2>
              </div>
              {clientsArePreview && (
                <p className="partners-preview-note">
                  Preview desain · daftar instansi berikut adalah contoh, bukan
                  klaim kerja sama.
                </p>
              )}
            </div>
            <PartnerMarquee items={clients} />
          </section>
        )}
        <aside className="journey-contact">
          <div>
            <h2>Ada Rencana Jalan Bareng Rombongan?</h2>
            <p>Konsultasikan pilihan armada dan kebutuhan trip kamu.</p>
          </div>
          <a href={adminChat}>
            <MessageCircle size={17} />
            Tanya Admin
            <ArrowUpRight size={17} />
          </a>
        </aside>
      </div>
    </div>
  );
}
