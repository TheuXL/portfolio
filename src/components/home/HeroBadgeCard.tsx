import Image from "next/image";

type HeroBadgeCardProps = {
  photoSrc: string;
  photoAlt: string;
  name: string;
  role: string;
  company?: string;
};

/** Crachá estilo identificação — foto em moldura, ilhós superior e faixa de dados. */
export function HeroBadgeCard({
  photoSrc,
  photoAlt,
  name,
  role,
  company = "TheuxDev",
}: HeroBadgeCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-[280px] select-none sm:max-w-[300px]">
      {/* Presilha / cordão simplificado */}
      <div
        className="relative z-20 mx-auto flex h-7 w-[4.5rem] justify-center"
        aria-hidden
      >
        <div className="absolute top-0 h-full w-14 rounded-t-xl border border-b-0 border-(--surface-30-border) bg-linear-to-b from-surface-30 to-surface-60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
        <div className="relative mt-1 flex h-5 w-11 items-center justify-center rounded-full border-2 border-(--surface-30-border) bg-surface-60 shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
          <span className="block h-2 w-6 rounded-full bg-black/40 dark:bg-black/50" />
        </div>
      </div>

      {/* Corpo do crachá */}
      <div
        className={[
          "relative z-10 -mt-1 rounded-2xl border-2 border-(--surface-30-border)",
          "bg-linear-to-b from-surface-30 via-surface-30 to-surface-60",
          "p-3 pt-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.25),0_20px_40px_-16px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]",
          "rotate-[1.5deg] transition-transform duration-300 sm:hover:rotate-0",
        ].join(" ")}
      >
        {/* Moldura tipo foto 3×4 */}
        <div className="mx-auto overflow-hidden rounded-lg border-[6px] border-white shadow-[0_2px_12px_rgba(0,0,0,0.2)] dark:border-white/12 dark:shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-3/4 w-full overflow-hidden bg-surface-60">
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              priority
              className="object-cover object-[center_13%] scale-[1.2]"
              sizes="300px"
            />
          </div>
        </div>

        {/* Faixa inferior — dados do crachá */}
        <div className="mt-3 rounded-lg border border-accent/25 bg-accent-soft/40 px-3 py-3 text-center dark:bg-accent-soft/25">
          <p className="font-(family-name:--font-display-family) text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-accent">
            {company}
          </p>
          <p className="mt-2 font-(family-name:--font-display-family) text-base font-bold uppercase tracking-wide text-fg">
            {name}
          </p>
          <p className="mt-1 border-t border-(--surface-30-border) pt-2 text-xs font-medium uppercase tracking-wider text-muted">
            {role}
          </p>
        </div>

        {/* Detalhe holográfico sutil */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.07]"
          style={{
            background:
              "linear-gradient(125deg, transparent 40%, rgba(255,255,255,0.9) 48%, transparent 56%)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
