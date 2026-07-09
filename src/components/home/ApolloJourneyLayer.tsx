"use client";

import { useEffect, useState } from "react";
import { APOLLO_ASSETS, APOLLO_QUOTE } from "@/lib/apollo-assets";
import { useFinePointer } from "@/components/home/use-fine-pointer";
import { useClientMounted } from "@/components/three/use-client-mounted";
import { AnimatedMoonSvg } from "@/components/home/apollo/AnimatedMoonSvg";
import { AnimatedRocketSvg } from "@/components/home/apollo/AnimatedRocketSvg";

export function ApolloJourneyLayer() {
  const mounted = useClientMounted();
  const finePointer = useFinePointer();
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!finePointer) setHovered(false);
  }, [finePointer]);

  if (!mounted) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      />
    );
  }

  const interactive = finePointer;
  const showQuote = interactive && hovered;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className={`absolute bottom-[14%] left-[2%] sm:bottom-[18%] sm:left-[4%] ${
          interactive ? "pointer-events-auto" : ""
        }`}
        onMouseEnter={interactive ? () => setHovered(true) : undefined}
        onMouseLeave={interactive ? () => setHovered(false) : undefined}
      >
        {showQuote ? (
          <p
            className="pointer-events-none absolute bottom-[calc(100%+0.35rem)] left-0 z-20 w-[min(16rem,calc(100vw-2rem))] rounded-lg border border-(--surface-30-border)/70 bg-surface-60/92 px-3 py-2 text-[11px] leading-relaxed text-muted shadow-[0_8px_28px_-12px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:text-xs"
            role="tooltip"
          >
            {APOLLO_QUOTE}
          </p>
        ) : null}
        <img
          src={APOLLO_ASSETS.earth}
          alt=""
          width={80}
          height={80}
          className="h-14 w-14 object-contain opacity-95 sm:h-20 sm:w-20"
          decoding="async"
        />
      </div>

      <div
        className={`absolute bottom-[20%] right-[2%] sm:bottom-[22%] sm:right-[5%] ${
          interactive ? "pointer-events-auto" : ""
        }`}
        onMouseEnter={interactive ? () => setHovered(true) : undefined}
        onMouseLeave={interactive ? () => setHovered(false) : undefined}
      >
        <AnimatedMoonSvg className="h-12 w-12 sm:h-16 sm:w-16" />
      </div>

      {!reducedMotion ? (
        <div className="apollo-rocket absolute z-0 h-14 w-11 sm:h-16 sm:w-12">
          <AnimatedRocketSvg className="h-full w-full" />
        </div>
      ) : null}
    </div>
  );
}
