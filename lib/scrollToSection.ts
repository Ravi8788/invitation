"use client";

export function scrollToSection(selector: string) {
  const element = document.querySelector(selector);
  if (!element) return;

  const lenis = (
    window as Window & {
      __lenis?: { scrollTo: (target: Element | number, opts?: object) => void };
    }
  ).__lenis;

  if (lenis) {
    lenis.scrollTo(element, { offset: -72, duration: 1.2 });
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}
