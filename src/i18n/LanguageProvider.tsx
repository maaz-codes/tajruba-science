"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { STRINGS, type Lang, type Strings } from "./strings";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "tajruba.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "ar") setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: STRINGS[lang] as Strings,
    dir: lang === "ar" ? "rtl" : "ltr",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
