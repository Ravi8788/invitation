"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface InvitationContextValue {
  isOpened: boolean;
  isScrollLocked: boolean;
  loaderComplete: boolean;
  skipLoader: boolean;
  showConfetti: boolean;
  openInvitation: () => void;
  completeLoader: () => void;
  dismissConfetti: () => void;
}

export const InvitationContext = createContext<InvitationContextValue | null>(null);

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [isOpened, setIsOpened] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const completeLoader = useCallback(() => {
    setLoaderComplete(true);
    setIsOpened(true);
  }, []);

  const openInvitation = useCallback(() => {
    setIsOpened(true);
    setShowConfetti(true);
  }, []);

  const dismissConfetti = useCallback(() => {
    setShowConfetti(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpened,
      isScrollLocked: !loaderComplete,
      loaderComplete,
      skipLoader: false,
      showConfetti,
      openInvitation,
      completeLoader,
      dismissConfetti,
    }),
    [isOpened, loaderComplete, showConfetti, openInvitation, completeLoader, dismissConfetti],
  );

  return <InvitationContext.Provider value={value}>{children}</InvitationContext.Provider>;
}

export function useInvitationOpened(): InvitationContextValue {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error("useInvitationOpened must be used within InvitationProvider");
  }
  return context;
}
