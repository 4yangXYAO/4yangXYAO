import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Icon } from "./Icon";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/projects", labelKey: "nav.projects" },
    { path: "/about", labelKey: "nav.about" },
    { path: "/stacks", labelKey: "nav.stack" },
    { path: "/contact", labelKey: "nav.contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 h-16 transition-colors duration-300 ${isScrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-ink-line"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="container-x h-full flex items-center justify-between gap-4">
        {/* Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-1.5 font-display font-semibold tracking-tight text-paper text-lg"
        >
          XYAON
          <span className="h-2 w-2 rounded-full bg-amber" aria-hidden="true" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active =
              location.pathname === link.path ||
              location.pathname.startsWith(link.path + "/");
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? "page" : undefined}
                className="link-line text-sm text-paper-dim hover:text-paper transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link to="/contact" className="btn-primary px-4 py-2 text-sm">
            {t("home.ctaContact")}
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={isOpen}
            className="flex h-11 w-11 items-center justify-center rounded-md text-paper transition-colors hover:text-amber"
          >
            <Icon name={isOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer — CSS transition, no framer-motion */}
      <div
        className={`md:hidden absolute top-full left-0 w-full origin-top bg-ink-soft border-b border-ink-line transition-all duration-200 ease-out ${isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
          }`}
      >
        <nav className="flex flex-col container-x py-2">
          {navLinks.map((link, i) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: isOpen ? `${i * 40}ms` : "0ms" }}
                className={`link-line block py-4 text-lg transition-all duration-200 ${isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                  } ${active ? "text-paper" : "text-paper-dim hover:text-paper"}`}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>
      </div>
    </nav>
  );
};
