"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
export function StickyMobileCTA() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const targets = new Set<Element>();
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      setHide(visible.size > 0);
    });
    const syncTargets = () => {
      targets.forEach((target) => {
        if (!target.isConnected) {
          observer.unobserve(target);
          targets.delete(target);
          visible.delete(target);
        }
      });
      [
        document.getElementById("reservasi"),
        document.querySelector("footer"),
      ].forEach((target) => {
        if (target && !targets.has(target)) {
          targets.add(target);
          observer.observe(target);
        }
      });
    };
    syncTargets();
    const mutations = new MutationObserver(syncTargets);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
  if (hide) return null;
  return (
    <div className="sticky-cta">
      <Link className={buttonVariants()} href="/#reservasi">
        <MessageCircle size={17} />
        Minta Penawaran
      </Link>
    </div>
  );
}
