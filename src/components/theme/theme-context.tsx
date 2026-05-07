"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ResolvedTheme = "dark" | "light";

const STORAGE_KEY = "theuxdev-theme";

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme;
  setTheme: (t: ResolvedTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyDom(theme: ResolvedTheme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/** Evita injetar `<script>` no lugar do React (problema do next-themes + React 19). */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ResolvedTheme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial: ResolvedTheme =
      stored === "light" || stored === "dark"
        ? stored
        : prefersDark
          ? "dark"
          : "light";
    setResolvedTheme(initial);
    applyDom(initial);
  }, []);

  const setTheme = useCallback((t: ResolvedTheme) => {
    localStorage.setItem(STORAGE_KEY, t);
    setResolvedTheme(t);
    applyDom(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({ resolvedTheme, setTheme, toggleTheme }),
    [resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme requires AppThemeProvider");
  return ctx;
}
