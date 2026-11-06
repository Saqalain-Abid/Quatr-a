"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useMotionValue, useSpring } from "framer-motion";
import { seasons } from "@/lib/seasons";

/** Editorial index. On desktop a photograph follows the cursor to the row you hover. */
export default function CollectionList() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 18, mass: 0.6 });

  return (
    <div onPointerMove={(e) => { x.set(e.clientX); y.set(e.clientY); }} onPointerLeave={() => setHover(null)}>
      <m.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block" style={{ x: sx, y: sy }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {hover !== null && (
              <m.div key={hover}
                initial={{ clipPath: "inset(100% 0% 0% 0%)", rotate: -4 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", rotate: 0 }}
                exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="relative h-[22rem] w-[16rem] overflow-hidden">
                <Image src={seasons[hover].img} alt="" fill sizes="256px" className="object-cover" />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </m.div>

      <ul className="border-b border-line">
        {seasons.map((s, i) => (
          <m.li key={s.slug}
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            onPointerEnter={() => setHover(i)}>
            <Link href={`/seasons/${s.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-line py-8 transition-[padding] duration-500 hover:pl-4 md:grid-cols-[6rem_1fr_16rem_3rem] md:py-12">
              <span className="eyebrow text-muted">{s.n}</span>
              <span className="flex items-center gap-5">
                <span className="relative h-16 w-12 shrink-0 overflow-hidden md:hidden">
                  <Image src={s.img} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span>
                  <span className="block font-display text-[clamp(2.6rem,7vw,6.5rem)] font-light italic leading-none transition-colors duration-500 group-hover:text-[var(--a)]" style={{ "--a": s.accent } as React.CSSProperties}>
                    {s.perfume}
                  </span>
                  <span className="eyebrow mt-2 block text-muted">{s.name} · {s.months}</span>
                </span>
              </span>
              <span className="hidden text-sm leading-relaxed text-muted md:block">
                {[...s.top, ...s.heart, ...s.base].slice(0, 5).join(" · ")}
              </span>
              <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2">→</span>
            </Link>
          </m.li>
        ))}
      </ul>
    </div>
  );
}
