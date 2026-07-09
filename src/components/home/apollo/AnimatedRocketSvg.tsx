export function AnimatedRocketSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="rocket-body" x1="24" y1="4" x2="24" y2="52">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="55%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      <path d="M24 4 L32 20 H16 Z" fill="#e2e8f0" />
      <rect x="14" y="20" width="20" height="28" rx="3" fill="url(#rocket-body)" />
      <circle cx="24" cy="30" r="5" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="1.2" />
      <path d="M14 40 L8 52 L14 48 Z" fill="#94a3b8" />
      <path d="M34 40 L40 52 L34 48 Z" fill="#94a3b8" />
      <g className="apollo-rocket-flame">
        <path
          d="M20 48 Q24 58 28 48 Q24 54 20 48Z"
          fill="#fbbf24"
          opacity="0.95"
        />
        <path
          d="M21 48 Q24 55 27 48 Q24 52 21 48Z"
          fill="#f97316"
        />
        <path
          d="M22.5 48 Q24 52 25.5 48 Q24 50 22.5 48Z"
          fill="#fef08a"
        />
      </g>
    </svg>
  );
}
