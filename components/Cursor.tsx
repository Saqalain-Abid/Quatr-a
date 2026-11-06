"use client";
import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

/** Custom cursor: a small dot that swells into a labelled disc over anything marked data-cursor="Label". */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(el?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  return (
    <m.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[200] [@media(pointer:coarse)]:hidden" style={{ x: sx, y: sy }}>
      <m.div
        className="flex items-center justify-center rounded-full bg-ink text-[0.65rem] font-medium uppercase tracking-[0.2em] text-bg"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ width: label ? 92 : 10, height: label ? 92 : 10, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {label && <span>{label}</span>}
      </m.div>
    </m.div>
  );
}
