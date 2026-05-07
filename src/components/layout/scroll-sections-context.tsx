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
import { usePathname } from "next/navigation";
import {
  NAV_SECTION_ANCHORS,
  type NavSectionId,
} from "@/lib/section-nav";

type ScrollSectionsValue = {
  activeSection: NavSectionId;
  pageProgress: number;
  reducedMotion: boolean;
  scrollToSection: (id: NavSectionId) => void;
};

const Ctx = createContext<ScrollSectionsValue | undefined>(undefined);

function computeActiveSection(): NavSectionId {
  const focusY = window.innerHeight * 0.32;
  const ids = NAV_SECTION_ANCHORS.map((a) => a.id);
  let best: NavSectionId = ids[0];
  let bestScore = Infinity;

  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    const mid = r.top + r.height / 2;
    const visible =
      r.bottom > 0 &&
      r.top < window.innerHeight &&
      Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0) >
        Math.min(r.height * 0.15, 48);
    const dist = Math.abs(mid - focusY);
    const score = visible ? dist : dist + 1e6;
    if (score < bestScore) {
      bestScore = score;
      best = id;
    }
  }
  return best;
}

function computePageProgress(): number {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 1) return 0;
  return Math.min(1, Math.max(0, window.scrollY / maxScroll));
}

export function ScrollSectionsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<NavSectionId>(
    NAV_SECTION_ANCHORS[0].id,
  );
  const [pageProgress, setPageProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const update = useCallback(() => {
    if (pathname !== "/") return;
    setActiveSection(computeActiveSection());
    setPageProgress(computePageProgress());
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, update]);

  const scrollToSection = useCallback((id: NavSectionId) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const value = useMemo(
    () => ({
      activeSection,
      pageProgress,
      reducedMotion,
      scrollToSection,
    }),
    [activeSection, pageProgress, reducedMotion, scrollToSection],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useScrollSections(): ScrollSectionsValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useScrollSections exige ScrollSectionsProvider");
  }
  return ctx;
}
