"use client";

import { useEffect, useState } from "react";

const MAX_ACTIVE = 4;
let active = 0;
const queue: Array<() => void> = [];

function release() {
  active = Math.max(0, active - 1);
  const next = queue.shift();
  if (next) next();
}

/**
 * Limita canvas WebGL simultâneos (Chrome ~8–16; muitos cards quebram cenas novas).
 */
export function useWebGLSlot(requested: boolean): boolean {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!requested) {
      setGranted(false);
      return;
    }

    let cancelled = false;
    let holding = false;

    const acquire = () => {
      if (cancelled) return;
      holding = true;
      active += 1;
      setGranted(true);
    };

    if (active < MAX_ACTIVE) {
      acquire();
    } else {
      queue.push(acquire);
    }

    return () => {
      cancelled = true;
      if (holding) {
        holding = false;
        release();
      } else {
        const idx = queue.indexOf(acquire);
        if (idx >= 0) queue.splice(idx, 1);
      }
      setGranted(false);
    };
  }, [requested]);

  return granted;
}
