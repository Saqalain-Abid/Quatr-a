import Link from "next/link";
import Hero from "@/components/Hero";
import SeasonsHorizontal from "@/components/SeasonsHorizontal";
import Marquee from "@/components/Marquee";
import { ScrubText, Rise } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-40 md:px-12 md:py-64">
        <p className="eyebrow mb-10 text-muted">The house</p>
        <ScrubText
          className="font-display text-[clamp(2.2rem,5.4vw,5rem)] font-light leading-[1.1]"
          text="We do not make four scents. We make one year, bottled in four parts, each tuned to the light, the air and the hour of its season."
        />
      </section>

      <SeasonsHorizontal />

      <section className="py-32">
        <Marquee />
      </section>

      <section className="px-6 pb-40 text-center md:px-12">
        <Rise>
          <p className="eyebrow text-muted">Four fragrances</p>
          <Link href="/collection" data-cursor="Enter"
            className="group mt-8 inline-block font-display text-[clamp(3.5rem,11vw,10rem)] font-light italic leading-none">
            <span className="inline-block transition-transform duration-700 group-hover:-translate-y-2">Click Here</span>{" "}
            <span className="outline-text inline-block transition-all duration-700 group-hover:text-ink">collection</span>
          </Link>
        </Rise>
      </section>
    </>
  );
}
