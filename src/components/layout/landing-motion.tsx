"use client";

import { useEffect } from "react";

export function LandingMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          if (preference.matches || element.contains(document.activeElement))
            continue;
          const transform =
            element.dataset.reveal === "vehicle"
              ? "translateX(24px)"
              : element.dataset.reveal === "fade"
                ? "none"
                : "translateY(20px)";
          const animation = element.animate(
            [
              { opacity: 0, transform },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 620,
              delay: Number(element.dataset.revealDelay ?? 0),
              easing: "cubic-bezier(.22,1,.36,1)",
              fill: "backwards",
            },
          );
          animations.add(animation);
          animation.finished
            .then(() => animations.delete(animation))
            .catch(() => {});
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );
    const discover = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          observer.observe(element);
        });
    };
    const finish = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    discover();
    const mutations = new MutationObserver(discover);
    const main = document.getElementById("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    preference.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", finish);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  return null;
}
