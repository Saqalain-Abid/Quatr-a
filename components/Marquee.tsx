import { seasons } from "@/lib/seasons";

export default function Marquee() {
  const row = [...seasons, ...seasons];
  return (
    <div aria-hidden className="overflow-hidden border-y border-line py-8">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {[...row, ...row].map((s, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-[clamp(3rem,8vw,7rem)] font-light italic leading-none">
            <span className={i % 2 ? "outline-text" : ""} style={i % 2 ? undefined : { color: s.accent }}>{s.name}</span>
            <span className="text-2xl text-muted">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
