import { Globe } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useLang();
  const label = lang === "ar" ? t.arabic : t.english;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="btn-pop inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-bold text-navy"
          aria-label="Language"
        >
          <Globe size={18} />
          {!compact && <span>{lang === "en" ? "English" : "العربية"}</span>}
          {compact && <span>{lang === "en" ? "EN" : "AR"}</span>}
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl">
        <DropdownMenuItem onClick={() => setLang("en")} className="font-bold">
          🇬🇧 {label === t.english ? "✓ " : ""}English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("ar")} className="font-bold">
          🇸🇦 {lang === "ar" ? "✓ " : ""}العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
