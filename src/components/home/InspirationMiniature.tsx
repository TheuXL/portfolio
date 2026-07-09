"use client";

import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  INSPIRATION_LABELS,
  NEWTON_HOVER_QUOTE,
  type InspirationSceneId,
} from "@/lib/inspirations";
import { ViewportLazyThree } from "@/components/three/ViewportLazyThree";
import { useFinePointer } from "@/components/home/use-fine-pointer";

type MiniatureVizProps = {
  className?: string;
  onTreeHover?: (hovered: boolean) => void;
  interactive?: boolean;
};

const NewtonAppleViz = dynamic(
  () =>
    import("@/components/three/NewtonAppleViz").then((m) => m.NewtonAppleViz),
  { ssr: false },
);

const SCENE_VIZ: Record<
  InspirationSceneId,
  ComponentType<MiniatureVizProps>
> = {
  "newton-apple": NewtonAppleViz,
};

const SIZE_CLASS = {
  sm: "h-[104px] w-[104px] sm:h-[116px] sm:w-[116px]",
  md: "h-[116px] w-[116px] sm:h-[128px] sm:w-[128px]",
} as const;

export function InspirationMiniature({
  sceneId,
  size = "md",
  className = "",
}: {
  sceneId: InspirationSceneId;
  size?: keyof typeof SIZE_CLASS;
  className?: string;
}) {
  const Viz = SCENE_VIZ[sceneId];
  const label = INSPIRATION_LABELS[sceneId];
  const finePointer = useFinePointer();
  const [treeHover, setTreeHover] = useState(false);

  useEffect(() => {
    if (!finePointer) setTreeHover(false);
  }, [finePointer]);

  const showQuote =
    finePointer && sceneId === "newton-apple" && treeHover;

  return (
    <div
      className={`absolute z-10 ${finePointer ? "pointer-events-auto" : "pointer-events-none"} ${SIZE_CLASS[size]} ${className}`}
      role="img"
      aria-label={label}
    >
      {showQuote ? (
        <p
          className="pointer-events-none absolute bottom-[calc(100%+0.45rem)] right-0 z-20 w-[min(17.5rem,calc(100vw-2rem))] rounded-lg border border-(--surface-30-border)/70 bg-surface-60/92 px-3 py-2 text-[11px] leading-relaxed text-muted shadow-[0_8px_28px_-12px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:text-xs"
          role="tooltip"
        >
          {NEWTON_HOVER_QUOTE}
        </p>
      ) : null}

      <ViewportLazyThree className="h-full w-full">
        {({ visible }) =>
          visible ? (
            <Viz
              className="h-full w-full"
              interactive={finePointer}
              onTreeHover={setTreeHover}
            />
          ) : null
        }
      </ViewportLazyThree>
    </div>
  );
}
