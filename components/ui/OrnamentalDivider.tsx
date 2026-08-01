import { cn } from "@/lib/utils";

interface OrnamentalDividerProps {
  className?: string;
}

export function OrnamentalDivider({ className }: OrnamentalDividerProps) {
  return (
    <svg
      viewBox="0 0 320 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("mx-auto h-6 w-64 max-w-full text-primary", className)}
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="200" y1="12" x2="320" y2="12" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <path
        d="M160 4 L164 12 L172 12 L166 17 L168 24 L160 19 L152 24 L154 17 L148 12 L156 12 Z"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
        opacity="0.85"
      />
      <circle cx="128" cy="12" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="192" cy="12" r="2" fill="currentColor" opacity="0.6" />
      <path
        d="M134 12 C138 8, 142 8, 146 12 C142 16, 138 16, 134 12"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M174 12 C178 8, 182 8, 186 12 C182 16, 178 16, 174 12"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}
