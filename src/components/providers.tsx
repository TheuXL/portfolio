"use client";

import type { ReactNode } from "react";
import { AppThemeProvider } from "@/components/theme/theme-context";
import { ScrollSectionsProvider } from "@/components/layout/scroll-sections-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppThemeProvider>
      <ScrollSectionsProvider>{children}</ScrollSectionsProvider>
    </AppThemeProvider>
  );
}
