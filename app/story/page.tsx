import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rise, ScrubText } from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { HERO_IMG, seasons } from "@/lib/seasons";

export const metadata: Metadata = { title: "Story" };

const chapters = [
  { n: "I", t: "Gather", d: "Each fragrance begins with a single morning: the first open window, the hottest noon, the first fire, the first frost. We collect what that day smells like." },
  { n: "II", t: "Distil", d: "Raw materials are macerated for weeks in small batches, then composed in three movements. Top, heart and base, each timed to unfold as the day does." },
  { n: "III", t: "Rest", d: "Every perfume sleeps for ninety days in dark glass before it is filtered, bottled and numbered by hand. Nothing leaves the house before its season arrives." },
];

export default function StoryPage() {
  return (
    <>
      <section className="px-6 pb-24 pt-44 md:px-12">
        <p className="eyebrow text-muted">Our story</p>
        <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,11vw,10rem)] font-light italic leading-[0.88]">
          A house built on the passing of time.
        </h1>
      </section>

      <ParallaxImage src={HERO_IMG} alt="A Quatréa flacon in spilled ink" className="h-[80vh]" />

      <section className="mx-auto max-w-5xl px-6 py-40 md:px-12 md:py-56">
        <ScrubText
          className="font-display text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.15]"
          text="Quatréa was founded on a small idea: that a perfume should belong to a time of year the way a song belongs to a summer. So we made four, and stopped."
        />
      </section>

      <section className="border-t border-line px-6 py-32 md:px-12">
        <div className="mx-auto max-w-7xl">
          {chapters.map((c, i) => (
            <Rise key={c.n} delay={0.05} className={`grid gap-6 border-b border-line py-14 md:grid-cols-[8rem_1fr_1fr] md:items-baseline ${i === 0 ? "border-t" : ""}`}>
              <span className="font-display text-5xl font-light text-muted">{c.n}</span>
              <h2 className="font-display text-6xl font-light italic">{c.t}</h2>
              <p className="max-w-md text-sm leading-relaxed text-muted">{c.d}</p>
            </Rise>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-4">
        {seasons.map((s) => (
          <Link key={s.slug} href={`/seasons/${s.slug}`} data-cursor="Open" className="group relative block aspect-[3/4] overflow-hidden">
            <Image src={s.img} alt="" fill sizes="(min-width:768px) 25vw, 100vw" className="object-cover opacity-60 transition-all duration-[1.2s] group-hover:scale-110 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="eyebrow text-muted">{s.name}</p>
              <p className="mt-1 font-display text-4xl font-light italic" style={{ color: s.accent }}>{s.perfume}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
