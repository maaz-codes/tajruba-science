import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CharacterSlotProps {
  /** Stable id of the character (matches asset filename when you add real art). */
  id: string;
  /** Optional human label shown inside the placeholder. */
  label?: string;
  /** Tailwind size classes, e.g. "w-32 h-32". */
  className?: string;
  /** Soft blob background color class. */
  blobClass?: string;
  /** Floating animation. */
  float?: boolean;
  /** Optional emoji/SVG/ReactNode rendered above the label. */
  children?: ReactNode;
}

/**
 * Placeholder for a character illustration. Drop a real PNG/SVG here later by
 * replacing the children with an <img> import.
 *
 * Slots used in the app (see src/assets/characters/README.md):
 *   panda-scientist, magnifier-bird, cat-celebrating, cat-explorer,
 *   solid-cube, liquid-droplet, gas-cloud, panda-with-tray,
 *   droplet-and-plant, explorer-running, owl-with-mosque,
 *   gas-particle, liquid-particle, solid-particle, hint-cat
 */
import { CHARACTER_IMAGES } from "@/assets/characters";

export function CharacterSlot({
  id,
  label,
  className,
  blobClass = "bg-lilac-soft",
  float = false,
  children,
}: CharacterSlotProps) {
  const characterImage = CHARACTER_IMAGES[id];

  return (
    <div
      data-character-slot={id}
      className={cn(
        "relative flex items-center justify-center rounded-[40%_60%_55%_45%/55%_45%_60%_40%]",
        blobClass,
        float && "animate-float",
        className,
      )}
      title={`Character slot: ${id}`}
    >
      <div className="flex flex-col items-center justify-center text-center text-navy/70 w-full h-full rounded-[inherit]">
        {characterImage ? (
          <img 
            src={characterImage} 
            alt={label || id} 
            className="h-full w-full object-cover"
          />
        ) : children ?? (
          <>
            <span className="text-2xl">✨</span>
            {label && <span className="mt-1 px-2 text-[10px] font-bold uppercase tracking-wide">
              {label}
            </span>}
          </>
        )}
      </div>
    </div>
  );
}
