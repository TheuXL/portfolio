export function AnimatedMoonSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`apollo-moon-pulse ${className}`}
      aria-hidden
    >
      <defs>
        <radialGradient id="moon-surface" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="26" fill="url(#moon-surface)" />
      <ellipse cx="24" cy="26" rx="5" ry="4" fill="#64748b" opacity="0.35" />
      <ellipse cx="38" cy="34" rx="7" ry="5" fill="#64748b" opacity="0.28" />
      <ellipse cx="30" cy="42" rx="4" ry="3" fill="#64748b" opacity="0.3" />
      <circle cx="42" cy="22" r="2.5" fill="#cbd5e1" opacity="0.5" />
      <circle
        cx="32"
        cy="32"
        r="26"
        stroke="color-mix(in oklab, var(--foreground) 12%, transparent)"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
