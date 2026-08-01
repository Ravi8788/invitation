"use client";

import {
  createContext,
  useContext,
  type RefObject,
  type ReactNode,
} from "react";
import type Lenis from "lenis";

interface LenisContextValue {
  lenisRef: RefObject<Lenis | null>;
  isReady: boolean;
  isSmooth: boolean;
}

export const LenisContext = createContext<LenisContextValue | null>(null);

export function LenisProvider({
  value,
  children,
}: {
  value: LenisContextValue;
  children: ReactNode;
}) {
  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}

export function useLenisContext(): LenisContextValue {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenisContext must be used within LenisProvider");
  }
  return context;
}
