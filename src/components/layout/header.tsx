"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navigation";
import { MobileNav } from "./mobile-nav";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./brand-logo";
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const home = pathname === "/";
  const overlay = home && !scrolled;
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);
  return (
    <>
      <header
        className="site-header"
        data-overlay={overlay}
        data-scrolled={scrolled}
      >
        <div className="container header-inner">
          <Link
            href="/#beranda"
            className="header-brand"
            aria-label="BDG TRANS, beranda"
          >
            <BrandLogo priority tone={overlay ? "white" : "navy"} />
          </Link>
          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-6 lg:flex"
          >
            {navigation.map(([id, label]) => (
              <Link className="nav-link" key={id} href={`/#${id}`}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Link className="header-quote" href="/#reservasi">
              Minta Penawaran <ArrowUpRight size={15} />
            </Link>
          </div>
          <MobileNav tone={overlay ? "white" : "navy"} />
        </div>
      </header>
      {!home && <div className="header-spacer" aria-hidden="true" />}
    </>
  );
}
