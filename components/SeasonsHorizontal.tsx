"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { seasons } from "@/lib/seasons";

gsap.registerPlugin(ScrollTrigger);

/** The signature moment: a pinned section that travels sideways through the year as you scroll down. */
export default function SeasonsHorizontal() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const el = track.current!;
      const dist = () => el.scrollWidth - window.innerWidth;
      const move = gsap.to(el, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: root.current, pin: true, scrub: 1, invalidateOnRefresh: true,
          end: () => "+=" + dist(),
          onUpdate: (self) => {
            gsap.set(bar.current, { scaleX: self.progress });
            const i = Math.min(seasons.length, Math.max(0, Math.round(self.progress * seasons.length)));
            if (count.current) count.current.textContent = String(i).padStart(2, "0");
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".panel").forEach((p) => {
        // image drifts opposite to the track for depth
        gsap.fromTo(p.querySelector(".pimg"), { xPercent: -14 }, {
          xPercent: 14, ease: "none",
          scrollTrigger: { trigger: p, containerAnimation: move, start: "left right", end: "right left", scrub: true },
        });
        gsap.from(p.querySelectorAll(".rise"), {
          y: 70, opacity: 0, stagger: 0.09, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: p, containerAnimation: move, start: "left 65%", toggleActions: "play none none reverse" },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden md:h-screen">
      <div ref={track} className="flex flex-col md:h-full md:w-max md:flex-row md:items-center">
        <div className="flex shrink-0 flex-col justify-center px-6 py-24 md:h-full md:w-[55vw] md:px-[6vw]">
          <p className="eyebrow text-muted">The year in four acts</p>
          <h2 className="mt-6 font-display text-[clamp(3rem,8vw,8rem)] font-light italic leading-[0.9]">
            Spring<br />to winter,<br />in glass.
          </h2>
          <p className="mt-8 hidden text-sm text-muted md:block">Keep scrolling →</p>
        </div>

        {seasons.map((s) => (
          <article key={s.slug} className="panel relative flex shrink-0 flex-col items-start gap-10 px-6 py-20 md:h-full md:w-[85vw] md:flex-row md:items-center md:gap-[5vw] md:px-[5vw] md:py-0">
            <div aria-hidden className="absolute inset-0 -z-0 opacity-30"
              style={{ background: `radial-gradient(60% 60% at 70% 50%, ${s.accent}55, transparent 70%)` }} />
            <Link href={`/seasons/${s.slug}`} data-cursor="Discover"
              className="relative z-10 block aspect-[3/4] w-full overflow-hidden rounded-t-full md:aspect-auto md:h-[72vh] md:w-[30vw] md:shrink-0">
              <div className="pimg absolute inset-[-10%] md:inset-y-0 md:-inset-x-[20%]">
                <Image src={s.img} alt={`${s.name} — ${s.perfume}`} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover" />
              </div>
            </Link>
            <div className="relative z-10 md:w-[40vw]">
              <span className="rise outline-text font-display text-[clamp(5rem,12vw,11rem)] font-light leading-none" style={{ color: "transparent", WebkitTextStrokeColor: s.accent }}>{s.n}</span>
              <p className="rise eyebrow mt-2 text-muted">{s.name} · {s.months}</p>
              <h3 className="rise mt-3 font-display text-[clamp(3rem,6vw,6rem)] font-light italic leading-none" style={{ color: s.accent }}>{s.perfume}</h3>
              <p className="rise mt-5 max-w-md font-display text-2xl font-light">{s.line}</p>
              <p className="rise mt-5 max-w-md text-sm leading-relaxed text-muted">{s.story}</p>
              <Link href={`/seasons/${s.slug}`} className="rise eyebrow mt-8 inline-block border-b border-ink pb-1 transition-opacity hover:opacity-60">
                Discover {s.perfume}
              </Link>
            </div>
          </article>
        ))}
        <div className="hidden h-full w-[10vw] shrink-0 md:block" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-center gap-6 px-12 pb-8 md:flex">
        <span className="eyebrow tabular-nums"><span ref={count}>00</span> / 04</span>
        <div className="h-px flex-1 bg-line"><div ref={bar} className="h-full origin-left scale-x-0 bg-ink" /></div>
      </div>
    </section>
  );
}
