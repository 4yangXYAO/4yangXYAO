import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projectService } from "../services/projectService";
import { profileService } from "../services/profileService";
import { SkeletonCard } from "../components/common/PageLoader";
import { Reveal } from "../components/common/Reveal";
import { Icon } from "../components/common/Icon";
import { SectionHeading } from "../components/common/SectionHeading";
import { ProjectCover } from "../components/common/ProjectCover";
import { LocalClock } from "../components/common/LocalClock";
import { FALLBACK_PROJECTS } from "../data/projects";

// Contract-shaped project consumed by the work index (API + fallback).
type FeaturedProject = {
  _id: string;
  title: string;
  slug: string;
  description: string | { en: string; id: string; zh: string };
  technologies: string[];
  image?: string;
  featured?: boolean;
};

const SKILLS = [
  { key: "network", icon: "network" },
  { key: "frontend", icon: "code" },
  { key: "ai", icon: "sparkles" },
] as const;

const renderName = (name: string) => {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return name;
  const last = words.pop() as string;
  return (
    <>
      {words.join(" ")} <span className="text-amber">{last}</span>
    </>
  );
};

export const HomePage = () => {
  const { t, i18n } = useTranslation();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });

  const { data: apiProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => projectService.getAll(),
  });

  const featured: FeaturedProject[] = apiProjects?.some((p) => p.featured)
    ? apiProjects
      .filter((p) => p.featured)
      .slice(0, 3)
      .map((p) => ({
        _id: p._id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        technologies: p.technologies,
        image: p.imageUrl,
        featured: p.featured,
      }))
    : FALLBACK_PROJECTS.filter((p) => p.featured).slice(0, 3);

  const marqueeItems = t("home.marquee")
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);

  const displayName = profile?.name ?? t("home.name");
  const lang = i18n.language?.startsWith("zh") ? "zh" : i18n.language?.startsWith("id") ? "id" : "en";

  const descOf = (p: FeaturedProject) =>
    typeof p.description === "string" ? p.description : p.description[lang];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 grid-lines" />
        <div aria-hidden="true" className="glow-amber -right-48 -top-48 h-[44rem] w-[44rem]" />
        <div aria-hidden="true" className="glow-amber -left-40 top-1/2 h-[32rem] w-[32rem] opacity-60" />

        <div className="container-x relative flex min-h-[100svh] flex-col justify-between pb-10 pt-28 sm:pt-32">
          {/* meta strip */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-ink-line pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-faint sm:text-[11px]">
            <span>
              {t("home.location")} — <LocalClock />
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-signal" />
              {t("home.status")}
            </span>
          </div>

          {/* main composition */}
          <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-6">{t("home.greeting")} — {t("home.role")}</div>
              <h1 className="text-display-2xl font-extrabold text-paper">
                {renderName(displayName)}
                <span className="text-amber">.</span>
              </h1>
              <p className="mt-6 max-w-xl font-serif text-[clamp(1.5rem,3vw,2.25rem)] italic leading-snug text-paper-dim">
                {t("home.tagline")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#work" className="btn-primary">
                  {t("home.ctaWork")}
                  <Icon name="arrow-right" size={16} />
                </a>
                <Link to="/contact" className="btn-ghost">
                  {t("home.ctaContact")}
                </Link>
              </div>
            </div>

            {/* portrait + console */}
            <div className="relative mx-auto w-full max-w-sm lg:col-span-5">
              <Reveal variant="scale" className="crop rotate-1 transition-transform duration-500 ease-smooth hover:rotate-0">
                <div className="overflow-hidden rounded-lg border border-ink-line bg-ink-card">
                  <img
                    src="/media/profile/profile.webp"
                    alt={displayName}
                    width={480}
                    height={600}
                    className="aspect-[4/5] w-full object-cover"
                    loading="eager"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* stats strip */}
          <div className="grid grid-cols-1 divide-y divide-ink-line border-t border-ink-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {(
              [
                ["years", "yearsLabel"],
                ["projects", "projectsLabel"],
                ["uptime", "uptimeLabel"],
              ] as const
            ).map(([numKey, labelKey], i) => (
              <Reveal key={numKey} delay={i * 120} className="flex items-baseline justify-between gap-4 py-5 sm:flex-col sm:items-start sm:gap-1 sm:py-6">
                <span className="text-metric font-display font-extrabold text-paper">{t(`home.stats.${numKey}`)}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-faint">
                  {t(`home.stats.${labelKey}`)}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="overflow-hidden border-y border-ink-line bg-ink-raised py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {marqueeItems.map((item) => (
                <span key={`${dup}-${item}`} className="flex items-center font-mono text-[11px] uppercase tracking-[0.25em] text-paper-faint">
                  <span className="px-6">{item}</span>
                  <span className="text-amber/70">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ SKILLS ============ */}
      <section id="skills" className="section-y relative">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="01"
                eyebrow={t("home.skillsLabel")}
                title={
                  <>
                    {t("home.skillsTitle").split(",")[0]}
                    {t("home.skillsTitle").includes(",") && (
                      <>
                        ,{" "}
                        <span className="font-serif italic text-amber">
                          {t("home.skillsTitle").split(",").slice(1).join(",").trim()}
                        </span>
                      </>
                    )}
                  </>
                }
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul>
              {SKILLS.map((s, i) => (
                <Reveal as="li" key={s.key} delay={i * 100} className="group border-t border-ink-line last:border-b">
                  <div className="grid grid-cols-[3.5rem_1fr] gap-4 py-8 transition-transform duration-300 ease-smooth group-hover:translate-x-1.5 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-10">
                    <span className="pt-1 font-mono text-sm text-paper-faint transition-colors duration-300 group-hover:text-amber">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="flex items-center gap-3 text-display-md font-bold text-paper">
                        <Icon name={s.icon} size={22} className="shrink-0 text-amber" />
                        {t(`home.skills.${s.key}.title`)}
                      </h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-paper-dim">
                        {t(`home.skills.${s.key}.body`)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">
                        {(t(`home.skills.${s.key}.tags`, { returnObjects: true }) as string[]).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ SELECTED WORK ============ */}
      <section id="work" className="section-y relative bg-ink-raised">
        <div className="container-x">
          <SectionHeading
            index="02"
            eyebrow={t("home.workLabel")}
            title={
              <>
                {t("home.workTitle")}
              </>
            }
            description={t("home.workBody")}
            action={
              <Link to="/projects" className="link-line font-mono text-[11px] uppercase tracking-[0.18em]">
                {t("common.viewAll")}
                <Icon name="arrow-up-right" size={14} />
              </Link>
            }
          />

          {projectsLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="border-b border-ink-line">
              {featured.map((p, i) => (
                <Reveal key={p._id} delay={i * 80}>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="group relative block border-t border-ink-line py-7 transition-colors duration-300 hover:bg-ink-card sm:py-9"
                  >
                    <div className="grid grid-cols-[3rem_1fr] items-start gap-4 px-1 sm:grid-cols-[5rem_1fr] sm:gap-8 lg:grid-cols-[6rem_1fr_auto]">
                      <span className="pt-2 font-mono text-xs text-paper-faint transition-colors duration-300 group-hover:text-amber">
                        0{i + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-display-md font-bold text-paper transition-colors duration-300 group-hover:text-amber">
                          {p.title}
                        </h3>
                        <p className="mt-2 line-clamp-1 max-w-xl text-sm text-paper-dim">
                          {typeof p.description === "string" ? p.description : p.description[lang]}
                        </p>
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">
                          {p.technologies.slice(0, 4).join(" · ")}
                        </p>
                        {/* inline cover on small screens */}
                        <div className="crop mt-5 overflow-hidden rounded-lg lg:hidden">
                          {p.image ? (
                            <img src={p.image} alt="" className="aspect-[8/5] w-full object-cover" loading="lazy" />
                          ) : (
                            <ProjectCover slug={p.slug} title={p.title} className="aspect-[8/5] w-full" />
                          )}
                        </div>
                      </div>
                      <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-line text-paper-faint transition-all duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-ink lg:flex">
                        <Icon name="arrow-up-right" size={18} />
                      </span>
                    </div>
                    {/* hover preview (desktop) */}
                    <div
                      aria-hidden="true"
                      className="crop pointer-events-none absolute right-24 top-1/2 hidden w-64 -translate-y-1/2 scale-90 rotate-2 opacity-0 transition-all duration-500 ease-smooth group-hover:scale-100 group-hover:opacity-100 lg:block"
                    >
                      {p.image ? (
                        <img src={p.image} alt="" className="aspect-[8/5] w-full rounded-lg object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]" loading="lazy" />
                      ) : (
                        <ProjectCover slug={p.slug} title={p.title} className="aspect-[8/5] w-full rounded-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]" />
                      )}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA BAND (inverted paper) ============ */}
      <section className="paper-block relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "radial-gradient(rgba(23,20,18,0.14) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        <div className="container-x relative grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="eyebrow mb-5 !text-amber-deep before:!bg-amber-deep/60">{t("home.ctaBand.eyebrow")}</div>
            <h2 className="text-display-lg font-extrabold text-cream-ink">
              {t("home.ctaBand.title")}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream-dim">{t("home.ctaBand.body")}</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link to="/contact" className="btn-dark">
              {t("home.ctaBand.button")}
              <Icon name="send" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
