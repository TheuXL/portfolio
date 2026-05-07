"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useScrollSections } from "@/components/layout/scroll-sections-context";
import { NAV_SECTION_ANCHORS } from "@/lib/section-nav";

const links = [
  ...NAV_SECTION_ANCHORS.map(({ id, label }) => ({
    href: `/#${id}`,
    label,
    kind: "anchor" as const,
  })),
  { href: "/blog", label: "Blog", kind: "blog" as const },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const scroll = useScrollSections();

  function isLinkActive(href: string, kind: "anchor" | "blog"): boolean {
    if (kind === "blog") {
      return pathname.startsWith("/blog");
    }
    if (pathname !== "/" || !scroll || !href.startsWith("/#")) return false;
    const id = href.slice(2);
    return NAV_SECTION_ANCHORS.some((a) => a.id === id) &&
      scroll.activeSection === id;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-(--surface-30-border) bg-surface-60/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 font-(family-name:--font-display-family) text-lg font-semibold tracking-tight text-fg"
        >
          TheuxDev
        </Link>

        <ul className="scrollbar-thin hidden min-h-0 min-w-0 flex-1 flex-nowrap items-center justify-end gap-0.5 overflow-x-auto md:flex">
          {links.map(({ href, label, kind }) => {
            const active = isLinkActive(href, kind);
            return (
              <li key={href} className="shrink-0">
                <Link
                  href={href}
                  className={`whitespace-nowrap rounded-lg px-2.5 py-2 text-xs transition-[color,background-color,box-shadow] duration-300 lg:px-3 lg:text-sm ${
                    active
                      ? "bg-accent-soft text-fg ring-1 ring-accent/35 shadow-[0_0_20px_-8px_var(--accent-10)]"
                      : "text-muted hover:bg-surface-30/80 hover:text-fg"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
          <ThemeToggle />
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-(--surface-30-border) bg-surface-30/50 text-sm text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`border-t border-(--surface-30-border) bg-surface-60 md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto px-4 py-3">
          {links.map(({ href, label, kind }) => {
            const active = isLinkActive(href, kind);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-lg px-3 py-3 text-base transition-colors ${
                    active
                      ? "bg-accent-soft text-fg ring-1 ring-accent/30"
                      : "text-fg hover:bg-surface-30"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
