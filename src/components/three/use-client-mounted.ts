"use client";

import { useEffect, useState } from "react";

/** Evita montar WebGL antes da hidratação terminar. */
export function useClientMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
