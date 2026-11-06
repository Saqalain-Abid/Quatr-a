/** Monogram: a circle split into four seasonal quadrants. */
export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g stroke="#0b0a0a" strokeWidth="3" strokeLinejoin="round">
        <path d="M32 32V6A26 26 0 0 1 58 32Z" fill="#f0a7bd" />
        <path d="M32 32H58A26 26 0 0 1 32 58Z" fill="#ffbf4d" />
        <path d="M32 32V58A26 26 0 0 1 6 32Z" fill="#e0872f" />
        <path d="M32 32H6A26 26 0 0 1 32 6Z" fill="#9cc3e6" />
      </g>
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-3">
      <Mark />
      <span className="font-display text-2xl font-light tracking-[0.12em]">QUATRÉA</span>
    </span>
  );
}
