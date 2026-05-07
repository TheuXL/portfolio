"use client";

import { usePathname } from "next/navigation";
import { NAV_SECTION_ANCHORS } from "@/lib/section-nav";
import { useScrollSections } from "@/components/layout/scroll-sections-context";

/** Trilho vertical: linha + pontos ligados ao scroll (referência estilo sites como Oryzo/Lusion). */
export function SectionConnector() {
  const pathname = usePathname();
  const scroll = useScrollSections();

  if (pathname !== "/") return null;

  const { activeSection, pageProgress, reducedMotion, scrollToSection } =
    scroll;

  const transitionClass = reducedMotion
    ? ""
    : "transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <nav
      aria-label="Seções do portfolio"
      className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 xl:block 2xl:right-8"
    >
      <div className="pointer-events-auto relative flex h-[min(58vh,520px)] w-11 flex-col items-center justify-between py-1">
        {/* Trilho base */}
        <div
          className="absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--foreground)_14%,transparent)]"
          aria-hidden
        />

        {/* Preenchimento da linha (ligação ao progresso da página) */}
        <div
          className={`absolute left-1/2 top-3 w-0.5 max-h-[calc(100%-24px)] origin-top -translate-x-1/2 rounded-full bg-accent shadow-[0_0_14px_color-mix(in_oklab,var(--accent-10)_45%,transparent)] ${transitionClass}`}
          style={{
            height: `calc((100% - 24px) * ${pageProgress})`,
          }}
          aria-hidden
        />

        {NAV_SECTION_ANCHORS.map(({ id, label }) => {
          const active = activeSection === id;
          return (
            <button
              key={id}
              type="button"
              title={label}
              aria-label={`Ir para ${label}`}
              aria-current={active ? "location" : undefined}
              onClick={() => scrollToSection(id)}
              className={
                "group relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent " +
                (active
                  ? "bg-accent-soft ring-1 ring-accent/50"
                  : "bg-surface-60/90 ring-1 ring-(--surface-30-border) hover:bg-surface-30")
              }
            >
              <span
                className={
                  "block rounded-full transition-[transform,background-color] duration-300 " +
                  (active
                    ? "h-2.5 w-2.5 bg-accent shadow-[0_0_12px_var(--accent-10)]"
                    : "h-2 w-2 bg-[color-mix(in_oklab,var(--muted)_90%,var(--foreground)_10%)] group-hover:bg-muted")
                }
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
