import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useProgress";
import { useLang } from "@/i18n/LanguageProvider";
import { Switch } from "@/components/ui/switch";

export function SoundToggle({ variant = "icon" }: { variant?: "icon" | "pill" | "switch" }) {
  const { on, setOn } = useSound();
  const { t } = useLang();

  if (variant === "icon") {
    return (
      <button
        onClick={() => setOn(!on)}
        className="btn-pop inline-flex h-12 w-12 items-center justify-center rounded-full bg-lilac-soft text-primary"
        aria-label={on ? t.soundOn : t.soundOff}
      >
        {on ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>
    );
  }

  if (variant === "switch") {
    return (
      <div className="btn-pop inline-flex items-center gap-2 rounded-full bg-card px-3 py-2 text-sm font-bold text-navy">
        {on ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span>{t.audio}</span>
        <Switch checked={on} onCheckedChange={setOn} />
      </div>
    );
  }

  return (
    <button
      onClick={() => setOn(!on)}
      className="btn-pop inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-bold text-navy"
    >
      {on ? <Volume2 size={18} /> : <VolumeX size={18} />}
      <span>{on ? t.soundOn : t.soundOff}</span>
    </button>
  );
}
