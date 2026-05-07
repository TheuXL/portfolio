"use client";

import { useAppTheme } from "@/components/theme/theme-context";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useAppTheme();

  return (
    <button
      type="button"
      className="flex h-10 min-w-11 items-center justify-center rounded-lg border border-(--surface-30-border) bg-surface-30/60 px-3 text-xs font-medium text-fg transition-colors hover:bg-surface-30"
      aria-label={
        resolvedTheme === "dark"
          ? "Ativar tema claro"
          : "Ativar tema escuro"
      }
      onClick={toggleTheme}
    >
      {resolvedTheme === "dark" ? "Claro" : "Escuro"}
    </button>
  );
}
