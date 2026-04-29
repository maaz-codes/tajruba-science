import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRowProps {
  filled: number;
  total?: number;
  size?: number;
  className?: string;
  /** Show outlines only (empty look) regardless of filled count */
  outlineOnly?: boolean;
}

export function StarRow({ filled, total = 3, size = 20, className, outlineOnly }: StarRowProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = !outlineOnly && i < filled;
        return (
          <Star
            key={i}
            size={size}
            strokeWidth={2}
            className={cn(isFilled ? "fill-sun text-sun" : "fill-transparent text-lilac/60")}
          />
        );
      })}
    </div>
  );
}
