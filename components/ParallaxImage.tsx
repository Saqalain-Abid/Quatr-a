"use client";
import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";

/** Full-width image that drifts slowly inside its frame while you scroll past. */
export default function ParallaxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <m.div style={{ y }} className="absolute inset-x-0 -inset-y-[15%]">
        <Image src={src} alt={alt} fill quality={60} sizes="100vw" className="object-cover opacity-70" />
      </m.div>
    </div>
  );
}
