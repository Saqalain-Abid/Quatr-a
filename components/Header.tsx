"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, useScroll } from "framer-motion";
import Logo from "./Logo";

const links = [
  { href: "/collection", label: "Collection" },
  { href: "/story", label: "Story" },
];

export default function Header() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = scrollYProgress;

  return (
    <header className="fixed inset-x-0 top-0 z-[100] text-ink bg-gradient-to-b from-bg/80 to-transparent">
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" aria-label="Quatréa home" data-cursor="Home"><Logo /></Link>
        <nav className="flex gap-8 md:gap-12">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="eyebrow relative py-1">
              {l.label}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-500 ${
                  pathname.startsWith(l.href) ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>
      </div>
      <m.div className="h-px origin-left bg-ink/70 will-change-transform" style={{ scaleX }} />
    </header>
  );
}
