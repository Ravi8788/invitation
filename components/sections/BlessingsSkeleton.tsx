export function BlessingsSkeleton() {
  return (
    <section
      className="section-cinematic px-6 py-24 md:py-32"
      aria-label="Loading blessings section"
      aria-busy="true"
    >
      <div className="mx-auto max-w-[600px]">
        <div className="mx-auto mb-10 h-10 w-48 animate-pulse rounded bg-primary/10" />
        <div className="glass-cinematic rounded-2xl p-8 opacity-70">
          <div className="mb-6 h-16 animate-pulse rounded-xl bg-primary/8" />
          <div className="space-y-4">
            <div className="h-12 animate-pulse rounded-xl bg-primary/8" />
            <div className="h-28 animate-pulse rounded-xl bg-primary/8" />
          </div>
          <div className="mx-auto mt-8 h-12 w-44 animate-pulse rounded-full bg-primary/10" />
        </div>
      </div>
    </section>
  );
}
