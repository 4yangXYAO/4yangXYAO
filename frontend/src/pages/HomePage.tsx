import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projectService } from "../services/projectService";
import { profileService } from "../services/profileService";
import { ProjectCard } from "../components/projects/ProjectCard";
import { SkeletonCard } from "../components/common/PageLoader";
import { Reveal } from "../components/common/Reveal";
import { Icon } from "../components/common/Icon";
import { SectionHeading } from "../components/common/SectionHeading";
import { FALLBACK_PROJECTS } from "../data/projects";

// Contract-shaped project consumed by ProjectCard (API + fallback).
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
  const { t } = useTranslation();

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

  return (
    <div>
      {/* HERO */}
      <section className="min-h-[92vh] flex items-center pt-28 pb-20">
        <div className="container-x">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            <div className="max-w-4xl">
              <Reveal delay={0}>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink-line px-3 py-1 font-mono text-[11px] text-paper-dim">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber animate-blink" />
                  {t("home.status")}
                </span>
              </Reveal>

              <Reveal delay={80}>
                <p className="mt-8 text-paper-dim">{t("home.greeting")}</p>
              </Reveal>

              <Reveal delay={160}>
                <h1 className="mt-2 font-display text-display-xl leading-none text-paper">
                  {renderName(displayName)}
                </h1>
              </Reveal>

              <Reveal delay={240}>
                <p className="mt-6 text-lead text-paper-dim max-w-xl">
                  {t("home.tagline")}
                </p>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link to="/projects" className="btn-primary group">
                    {t("home.ctaWork")}
                    <Icon
                      name="arrow-right"
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                  <Link to="/contact" className="btn-ghost">
                    {t("home.ctaContact")}
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:flex-1 lg:max-w-sm">
              <Reveal delay={320}>
                <blockquote className="border-l-2 border-amber/40 pl-6">
                  <Icon name="quote-open" size={28} className="text-amber/40" />
                  <p className="mt-4 font-display italic text-2xl text-paper">
                    {t("home.motto")}
                  </p>
                  <p className="mt-4 font-mono text-[11px] text-paper-faint">
                    {t("home.mottoBy")} · {displayName}
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div
        className="overflow-hidden border-y border-ink-line py-4"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {marqueeItems.map((item, i) => (
                <span key={`${dup}-${i}`} className="flex items-center">
                  <span className="px-4">{item}</span>
                  <Icon name="sparkles" size={12} className="text-amber" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow={t("home.skillsLabel")}
          title={t("home.skillsTitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.key} delay={i * 120}>
              <div className="card card-hover p-8 h-full">
                <Icon name={skill.icon} size={28} className="text-amber" />
                <h3 className="text-display-md mt-6 mb-3">
                  {t(`home.skills.${skill.key}.title`)}
                </h3>
                <p className="text-paper-dim">
                  {t(`home.skills.${skill.key}.body`)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(t(`home.skills.${skill.key}.tags`, {
                    returnObjects: true,
                  }) as unknown as string[]).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] text-paper-faint border border-ink-line rounded-full px-2.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section-y container-x">
        <SectionHeading
          eyebrow={t("home.workLabel")}
          title={t("home.workTitle")}
          description={t("home.workBody")}
          action={
            <Link
              to="/projects"
              className="link-line inline-flex items-center gap-1.5"
            >
              {t("common.viewAll")}
              <Icon name="arrow-right" size={16} />
            </Link>
          }
        />
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsLoading ? (
              [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            ) : (
              featured.map((p) => <ProjectCard key={p._id} project={p} />)
            )}
          </div>
        </Reveal>
      </section>

      {/* CTA STRIP */}
      <section className="section-y container-x">
        <Reveal>
          <div className="card p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-display-md text-paper">
                {t("contact.title")}
              </h2>
              <p className="text-paper-dim mt-3 max-w-xl">
                {t("contact.subtitle")}
              </p>
            </div>
            <Link to="/contact" className="btn-primary shrink-0">
              {t("home.ctaContact")}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
