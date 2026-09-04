import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { profileService } from "../../services/profileService";
import { Icon } from "./Icon";

const NAV_LINKS = [
  { path: "/", labelKey: "nav.home" },
  { path: "/projects", labelKey: "nav.projects" },
  { path: "/about", labelKey: "nav.about" },
  { path: "/stacks", labelKey: "nav.stack" },
  { path: "/contact", labelKey: "nav.contact" },
];

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });

  const githubUrl = profile?.socialLinks?.github ?? "https://github.com/4yangXYAO";

  const elsewhere = [
    {
      name: "GitHub",
      url: githubUrl,
      icon: "github" as const,
    },
    {
      name: "LinkedIn",
      url: profile?.socialLinks?.linkedin || "#",
      icon: "linkedin" as const,
    },
    ...(profile?.email
      ? [{ name: "Email", url: `mailto:${profile.email}`, icon: "mail" as const }]
      : []),
  ];

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full border-t border-ink-line bg-ink-deep">
      <div className="container-x">
        {/* Top grid */}
        <div className="grid gap-10 py-14 md:grid-cols-3">
          {/* col1 — brand */}
          <div className="flex flex-col gap-4">
            <span className="font-display font-extrabold text-2xl text-paper">
              XYAON
            </span>
            <p className="max-w-xs text-sm text-paper-dim">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-paper-faint">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-ring"
              />
              {t("footer.status")}
            </div>
          </div>

          {/* col2 — sitemap */}
          <div className="flex flex-col gap-4">
            <p className="field-label">{t("footer.sitemap")}</p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="link-line w-fit text-sm text-paper-dim hover:text-paper transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* col3 — elsewhere */}
          <div className="flex flex-col gap-4">
            <p className="field-label">{t("footer.elsewhere")}</p>
            <div className="flex flex-col gap-3">
              {elsewhere.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line flex items-center gap-3 text-sm text-paper-dim hover:text-paper transition-colors"
                >
                  <Icon name={item.icon} size={16} className="text-amber" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Giant ghost wordmark */}
        <div className="overflow-hidden py-2" aria-hidden="true">
          <div
            className="select-none text-center font-display font-extrabold leading-none text-[22vw] text-transparent"
            style={{ WebkitTextStroke: "1px #282320" }}
          >
            XYAON
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-ink-line py-6 font-mono text-[10px] uppercase tracking-wider text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <span className="flex flex-wrap items-center gap-1.5">
            © {year} Kharis Jalaludin — {t("footer.rights")}
          </span>
          <span className="hidden sm:inline">{t("footer.credits")}</span>
          <button
            type="button"
            onClick={scrollTop}
            className="link-line flex items-center gap-1.5"
          >
            {t("footer.backToTop")}
            <Icon name="arrow-up-right" size={14} className="rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
