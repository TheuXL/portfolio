"use client";

import { useEffect, useState } from "react";

export function useThemeAccentHex(): string {
  const [color, setColor] = useState("#2dd4bf");

  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-10")
        .trim();
      if (value) setColor(value);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return color;
}
