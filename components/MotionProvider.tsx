"use client";
import { LazyMotion, domAnimation } from "framer-motion";

// Loads only the animation features we use instead of the full Framer Motion bundle.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>;
}
