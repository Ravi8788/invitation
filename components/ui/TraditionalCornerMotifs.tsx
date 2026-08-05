/** Ornate corner peacock/paisley motifs — matches reference invitation loader */
export function TraditionalCornerMotifs() {
  const corners = [
    "top-0 left-0",
    "top-0 right-0 scale-x-[-1]",
    "bottom-0 left-0 scale-y-[-1]",
    "bottom-0 right-0 rotate-180",
  ] as const;

  return (
    <>
      {corners.map((position) => (
        <div
          key={position}
          className={`pointer-events-none absolute ${position} h-32 w-32 text-gold opacity-80 sm:h-48 sm:w-48 md:h-80 md:w-80`}
          aria-hidden
        >
          <CornerSvg />
        </div>
      ))}
    </>
  );
}

function CornerSvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="h-full w-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
      <path className="vine-path" d="M0,10 C100,10 190,100 190,200" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path className="vine-path" style={{ animationDelay: "0.3s" }} d="M0,25 C85,25 175,115 175,200" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path className="leaf-path" style={{ animationDelay: "0.8s" }} d="M40,25 C110,25 140,80 110,130 C80,170 30,130 50,90 C65,65 100,85 85,110" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path className="leaf-path text-gold/40" style={{ animationDelay: "1.2s" }} d="M60,95 C75,80 90,95 80,110 C70,120 50,110 60,95 Z" fill="currentColor" />
      <path className="leaf-path text-gold-light" style={{ animationDelay: "1.1s" }} d="M120,30 C150,15 180,40 165,70 C150,100 110,70 120,30 Z" fill="currentColor" />
      <path className="leaf-path text-gold/70" style={{ animationDelay: "1.3s" }} d="M150,75 C180,70 200,100 185,130 C170,150 135,110 150,75 Z" fill="currentColor" />
      <path className="vine-path" style={{ animationDelay: "1.0s" }} d="M0,60 C40,60 60,80 60,120 M0,80 C25,80 40,95 40,120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path className="leaf-path text-gold-light" style={{ animationDelay: "1.5s" }} d="M20,70 C40,50 60,70 50,90 C40,110 10,90 20,70 Z" fill="currentColor" />
      <circle cx="85" cy="110" r="2.5" className="flower-scale" style={{ animationDelay: "1.8s" }} fill="currentColor" />
      <circle cx="30" cy="15" r="2" className="flower-scale" style={{ animationDelay: "1.9s" }} fill="currentColor" />
      <circle cx="160" cy="20" r="3" className="flower-scale" style={{ animationDelay: "2.0s" }} fill="currentColor" />
      <circle cx="190" cy="80" r="2.5" className="flower-scale" style={{ animationDelay: "2.1s" }} fill="currentColor" />
      <circle cx="170" cy="150" r="2" className="flower-scale" style={{ animationDelay: "2.2s" }} fill="currentColor" />
      <circle cx="130" cy="180" r="3" className="flower-scale" style={{ animationDelay: "2.3s" }} fill="currentColor" />
      <circle cx="80" cy="45" r="1.5" className="flower-scale" style={{ animationDelay: "2.4s" }} fill="currentColor" />
    </svg>
  );
}
