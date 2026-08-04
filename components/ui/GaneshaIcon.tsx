import { cn } from "@/lib/utils";
import { GANESHA_IMAGE } from "@/lib/images";

interface GaneshaIconProps {
  className?: string;
  alt?: string;
}

/** Golden Ganapati — used in opener and hero */
export function GaneshaIcon({ className, alt = "श्री गणेश" }: GaneshaIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={GANESHA_IMAGE}
      alt={alt}
      className={cn("object-contain", className)}
      decoding="async"
    />
  );
}
