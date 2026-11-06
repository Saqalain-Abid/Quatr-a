import { useId } from "react";

/** The Quatréa flacon: glass filled with the season's photograph. */
export default function Bottle({
  img, accent, name, className,
}: { img: string; accent: string; name: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  // Route the SVG <image> through the Next optimizer so it loads a small AVIF/WebP, not the 1800px original.
  const src = `/_next/image?url=${encodeURIComponent(img)}&w=640&q=75`;
  return (
    <svg viewBox="0 0 200 380" className={className} role="img" aria-label={`${name} perfume bottle`}>
      <defs>
        <clipPath id={`body${id}`}><rect x="26" y="132" width="148" height="232" rx="18" /></clipPath>
        <linearGradient id={`glass${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".38" />
          <stop offset=".28" stopColor="#fff" stopOpacity="0" />
          <stop offset=".75" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id={`cap${id}`} x1="0" x2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset=".45" stopColor="#fff" stopOpacity=".85" />
          <stop offset="1" stopColor={accent} stopOpacity=".55" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="368" rx="70" ry="6" fill="#000" opacity=".5" />
      <image href={src}x="-50" y="120" width="300" height="260" preserveAspectRatio="xMidYMid slice" clipPath={`url(#body${id})`} />
      <rect x="26" y="132" width="148" height="232" rx="18" fill="#000" opacity=".18" />
      <rect x="26" y="132" width="148" height="232" rx="18" fill={`url(#glass${id})`} />
      <rect x="26" y="132" width="148" height="232" rx="18" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.5" />
      <rect x="78" y="96" width="44" height="40" fill="#fff" fillOpacity=".14" stroke="#fff" strokeOpacity=".5" />
      <rect x="64" y="26" width="72" height="74" rx="8" fill={`url(#cap${id})`} />
      <rect x="54" y="214" width="92" height="86" fill="#0b0a0a" fillOpacity=".72" stroke={accent} strokeOpacity=".7" />
      <g textAnchor="middle" fill="#efe8dc" style={{ fontFamily: "var(--f-display), serif" }}>
        <text x="100" y="244" fontSize="11" letterSpacing="3">QUATRÉA</text>
        <text x="100" y="272" fontSize="17" fontStyle="italic" fill={accent}>{name}</text>
        <text x="100" y="290" fontSize="7" letterSpacing="2" opacity=".7">EAU DE PARFUM</text>
      </g>
    </svg>
  );
}
