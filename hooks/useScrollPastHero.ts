"use client";

import { useEffect, useState } from "react";

export function useScrollPastHero() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-hero-section="true"]');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry?.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return pastHero;
}
