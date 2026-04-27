import { cn } from "@/lib/utils";

/**
 * Tajruba multicolor wordmark with a "Science" pill underneath.
 */
export function Wordmark({ className }: { className?: string }) {
  // Letter colors approximating the brand: T j (purple), a (blue/green), r u b a (yellow/red/green/red)
  const letters: Array<{ ch: string; color: string }> = [
    { ch: "T", color: "text-primary" },
    { ch: "a", color: "text-sky" },
    { ch: "j", color: "text-primary" },
    { ch: "r", color: "text-sun" },
    { ch: "u", color: "text-coral" },
    { ch: "b", color: "text-mint" },
    { ch: "a", color: "text-coral" },
  ];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative flex items-end leading-none">
        <span aria-hidden className="absolute -top-3 left-1/2 -translate-x-[15%] text-primary text-2xl">★</span>
        <h1 className="flex font-extrabold text-5xl md:text-6xl tracking-tight">
          {letters.map((l, i) => (
            <span key={i} className={l.color}>
              {l.ch}
            </span>
          ))}
        </h1>
      </div>
      <span className="mt-1 inline-flex items-center justify-center rounded-full bg-primary px-5 py-1 text-sm font-extrabold text-primary-foreground">
        Science
      </span>
    </div>
  );
}
