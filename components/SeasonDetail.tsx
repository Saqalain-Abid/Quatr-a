"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import Bottle from "./Bottle";
import { Rise, ScrubText } from "./Reveal";
import { seasons, type Season } from "@/lib/seasons";

const tiers: { key: "top" | "heart" | "base"; label: string; hint: string }[] = [
  { key: "top", label: "Top", hint: "The first ten minutes" },
  { key: "heart", label: "Heart", hint: "The next few hours" },
  { key: "base", label: "Base", hint: "What stays on the coat" },
];

export default function SeasonDetail({ s }: { s: Season }) {
  const hero = useRef<HTMLElement>(null);
  const story = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const { scrollYProgress: sp } = useScroll({ target: story, offset: ["start end", "end start"] });
  const rotate = useTransform(sp, [0, 1], [-8, 8]);
  const bottleY = useTransform(sp, [0, 1], [60, -60]);

  const next = seasons[(seasons.findIndex((x) => x.slug === s.slug) + 1) % seasons.length];

  return (
    <>
      <section ref={hero} className="relative h-svh min-h-[620px] overflow-hidden">
        <m.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
          <Image src={s.img} alt={`${s.name} — ${s.perfume}`} fill priority quality={60} sizes="100vw" className="object-cover opacity-60" />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-bg/70" />
        <m.div style={{ y: textY }} className="absolute inset-x-0 bottom-0 px-6 pb-14 md:px-12">
          <p className="eyebrow text-muted">{s.n} / 04 · {s.name} · {s.months}</p>
          <h1 className="mt-4 font-display text-[clamp(4.5rem,17vw,17rem)] font-light italic leading-[0.85]" style={{ color: s.accent }} aria-label={s.perfume}>
            {s.perfume.split("").map((l, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
                <m.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}>
                  {l === " " ? " " : l}
                </m.span>
              </span>
            ))}
          </h1>
          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 1 }}
            className="mt-6 max-w-lg font-display text-2xl font-light md:text-3xl">{s.line}</m.p>
        </m.div>
      </section>

      <section ref={story} className="relative mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-2 md:px-12 md:py-48">
        <div className="relative flex items-center justify-center">
          <div aria-hidden className="absolute h-[90%] w-[90%] opacity-40" style={{ background: `radial-gradient(closest-side, ${s.accent}, transparent)` }} />
          <m.div style={{ rotate, y: bottleY }} className="relative will-change-transform">
            <Bottle img={s.img} accent={s.accent} name={s.perfume} className="h-[26rem] md:h-[34rem]" />
          </m.div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-muted">The scent</p>
          <ScrubText text={s.story} className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3rem)] font-light leading-[1.2]" />
          <Rise delay={0.1} className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-6 text-sm">
            <div><p className="eyebrow text-muted">Format</p><p className="mt-2">Eau de parfum</p></div>
            <div><p className="eyebrow text-muted">Size</p><p className="mt-2">50 ml · 100 ml</p></div>
            <div><p className="eyebrow text-muted">From</p><p className="mt-2">$190</p></div>
          </Rise>
          <Rise delay={0.2} className="mt-10">
            <button data-cursor="Soon" className="group relative overflow-hidden rounded-full border border-ink px-8 py-4 text-xs uppercase tracking-[0.25em]">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <span className="relative transition-colors duration-500 group-hover:text-bg">Reserve a bottle</span>
            </button>
          </Rise>
        </div>
      </section>

      <section className="border-t border-line px-6 py-32 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Rise><h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light italic">The pyramid</h2></Rise>
          <div className="mt-16 grid gap-14 md:grid-cols-3">
            {tiers.map((t, i) => (
              <div key={t.key}>
                <m.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="h-px origin-left" style={{ background: s.accent }} />
                <Rise delay={i * 0.12}>
                  <p className="eyebrow mt-5" style={{ color: s.accent }}>{t.label}</p>
                  <p className="mt-1 text-sm text-muted">{t.hint}</p>
                  <ul className="mt-8 space-y-2 font-display text-4xl font-light">
                    {s[t.key].map((n) => <li key={n}>{n}</li>)}
                  </ul>
                </Rise>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Link href={`/seasons/${next.slug}`} data-cursor="Next" className="group relative block h-[70vh] overflow-hidden border-t border-line">
        <Image src={next.img} alt="" fill sizes="100vw" className="object-cover opacity-35 transition-all duration-[1.4s] ease-out group-hover:scale-110 group-hover:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="eyebrow text-muted">Next season · {next.n} / 04</p>
          <p className="mt-4 font-display text-[clamp(4rem,14vw,13rem)] font-light italic leading-none transition-transform duration-700 group-hover:-translate-y-2" style={{ color: next.accent }}>{next.perfume}</p>
        </div>
      </Link>
    </>
  );
}
