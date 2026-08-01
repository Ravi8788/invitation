"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const LOADER_SESSION_KEY = "sonal-avishkar-engagement-seen";

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

export const InvitationContext = createContext<InvitationContextValue | null>(
  null
);

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [skipLoader, setSkipLoader] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(LOADER_SESSION_KEY) === "true";
    const frame = requestAnimationFrame(() => {
      setSkipLoader(seen);
      if (seen) {
        setLoaderComplete(true);
        setIsOpened(true);
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const completeLoader = useCallback(() => {
    sessionStorage.setItem(LOADER_SESSION_KEY, "true");
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

  const isScrollLocked = hydrated && !skipLoader && !loaderComplete;

  const value = useMemo(
    () => ({
      isOpened,
      isScrollLocked,
      loaderComplete: !hydrated ? false : skipLoader || loaderComplete,
      skipLoader: hydrated && skipLoader,
      showConfetti,
      openInvitation,
      completeLoader,
      dismissConfetti,
    }),
    [
      isOpened,
      isScrollLocked,
      hydrated,
      skipLoader,
      loaderComplete,
      showConfetti,
      openInvitation,
      completeLoader,
      dismissConfetti,
    ]
  );

  return (
    <InvitationContext.Provider value={value}>
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitationOpened(): InvitationContextValue {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error(
      "useInvitationOpened must be used within InvitationProvider"
    );
  }
  return context;
}
