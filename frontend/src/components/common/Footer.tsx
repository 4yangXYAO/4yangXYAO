import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { profileService } from "../../services/profileService";
import { Icon } from "./Icon";

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });

  const socialLinks: { name: string; url: string; icon: string; isExternal: boolean }[] = [
    {
      name: "GitHub",
      url: profile?.socialLinks?.github || "https://github.com/4yangXYAO",
      icon: "github",
      isExternal: true,
    },
    {
      name: "LinkedIn",
      url: profile?.socialLinks?.linkedin || "#",
      icon: "linkedin",
      isExternal: true,
    },
  ];

  if (profile?.socialLinks?.cv) {
    socialLinks.push({
      name: "CV",
      url: profile.socialLinks.cv,
      icon: "download" as const,
      isExternal: true,
    });
  }

  return (
    <footer className="w-full border-t border-ink-line bg-ink py-16 md:py-24">
      <div className="container-x flex flex-col gap-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:items-start">
          {/* Left: wordmark + tagline */}
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 font-display font-semibold tracking-tight text-paper text-lg"
            >
              XYAON
              <span className="h-2 w-2 rounded-full bg-amber" aria-hidden="true" />
            </Link>
            <p className="max-w-md text-paper-dim">{t("footer.tagline")}</p>
          </div>

          {/* Right: social links */}
          <div className="flex flex-wrap gap-6">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line flex items-center gap-2 text-sm text-paper-dim hover:text-paper transition-colors"
              >
                <Icon name={item.icon} size={18} />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-4 border-t border-ink-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-paper-dim">
            <span>© {year} XYAON</span>
            <span className="text-paper-faint">·</span>
            <span>{t("footer.credits")}</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-paper-dim">
            <span
              className="h-2 w-2 rounded-full bg-amber animate-pulse"
              aria-hidden="true"
            />
            {t("footer.status")}
          </div>
        </div>
      </div>
    </footer>
  );
};
