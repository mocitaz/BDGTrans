import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  FileText,
  Shield,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}
interface LegalDocumentProps {
  kind: "privacy" | "terms";
  title: string;
  description: string;
  introduction: ReactNode;
  sections: LegalSection[];
}
const documents = [
  { kind: "privacy", href: "/kebijakan-privasi", title: "Kebijakan Privasi" },
  { kind: "terms", href: "/syarat-ketentuan", title: "Syarat & Ketentuan" },
] as const;

function Contents({
  sections,
  label,
}: {
  sections: LegalSection[];
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <ol>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LegalDocument({
  kind,
  title,
  description,
  introduction,
  sections,
}: LegalDocumentProps) {
  const Icon = kind === "privacy" ? Shield : FileText;
  const related = documents.find((document) => document.kind !== kind)!;
  return (
    <>
      <Header />
      <main id="main" className="legal-document">
        <header className="legal-hero">
          <div className="container legal-container">
            <nav className="legal-breadcrumb" aria-label="Lokasi halaman">
              <Link href="/">Beranda</Link>
              <ChevronRight size={13} aria-hidden="true" />
              <span aria-current="page">{title}</span>
            </nav>
            <p className="legal-kicker">INFORMASI WEBSITE</p>
            <h1>{title}</h1>
            <p className="legal-description">{description}</p>
            <nav className="legal-page-tabs" aria-label="Dokumen website">
              {documents.map((document) => (
                <Link
                  key={document.kind}
                  href={document.href}
                  aria-current={kind === document.kind ? "page" : undefined}
                >
                  {document.title}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <div className="container legal-container legal-layout">
          <aside className="legal-sidebar">
            <p>Dalam halaman ini</p>
            <Contents sections={sections} label="Daftar isi dokumen" />
          </aside>
          <div className="legal-reading">
            <details className="legal-toc-mobile">
              <summary>
                Dalam halaman ini
                <ChevronDown size={16} aria-hidden="true" />
              </summary>
              <Contents
                sections={sections}
                label="Daftar isi dokumen seluler"
              />
            </details>
            <div className="legal-overview">
              <Icon size={20} aria-hidden="true" />
              <p>{introduction}</p>
            </div>
            <article aria-label={title}>
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="legal-section"
                  aria-labelledby={`${section.id}-heading`}
                >
                  <h2 id={`${section.id}-heading`}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <div className="legal-section-body">{section.content}</div>
                </section>
              ))}
            </article>
            <nav className="legal-related" aria-label="Dokumen terkait">
              <span>Baca juga</span>
              <Link href={related.href}>
                {related.title}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
