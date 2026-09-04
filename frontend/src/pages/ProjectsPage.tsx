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

  const { data: apiProjects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getAll(),
  });

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
    if (!q) return source;
    return source.filter((p) => {
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
  }, [source, query, i18n.language]);

  return (
    <>
      <div className="container-x pt-32 pb-12">
        <h1 className="text-display-lg font-display text-paper">
          {t("projects.title")}
        </h1>
        <p className="text-lead text-paper-dim max-w-2xl mt-3">
          {t("projects.subtitle")}
        </p>

        <div className="relative max-w-sm mt-8">
          <Icon
            name="search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-paper-faint pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("projects.searchPlaceholder")}
            className="field pl-10 w-full"
          />
        </div>
      </div>

      <section className="container-x section-y pt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-paper-dim py-20">
            {t("projects.empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
