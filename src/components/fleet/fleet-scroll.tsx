"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function FleetScroll({
  heading,
  children,
  count,
}: {
  heading: ReactNode;
  children: ReactNode;
  count: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<(index: number, smooth?: boolean) => void>(() => {});
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const section = sectionRef.current!;
    const sticky = stickyRef.current!;
    const viewport = viewportRef.current!;
    const track = viewport.querySelector<HTMLElement>(".fleet-grid")!;
    const header = document.querySelector<HTMLElement>(".site-header");
    const mobile = matchMedia("(max-width: 639px)");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let distance = 0;
    let top = 72;
    let frame = 0;
    let measuring = false;

    const update = () => {
      frame = 0;
      if (section.dataset.pinned !== "true") return;
      const progress = Math.max(
        0,
        Math.min(1, (top - section.getBoundingClientRect().top) / distance),
      );
      const index = Math.round(progress * (count - 1));
      track.style.transform = `translate3d(${-(index * distance) / (count - 1)}px, 0, 0)`;
      setCurrent(index);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      if (measuring) return;
      measuring = true;
      const enabled = mobile.matches && !reducedMotion.matches;
      section.dataset.mobileRail = String(enabled);
      top = (header?.getBoundingClientRect().height ?? 64) + 8;
      section.style.setProperty("--fleet-sticky-top", `${top}px`);
      const cards = Array.from(track.children) as HTMLElement[];
      const first = cards[0];
      const last = cards.at(-1);
      distance =
        first && last
          ? Math.max(
              0,
              last.offsetLeft +
                last.offsetWidth -
                first.offsetLeft -
                viewport.clientWidth,
            )
          : 0;
      // Short viewports retain a normal horizontal rail so the card stays reachable.
      const fits = sticky.offsetHeight <= window.innerHeight - top - 88;
      section.dataset.pinned = String(enabled && fits && distance > 0);
      if (section.dataset.pinned !== "true") track.style.transform = "";
      if (section.dataset.pinned === "true") viewport.scrollLeft = 0;
      section.style.height =
        section.dataset.pinned === "true"
          ? `${sticky.offsetHeight + distance}px`
          : "";
      if (!enabled) {
        viewport.scrollLeft = 0;
        setCurrent(0);
      } else if (section.dataset.pinned !== "true") {
        setCurrent(
          distance > 0
            ? Math.round((viewport.scrollLeft / distance) * (count - 1))
            : 0,
        );
      }
      measuring = false;
      schedule();
    };
    moveRef.current = (index, smooth = true) => {
      const target = Math.max(0, Math.min(count - 1, index));
      const left = (distance * target) / (count - 1);
      if (section.dataset.pinned === "true") {
        window.scrollTo({
          top:
            window.scrollY + section.getBoundingClientRect().top - top + left,
          behavior: smooth ? "smooth" : "instant",
        });
      } else {
        viewport.scrollTo({ left, behavior: smooth ? "smooth" : "instant" });
      }
    };
    const railScroll = () => {
      if (section.dataset.pinned !== "true" && distance > 0)
        setCurrent(Math.round((viewport.scrollLeft / distance) * (count - 1)));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(sticky);
    if (header) observer.observe(header);
    mobile.addEventListener("change", measure);
    reducedMotion.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    viewport.addEventListener("scroll", railScroll, { passive: true });
    measure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mobile.removeEventListener("change", measure);
      reducedMotion.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", schedule);
      viewport.removeEventListener("scroll", railScroll);
    };
  }, [count]);

  return (
    <section
      id="armada"
      ref={sectionRef}
      className="section muted-bg fleet-section"
      aria-labelledby="fleet-heading"
    >
      <div ref={stickyRef} className="container fleet-sticky">
        {heading}
        <div
          ref={viewportRef}
          className="fleet-viewport"
          onFocusCapture={(event) => {
            const card = (event.target as HTMLElement).closest(".fleet-card");
            if (!card || sectionRef.current?.dataset.mobileRail !== "true")
              return;
            const cards = [
              ...viewportRef.current!.querySelectorAll(".fleet-card"),
            ];
            moveRef.current(cards.indexOf(card), false);
          }}
        >
          <div className="fleet-grid">{children}</div>
        </div>
        <div className="fleet-scroll-controls">
          <span>Gulir untuk lihat armada</span>
          <div>
            <button
              type="button"
              aria-label="Armada sebelumnya"
              disabled={current === 0}
              onClick={() => moveRef.current(current - 1)}
            >
              <ArrowLeft size={17} aria-hidden="true" />
            </button>
            <span
              className="fleet-scroll-count"
              aria-label={`Armada ${current + 1} dari ${count}`}
            >
              {current + 1} / {count}
            </span>
            <button
              type="button"
              aria-label="Armada berikutnya"
              disabled={current === count - 1}
              onClick={() => moveRef.current(current + 1)}
            >
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
