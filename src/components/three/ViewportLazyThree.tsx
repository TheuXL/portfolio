"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ThreeSceneFallback } from "@/components/three/ThreeSceneFallback";

type ViewportLazyThreeProps = {
  className?: string;
  fallbackLabel?: string;
  children: ReactNode | ((state: { visible: boolean }) => ReactNode);
};

/**
 * Monta conteúdo WebGL só no viewport; desmonta ao sair para libertar contexto.
 */
export function ViewportLazyThree({
  children,
  className = "",
  fallbackLabel,
}: ViewportLazyThreeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "60px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const content =
    typeof children === "function" ? children({ visible }) : visible ? children : null;

  return (
    <div ref={rootRef} className={`h-full w-full ${className}`}>
      {content ?? (
        <ThreeSceneFallback label={fallbackLabel} className="h-full w-full" />
      )}
    </div>
  );
}
