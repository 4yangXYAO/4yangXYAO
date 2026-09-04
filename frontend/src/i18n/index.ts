import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import id from "./locales/id.json";
import zh from "./locales/zh.json";

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "id", label: "Bahasa Indonesia", short: "ID" },
  { code: "zh", label: "中文", short: "中" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

const STORAGE_KEY = "xyao-lang";

function detectLang(): LangCode {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && LANGUAGES.some((l) => l.code === saved)) return saved as LangCode;
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("id")) return "id";
  if (nav.startsWith("zh")) return "zh";
  return "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    id: { translation: id },
    zh: { translation: zh },
  },
  lng: detectLang(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export function setLanguage(code: LangCode) {
  localStorage.setItem(STORAGE_KEY, code);
  i18n.changeLanguage(code);
}

// keep <html lang> in sync for a11y + SEO
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});
document.documentElement.lang = i18n.language;

export default i18n;
