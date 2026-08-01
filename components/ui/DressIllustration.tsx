import type { DressCodeItem } from "@/types";

interface DressIllustrationProps {
  type: DressCodeItem["illustration"];
  className?: string;
}

export function DressIllustration({ type, className }: DressIllustrationProps) {
  const stroke = "var(--color-primary)";
  const strokeMuted = "var(--color-primary-dark)";

  switch (type) {
    case "haldi":
      return (
        <svg viewBox="0 0 120 160" fill="none" className={className} aria-hidden="true">
          <path d="M60 20 C72 20 80 30 80 42 L80 55 L95 75 L95 145 L25 145 L25 75 L40 55 L40 42 C40 30 48 20 60 20Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M40 55 L80 55 L80 90 C80 100 72 108 60 108 C48 108 40 100 40 90 Z" stroke={strokeMuted} strokeWidth="1" opacity="0.6" />
          <circle cx="60" cy="38" r="10" stroke={stroke} strokeWidth="1.2" />
        </svg>
      );
    case "mehendi":
      return (
        <svg viewBox="0 0 120 160" fill="none" className={className} aria-hidden="true">
          <path d="M58 18 C70 18 78 28 78 40 L78 52 L92 72 L92 145 L28 145 L28 72 L42 52 L42 40 C42 28 50 18 62 18" stroke={stroke} strokeWidth="1.5" />
          <path d="M35 95 Q60 110 85 95" stroke={strokeMuted} strokeWidth="1" opacity="0.55" />
          <path d="M38 108 Q60 125 82 108" stroke={strokeMuted} strokeWidth="1" opacity="0.45" />
          <path d="M42 72 L78 72" stroke={stroke} strokeWidth="1" opacity="0.4" />
        </svg>
      );
    case "sangeet":
      return (
        <svg viewBox="0 0 120 160" fill="none" className={className} aria-hidden="true">
          <path d="M45 30 L75 30 L88 145 L32 145 Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M38 55 L82 55" stroke={strokeMuted} strokeWidth="1" />
          <path d="M35 80 L85 80" stroke={strokeMuted} strokeWidth="1" opacity="0.6" />
          <path d="M55 20 L65 20 L62 32 L58 32 Z" stroke={stroke} strokeWidth="1.2" />
          <circle cx="60" cy="24" r="8" stroke={strokeMuted} strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "wedding":
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
          <path d="M48 40 L48 145 L35 145 L35 70 L48 55 Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M112 40 L112 145 L125 145 L125 70 L112 55 Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M55 40 L105 40 L98 52 L62 52 Z" stroke={strokeMuted} strokeWidth="1" />
          <circle cx="80" cy="32" r="12" stroke={stroke} strokeWidth="1.2" />
          <path d="M60 90 L100 90" stroke={strokeMuted} strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "engagement":
      return (
        <svg viewBox="0 0 120 160" fill="none" className={className} aria-hidden="true">
          <path d="M58 22 C70 22 78 32 78 44 L78 56 L92 76 L92 145 L28 145 L28 76 L42 56 L42 44 C42 32 50 22 62 22" stroke={stroke} strokeWidth="1.5" />
          <circle cx="60" cy="118" r="14" stroke={stroke} strokeWidth="1.5" />
          <path d="M60 104 L60 132 M52 118 L68 118" stroke={strokeMuted} strokeWidth="1" opacity="0.5" />
          <path d="M54 108 L66 128 M66 108 L54 128" stroke={stroke} strokeWidth="0.8" opacity="0.35" />
        </svg>
      );
    case "reception":
      return (
        <svg viewBox="0 0 120 160" fill="none" className={className} aria-hidden="true">
          <path d="M38 35 L82 35 L90 145 L30 145 Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M42 60 L78 60" stroke={strokeMuted} strokeWidth="1" />
          <path d="M40 85 L80 85" stroke={strokeMuted} strokeWidth="1" opacity="0.55" />
          <path d="M50 22 L70 22 L68 35 L52 35 Z" stroke={stroke} strokeWidth="1.2" />
          <path d="M55 100 L65 118 L75 100" stroke={stroke} strokeWidth="1" opacity="0.45" />
        </svg>
      );
  }
}
