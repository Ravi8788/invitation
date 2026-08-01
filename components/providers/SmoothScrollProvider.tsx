"use client";

import { useLenis } from "@/hooks/useLenis";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { LenisProvider } from "@/hooks/useLenisContext";
import { GlobalUi } from "@/components/providers/GlobalUi";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const { lenisRef, isReady, isSmooth } = useLenis();
  const progress = useScrollProgress(lenisRef, isReady, isSmooth);

  return (
    <LenisProvider value={{ lenisRef, isReady, isSmooth }}>
      <GlobalUi>
        <ScrollProgressBar progress={progress} />
        {children}
      </GlobalUi>
    </LenisProvider>
  );
}
