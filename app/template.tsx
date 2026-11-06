"use client";
import { m } from "framer-motion";

const strips = ["#f0a7bd", "#ffbf4d", "#e0872f", "#9cc3e6"];

// Re-mounts on every navigation: four seasonal strips lift away to reveal the page.
// Only opacity is animated on the content so GSAP pinning is never broken by a transformed ancestor.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[150] flex">
        {strips.map((c, i) => (
          <m.div
            key={c} className="h-full flex-1 origin-top" style={{ background: c }}
            initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.76, 0, 0.24, 1] }}
          />
        ))}
      </div>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
        {children}
      </m.div>
    </>
  );
}
