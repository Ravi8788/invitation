import { cn } from "@/lib/utils";

export function SectionSkeleton({
  label,
  compact = false,
  theme = "ivory",
}: {
  label: string;
  compact?: boolean;
  theme?: "ivory" | "maroon";
}) {
  return (
    <section
      className={cn(
        compact ? "px-6 py-12" : "px-6 py-24 md:py-32",
        theme === "maroon" ? "section-maroon" : "section-ivory"
      )}
      aria-label={`Loading ${label}`}
      aria-busy="true"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 h-10 w-48 animate-pulse rounded bg-primary/10" />
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="glass-card h-48 animate-pulse bg-primary/5" />
          <div className="glass-card h-48 animate-pulse bg-primary/5" />
        </div>
      </div>
    </section>
  );
}
