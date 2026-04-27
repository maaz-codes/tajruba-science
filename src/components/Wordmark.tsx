import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo.png";

/**
 * Tajruba logo image.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img 
        src={(logoUrl as any).src ?? String(logoUrl)} 
        alt="Tajruba Science" 
        className="h-28 md:h-36 object-contain" 
      />
    </div>
  );
}
