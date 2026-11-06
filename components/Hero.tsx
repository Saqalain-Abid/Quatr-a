"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_IMG, seasons } from "@/lib/seasons";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-img", { yPercent: 18, scale: 1.12, ease: "none", scrollTrigger: st });
      gsap.to(".hero-copy", { yPercent: -22, opacity: 0, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh min-h-[640px] overflow-hidden">
      <div className="hero-img absolute inset-[-8%] will-change-transform">
        <Image src={HERO_IMG} alt="A black Quatréa flacon resting in spilled ink and silver" fill priority quality={60} sizes="100vw"
          className="object-cover opacity-45" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/80" />

      <div className="hero-copy absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12">
        <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="eyebrow mb-4 text-muted">
          Maison de parfum · Four seasons, four fragrances
        </m.p>
        <h1 className="font-display text-[clamp(5rem,21vw,21rem)] font-light leading-[0.82] tracking-[-0.02em]" aria-label="Quatréa">
          {"Quatréa".split("").map((l, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
              <m.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 1.3, delay: 1.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
                {l}
              </m.span>
            </span>
          ))}
        </h1>

        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }}
          className="mt-8 flex flex-col justify-between gap-8 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            One year, bottled in four parts. Scroll to move through the seasons.
          </p>
          <div className="flex gap-4">
            {seasons.map((s) => (
              <Link key={s.slug} href={`/seasons/${s.slug}`} data-cursor={s.name}
                className="group relative h-14 w-14 overflow-hidden rounded-full border border-line md:h-16 md:w-16"
                aria-label={s.name}>
                <Image src={s.img} alt="" fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-125" />
              </Link>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
