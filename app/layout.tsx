import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";
import MotionProvider from "@/components/MotionProvider";

const display = Cormorant_Garamond({
  subsets: ["latin"], variable: "--f-display", weight: ["300", "400"], style: ["normal", "italic"],
});
const body = Manrope({ subsets: ["latin"], variable: "--f-body" });

export const metadata: Metadata = {
  title: { default: "Quatréa — Four seasons, four perfumes", template: "%s — Quatréa" },
  description: "A fictional perfume house with one fragrance for each season.",
};
export const viewport: Viewport = { themeColor: "#0b0a0a", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <MotionProvider><SmoothScroll>
          <Cursor />
          <Header />
          <main>{children}</main>
          <footer className="border-t border-line px-6 pb-10 pt-24 md:px-12">
            <p className="font-display text-[clamp(4rem,19vw,19rem)] font-light leading-[0.85] outline-text opacity-80">Quatréa</p>
            <div className="mt-14 flex flex-col justify-between gap-6 text-sm text-muted md:flex-row">
              <p>A fictional perfume house. Four seasons, one year.</p>
              <nav className="flex gap-8">
                <Link href="/collection" className="hover:text-ink">Collection</Link>
                <Link href="/story" className="hover:text-ink">Story</Link>
              </nav>
              <p>© 2026 Quatréa</p>
            </div>
          </footer>
        </SmoothScroll></MotionProvider>
      </body>
    </html>
  );
}
