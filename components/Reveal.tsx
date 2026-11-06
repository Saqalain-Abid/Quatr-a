"use client";
import { useLayoutEffect, useRef } from "react";
import { m } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fade + lift into view once. */
export function Rise({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

/** Words light up one by one as you scroll through the paragraph (GSAP scrub). */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".w", { opacity: 0.14 }, {
        opacity: 1, stagger: 0.12, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 45%", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <p ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="w inline-block pr-[0.28em]" aria-hidden>{w}</span>
      ))}
    </p>
  );
}
