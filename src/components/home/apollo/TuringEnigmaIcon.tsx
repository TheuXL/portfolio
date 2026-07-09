import { INSPIRATION_ICONS } from "@/lib/inspirations";

export function TuringEnigmaIcon({ className = "" }: { className?: string }) {
  const src = INSPIRATION_ICONS["alan-turing"];

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div
        className="turing-rotor turing-rotor-a pointer-events-none absolute -inset-1 rounded-full border border-dashed border-accent/35"
        aria-hidden
      />
      <div
        className="turing-rotor turing-rotor-b pointer-events-none absolute inset-0.5 rounded-full border border-accent/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        aria-hidden
      >
        <span className="turing-data-bit turing-data-bit-1" />
        <span className="turing-data-bit turing-data-bit-2" />
        <span className="turing-data-bit turing-data-bit-3" />
      </div>
      {src ? (
        <img
          src={src}
          alt=""
          width={60}
          height={60}
          className="relative z-1 h-full w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          decoding="async"
        />
      ) : null}
    </div>
  );
}
