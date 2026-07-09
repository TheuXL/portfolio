"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  INSPIRATION_ICONS,
  INSPIRATION_LABELS,
  INSPIRATION_QUOTES,
  type InspirationSceneId,
} from "@/lib/inspirations";
import { useFinePointer } from "@/components/home/use-fine-pointer";
import { IronManArmorSvg } from "@/components/home/apollo/IronManArmorSvg";
import { TuringEnigmaIcon } from "@/components/home/apollo/TuringEnigmaIcon";

const SIZE_CLASS = {
  xs: "h-[68px] w-[68px] sm:h-[76px] sm:w-[76px]",
  sm: "h-[104px] w-[104px] sm:h-[116px] sm:w-[116px]",
  md: "h-[116px] w-[116px] sm:h-[128px] sm:w-[128px]",
} as const;

function InspirationIconFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="inspiration-miniature-glow pointer-events-none absolute inset-[4%] rounded-full"
        aria-hidden
      />
      <div className="relative z-1 h-full w-full">{children}</div>
    </div>
  );
}

export function InspirationMiniature({
  sceneId,
  size = "md",
  className = "",
  quoteAlign = "left",
  quoteWide = false,
}: {
  sceneId: InspirationSceneId;
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  quoteAlign?: "left" | "right";
  quoteWide?: boolean;
}) {
  const label = INSPIRATION_LABELS[sceneId];
  const finePointer = useFinePointer();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!finePointer) setHovered(false);
  }, [finePointer]);

  const interactive = finePointer;
  const showQuote = interactive && hovered;
  const quote = INSPIRATION_QUOTES[sceneId];
  const iconSrc = INSPIRATION_ICONS[sceneId];

  const shellClass = `absolute z-10 ${interactive ? "pointer-events-auto" : "pointer-events-none"} ${SIZE_CLASS[size]} ${className}`;

  const quoteWidth = quoteWide
    ? "w-[min(22rem,calc(100vw-2rem))]"
    : "w-[min(17.5rem,calc(100vw-2rem))]";
  const quoteClass =
    quoteAlign === "right"
      ? `pointer-events-none absolute bottom-[calc(100%+0.45rem)] right-0 z-20 ${quoteWidth} rounded-lg border border-(--surface-30-border)/70 bg-surface-60/92 px-3 py-2 text-right text-[11px] leading-relaxed text-muted shadow-[0_8px_28px_-12px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:text-xs`
      : `pointer-events-none absolute bottom-[calc(100%+0.45rem)] left-0 z-20 ${quoteWidth} rounded-lg border border-(--surface-30-border)/70 bg-surface-60/92 px-3 py-2 text-[11px] leading-relaxed text-muted shadow-[0_8px_28px_-12px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:text-xs`;

  return (
    <div
      className={shellClass}
      role="img"
      aria-label={label}
      onMouseEnter={interactive ? () => setHovered(true) : undefined}
      onMouseLeave={interactive ? () => setHovered(false) : undefined}
    >
      {showQuote ? (
        <p className={quoteClass} role="tooltip">
          {quote}
        </p>
      ) : null}

      {sceneId === "alan-turing" ? (
        <InspirationIconFrame>
          <TuringEnigmaIcon className="h-full w-full" />
        </InspirationIconFrame>
      ) : iconSrc ? (
        <InspirationIconFrame>
          <img
            src={iconSrc}
            alt=""
            width={100}
            height={100}
            className="h-full w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            decoding="async"
          />
        </InspirationIconFrame>
      ) : (
        <InspirationIconFrame>
          <IronManArmorSvg className="h-full w-full drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]" />
        </InspirationIconFrame>
      )}
    </div>
  );
}
