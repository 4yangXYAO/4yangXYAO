import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES, setLanguage, type LangCode } from "../../i18n";
import { Icon } from "./Icon";

export const LanguageSwitcher: React.FC<{ className?: string }> = ({
 className = "",
}) => {
 const { i18n, t } = useTranslation();
 const [open, setOpen] = useState(false);
 const rootRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  if (!open) return;
  const onDown = (e: MouseEvent) => {
   if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
  };
  const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
  document.addEventListener("mousedown", onDown);
  document.addEventListener("keydown", onKey);
  return () => {
   document.removeEventListener("mousedown", onDown);
   document.removeEventListener("keydown", onKey);
  };
 }, [open]);

 const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

 return (
  <div ref={rootRef} className={`relative ${className}`}>
   <button
    type="button"
    onClick={() => setOpen((v) => !v)}
    aria-label={t("lang.label")}
    aria-expanded={open}
    className="flex items-center gap-1.5 rounded-full border border-ink-line px-3 py-1.5
                   font-mono text-xs text-paper-dim transition-colors duration-300
                   hover:border-amber/50 hover:text-amber"
   >
    <Icon name="globe" size={14} />
    <span>{current.short}</span>
    <Icon name="chevron-down" size={12} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
   </button>

   {open && (
    <ul
     className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-ink-line
                     bg-ink-card py-1 shadow-xl shadow-black/40"
     role="menu"
    >
     {LANGUAGES.map((lang) => (
      <li key={lang.code} role="none">
       <button
        role="menuitemradio"
        aria-checked={i18n.language === lang.code}
        type="button"
        onClick={() => {
         setLanguage(lang.code as LangCode);
         setOpen(false);
        }}
        className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors
                            ${i18n.language === lang.code ? "text-amber" : "text-paper-dim hover:text-paper"}`}
       >
        <span>{lang.label}</span>
        <span className="font-mono text-xs opacity-60">{lang.short}</span>
       </button>
      </li>
     ))}
    </ul>
   )}
  </div>
 );
};
