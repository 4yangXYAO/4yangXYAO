import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { profileService } from "../services/profileService";
import { Icon } from "../components/common/Icon";
import { Reveal } from "../components/common/Reveal";
import { SectionHeading } from "../components/common/SectionHeading";
import { getImageUrl } from "../utils/constants";

const valueKeys = ["boring", "finish", "curious"] as const;
const valueIcons = { boring: "shield", finish: "zap", curious: "sparkles" } as const;

export const AboutPage = () => {
  const { t } = useTranslation();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });

  const [photoError, setPhotoError] = useState(false);
  const avatarSrc = profile?.avatar
    ? getImageUrl(profile.avatar)
    : "/media/profile/profile.webp";
  const initials = (profile?.name || "Kharis Jalaludin")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <main className="container-x pb-20 pt-32">
      <div className="grid items-start gap-16 lg:grid-cols-[1fr_280px]">
        <article className="max-w-3xl">
          <Reveal>
            <div className="eyebrow">{t("about.label")}</div>
            <h1 className="mt-4 text-display-lg text-paper">{t("about.title")}</h1>
            <p className="mt-6 text-lead text-paper-dim">{t("about.lead")}</p>
          </Reveal>

          <div className="mt-8 space-y-6 leading-relaxed text-paper-dim">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>

          <section className="mt-24">
            <SectionHeading title={t("about.valuesTitle")} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {valueKeys.map((key, i) => (
                <Reveal key={key} delay={i * 120}>
                  <div className="card p-8">
                    <Icon name={valueIcons[key]} size={24} className="text-amber" />
                    <h3 className="mb-2 mt-5 font-display text-lg text-paper">
                      {t(`about.values.${key}.title`)}
                    </h3>
                    <p className="text-sm text-paper-dim">
                      {t(`about.values.${key}.body`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </article>

        <aside className="space-y-6">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-ink-line bg-ink-soft">
            {photoError ? (
              <div className="grid h-full w-full place-items-center">
                <div className="grid h-24 w-24 place-items-center rounded-full bg-amber-soft font-display text-2xl text-amber">
                  {initials}
                </div>
              </div>
            ) : (
              <img
                src={avatarSrc}
                alt={profile?.name || "Kharis Jalaludin"}
                loading="lazy"
                onError={() => setPhotoError(true)}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="card divide-y divide-ink-line p-6 lg:sticky lg:top-28">
            <FactRow
              icon="map-pin"
              label={t("about.facts.location")}
              value={t("about.facts.locationValue")}
            />
            <FactRow
              icon="zap"
              label={t("about.facts.focus")}
              value={t("about.facts.focusValue")}
            />
            <FactRow
              icon="globe"
              label={t("about.facts.language")}
              value={t("about.facts.languageValue")}
            />
          </div>
        </aside>
      </div>
    </main>
  );
};

const FactRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <div className="py-3 first:pt-0 last:pb-0">
    <div className="flex items-center gap-2">
      <Icon name={icon} size={14} className="text-amber" />
      <span className="font-mono text-[11px] uppercase tracking-wider text-paper-faint">
        {label}
      </span>
    </div>
    <div className="mt-0.5 text-paper">{value}</div>
  </div>
);
