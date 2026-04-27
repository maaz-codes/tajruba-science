import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarsCounterProps {
  current: number;
  total: number;
  className?: string;
}

export function StarsCounter({ current, total, className }: StarsCounterProps) {
  return (
    <div
      className={cn(
        "btn-pop inline-flex items-center gap-2 rounded-full bg-sun-soft px-4 py-2 text-base font-extrabold text-navy",
        className,
      )}
    >
      <Star className="fill-sun text-sun" size={20} />
      <span>
        {current} <span className="text-navy/50">/ {total}</span>
      </span>
    </div>
  );
}
