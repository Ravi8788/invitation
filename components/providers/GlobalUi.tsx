"use client";

import dynamic from "next/dynamic";

const CursorGlow = dynamic(
  () =>
    import("@/components/ui/CursorGlow").then((mod) => ({
      default: mod.CursorGlow,
    })),
  { ssr: false },
);

interface GlobalUiProps {
  children: React.ReactNode;
}

export function GlobalUi({ children }: GlobalUiProps) {
  return (
    <>
      {children}
      <CursorGlow />
    </>
  );
}
