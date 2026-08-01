"use client";

import { useEffect, useMemo, useState } from "react";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface UseCountdownReturn extends CountdownTime {
  isComplete: boolean;
}

const ZERO: CountdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function computeTimeLeft(targetMs: number): CountdownTime | null {
  const diff = targetMs - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function getInitialState(targetMs: number): UseCountdownReturn {
  const next = computeTimeLeft(targetMs);
  if (!next) return { ...ZERO, isComplete: true };
  return { ...next, isComplete: false };
}

export function useCountdown(isoDate: string): UseCountdownReturn {
  const targetMs = useMemo(() => new Date(isoDate).getTime(), [isoDate]);
  const [state, setState] = useState<UseCountdownReturn>(() =>
    getInitialState(targetMs)
  );

  useEffect(() => {
    const tick = () => {
      const next = computeTimeLeft(targetMs);
      if (!next) {
        setState({ ...ZERO, isComplete: true });
        return;
      }
      setState({ ...next, isComplete: false });
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetMs]);

  return state;
}
