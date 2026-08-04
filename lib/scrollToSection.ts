"use client";

export function scrollToSection(selector: string) {
  const element = document.querySelector(selector);
  if (!element) return;

  const navOffset = window.matchMedia("(max-width: 767px)").matches ? 88 : 72;

  const lenis = (
    window as Window & {
      __lenis?: { scrollTo: (target: Element | number, opts?: object) => void };
    }
  ).__lenis;

  if (lenis) {
    lenis.scrollTo(element, { offset: -navOffset, duration: 1 });
    return;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top, behavior: "smooth" });
}
