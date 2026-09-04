import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { projectService } from "../services/projectService";
import { ProjectCard, type CardProject } from "../components/projects/ProjectCard";
import { SkeletonCard } from "../components/common/PageLoader";
import { Icon } from "../components/common/Icon";
import { FALLBACK_PROJECTS } from "../data/projects";

export const ProjectsPage = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const { data: apiProjects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getAll(),
  });

  // Kept exactly: API wins; static fallback keeps the index working while the DB is down.
  const source: CardProject[] = useMemo(() => {
    if (apiProjects?.length) {
      return apiProjects.map((p) => ({
        _id: p._id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        technologies: p.technologies,
        imageUrl: p.imageUrl,
        featured: p.featured,
      }));
    }
    return FALLBACK_PROJECTS.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      technologies: p.technologies,
      featured: p.featured,
    }));
  }, [apiProjects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return source.filter((p) => {
      if (featuredOnly && !p.featured) return false;
      if (!q) return true;
      const desc =
        typeof p.description === "string"
          ? p.description
          : p.description[i18n.language as "en" | "id" | "zh"] ??
            p.description.en;
      const techs = Array.isArray(p.technologies)
        ? p.technologies.join(" ").toLowerCase()
        : p.technologies.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        techs.includes(q) ||
        desc.toLowerCase().includes(q)
      );
    });
  }, [source, query, featuredOnly, i18n.language]);

  // The first featured project in the list takes the bento span (not a uniform row).
  let bentoMarked = false;
  const isBento = (featured?: boolean) => {
    if (featured && !bentoMarked) {
      bentoMarked = true;
      return true;
    }
    return false;
  };

  const clearSearch = () => {
    setQuery("");
    setFeaturedOnly(false);
  };

  return (
    <>
      <div className="container-x pt-32 pb-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-4">{t("projects.title")}</div>
            <h1 className="text-display-xl font-display font-extrabold text-paper">
              {t("projects.title")}
            </h1>
            <p className="text-lead text-paper-dim mt-3 max-w-2xl">
              {t("projects.subtitle")}
            </p>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint sm:block">
            {t("projects.count", { count: filtered.length })}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Icon
              name="search"
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-paper-faint"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("projects.searchPlaceholder")}
              className="field w-full pl-10"
            />
          </div>
          <button
            type="button"
            onClick={() => setFeaturedOnly((v) => !v)}
            className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
              featuredOnly
                ? "border-amber bg-amber text-ink"
                : "border-ink-line text-paper-faint hover:border-ink-bright hover:text-paper"
            }`}
          >
            {t("projects.filterFeatured")}
          </button>
        </div>
      </div>

      <section className="container-x section-y pt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint">
              {t("projects.empty")}
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="link-line mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              {t("projects.allProjects")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <div
                key={project._id}
                className={isBento(project.featured) ? "lg:col-span-2" : undefined}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};
