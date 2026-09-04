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

const TIMELINE_YEARS = ["2017", "2019", "2022", "2024"] as const;

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

  const timelineTitle = t("about.timelineTitle"); // "How I got here"
  const valuesTitle = t("about.valuesTitle"); // "How I work"

  return (
    <main className="container-x pb-20 pt-32">
      {/* ============ HEADER ============ */}
      <Reveal className="mb-16">
        <div className="eyebrow">{t("about.label")}</div>
        <h1 className="mt-4 text-display-xl font-extrabold text-paper">
          {t("about.title")}
        </h1>
      </Reveal>

      {/* ============ MAGAZINE SPREAD ============ */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* LEFT: portrait + caption */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="crop rotate-1 transition-transform duration-500 ease-smooth hover:rotate-0">
              <div className="overflow-hidden rounded-lg border border-ink-line bg-ink-card">
                {photoError ? (
                  <div className="grid aspect-[4/5] w-full place-items-center bg-ink-card">
                    <div className="grid h-24 w-24 place-items-center rounded-full border border-amber/40 font-display text-2xl text-amber">
                      {initials}
                    </div>
                  </div>
                ) : (
                  <img
                    src={avatarSrc}
                    alt={profile?.name || "Kharis Jalaludin"}
                    width={480}
                    height={600}
                    onError={() => setPhotoError(true)}
                    className="aspect-[4/5] w-full object-cover"
                    loading="eager"
                  />
                )}
              </div>
            </div>
            <div className="well mt-4 p-3 text-[10px] uppercase tracking-[0.2em] text-paper-faint">
              {t("about.facts.location")} — {t("about.facts.locationValue")}
            </div>
          </div>
        </div>

        {/* RIGHT: lead + pull quote + paragraphs + facts */}
        <div className="lg:col-span-7">
          <p className="text-lead text-paper-dim">{t("about.lead")}</p>

          <blockquote className="my-10 border-l-2 border-amber/40 pl-6 font-serif text-display-md italic text-amber">
            {t("about.pullQuote")}
          </blockquote>

          <div className="space-y-5 leading-relaxed text-paper-dim">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>

          <dl className="mt-10 divide-y divide-ink-line border-t border-ink-line">
            {(
              [
                ["location", "locationValue"],
                ["focus", "focusValue"],
                ["language", "languageValue"],
              ] as const
            ).map(([labelKey, valueKey]) => (
              <div
                key={labelKey}
                className="grid grid-cols-[auto_1fr] gap-4 py-3 font-mono text-xs"
              >
                <dt className="uppercase tracking-[0.18em] text-paper-faint">
                  {t(`about.facts.${labelKey}`)}
                </dt>
                <dd className="text-right text-paper">{t(`about.facts.${valueKey}`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ============ TIMELINE ============ */}
      <section className="section-y relative">
        <SectionHeading
          index="01"
          eyebrow={timelineTitle}
          title={
            <>
              {timelineTitle.replace("here", "")}
              <span className="font-serif italic text-amber">here</span>
            </>
          }
        />

        <div className="relative ml-2 border-l border-ink-line pl-8">
          {TIMELINE_YEARS.map((year, i) => (
            <Reveal key={year} delay={i * 100} className="group relative pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-amber bg-ink"
              />
              <div className="font-mono text-sm text-amber">{year}</div>
              <h3 className="mt-1 font-display text-xl font-bold text-paper">
                {t(`about.timeline.${year}.title`)}
              </h3>
              <p className="mt-2 max-w-xl text-paper-dim">
                {t(`about.timeline.${year}.body`)}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="section-y relative">
        <SectionHeading
          index="02"
          eyebrow={valuesTitle}
          title={
            <>
              {valuesTitle.replace("work", "")}
              <span className="font-serif italic text-amber">work</span>
            </>
          }
        />

        <ul>
          {valueKeys.map((key, i) => (
            <Reveal
              as="li"
              key={key}
              delay={i * 100}
              className="group border-t border-ink-line last:border-b"
            >
              <div className="grid grid-cols-[3.5rem_1fr] gap-4 py-8 transition-transform duration-300 ease-smooth group-hover:translate-x-1.5 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-10">
                <span className="pt-1 font-mono text-sm text-paper-faint transition-colors duration-300 group-hover:text-amber">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="flex items-center gap-3 text-display-md font-bold text-paper">
                    <Icon name={valueIcons[key]} size={22} className="shrink-0 text-amber" />
                    {t(`about.values.${key}.title`)}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-paper-dim">
                    {t(`about.values.${key}.body`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ============ CURRENTLY ============ */}
      <section className="section-y relative">
        <div className="eyebrow mb-6">{t("about.currentlyTitle")}</div>
        <div className="well grid divide-y divide-ink-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {(
            [
              ["learning", "label", "value"],
              ["reading", "label", "value"],
              ["building", "label", "value"],
            ] as const
          ).map(([key, labelKey, valueKey]) => (
            <div key={key} className="p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-faint">
                {t(`about.currently.${key}.${labelKey}`)}
              </div>
              <div className="mt-2 text-paper">{t(`about.currently.${key}.${valueKey}`)}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
