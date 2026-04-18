"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import type { ThemeProviderProps } from "next-themes";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: "rounded-2xl"
        }}
      />
    </NextThemesProvider>
  );
}

