"use client";

import { useEffect } from "react";

export function ImageInteractionGuard() {
  useEffect(() => {
    const preventImageDrag = (event: DragEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (
        target.closest("img, picture") ||
        target.closest("a")?.querySelector("img, picture")
      ) {
        event.preventDefault();
      }
    };
    document.addEventListener("dragstart", preventImageDrag, true);
    return () =>
      document.removeEventListener("dragstart", preventImageDrag, true);
  }, []);

  return null;
}
