/** Fallback estático quando WebGL não está disponível ou motion reduzido. */
export function ThreeSceneFallback({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-surface-30/80 via-surface-60 to-surface-30/60 ${className}`}
      aria-hidden
    >
      <div className="relative h-32 w-32 sm:h-40 sm:w-40">
        <div className="absolute inset-0 animate-[spin_24s_linear_infinite] rounded-full border border-accent/25" />
        <div className="absolute inset-3 animate-[spin_18s_linear_infinite_reverse] rounded-full border border-dashed border-accent/35" />
        <div className="absolute inset-6 rounded-full bg-accent/10 blur-md" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-accent/70 shadow-[0_0_16px_var(--accent-10)]" />
        </div>
      </div>
      {label ? (
        <span className="absolute bottom-3 text-[10px] font-medium uppercase tracking-wider text-muted">
          {label}
        </span>
      ) : null}
    </div>
  );
}
