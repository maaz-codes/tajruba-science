import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  children: ReactNode;
  className?: string;
  /** Tail direction relative to the bubble */
  tail?: "left" | "right" | "bottom" | "none";
  variant?: "yellow" | "white" | "lilac";
}

export function SpeechBubble({
  children,
  className,
  tail = "none",
  variant = "yellow",
}: SpeechBubbleProps) {
  const bg =
    variant === "yellow"
      ? "bg-sun-soft"
      : variant === "lilac"
        ? "bg-lilac-soft"
        : "bg-card";

  return (
    <div className={cn("relative inline-block rounded-2xl px-4 py-3 text-sm font-bold text-navy shadow-card", bg, className)}>
      {children}
      {tail !== "none" && (
        <span
          aria-hidden
          className={cn(
            "absolute h-3 w-3 rotate-45",
            bg,
            tail === "left" && "left-[-6px] top-1/2 -translate-y-1/2",
            tail === "right" && "right-[-6px] top-1/2 -translate-y-1/2",
            tail === "bottom" && "bottom-[-6px] left-6",
          )}
        />
      )}
    </div>
  );
}
