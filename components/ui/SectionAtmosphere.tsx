import { FloatingEmbers } from "@/components/animations/FloatingEmbers";
import { cn } from "@/lib/utils";

interface SectionAtmosphereProps {
  embers?: number;
  glow?: boolean;
  className?: string;
}

/** Full-bleed background atmosphere — must be a direct child of SectionShell */
export function SectionAtmosphere({
  embers = 4,
  glow = false,
  className,
}: SectionAtmosphereProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[1] overflow-hidden", className)}
      aria-hidden
    >
      {glow ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_48%,rgba(255,140,66,0.1),transparent_72%)]" />
      ) : null}
      <FloatingEmbers count={embers} className="absolute inset-0" />
    </div>
  );
}
