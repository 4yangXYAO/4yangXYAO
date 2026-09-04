import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { projectService } from "../services/projectService";
import { PageLoader } from "../components/common/PageLoader";
import { ProjectCard, type CardProject } from "../components/projects/ProjectCard";
import { Icon } from "../components/common/Icon";
import { ProjectCover } from "../components/common/ProjectCover";
import { getImageUrl } from "../utils/constants";
import { FALLBACK_PROJECTS, type LocalizedText } from "../data/projects";

// Normalized shape covering both API projects and static fallbacks.
type DetailProject = {
  _id: string;
  title: string;
  slug: string;
  description: string | LocalizedText;
  technologies: string[];
  imageUrl?: string;
  demoLink?: string;
  githubLink?: string;
  featured?: boolean;
};

export const ProjectDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => projectService.getBySlug(slug!),
    enabled: !!slug,
  });

  const { data: apiProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getAll(),
  });

  if (isLoading) return <PageLoader />;

  // API wins; static fallback keeps detail pages working while the DB is down.
  const fallbackProject = FALLBACK_PROJECTS.find((p) => p.slug === slug);
  const detail: DetailProject | undefined = project
    ? {
      _id: project._id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      technologies: project.technologies,
      imageUrl: project.imageUrl,
      demoLink: project.demoLink,
      githubLink: project.githubLink,
      featured: project.featured,
    }
    : fallbackProject
      ? {
        _id: fallbackProject._id,
        title: fallbackProject.title,
        slug: fallbackProject.slug,
        description: fallbackProject.description,
        technologies: fallbackProject.technologies,
        featured: fallbackProject.featured,
      }
      : undefined;

  if (!detail) {
    return (
      <div className="section-y container-x text-center">
        <p className="text-paper-dim">{t("common.notFound")}</p>
        <Link to="/projects" className="link-line mt-4 inline-block">
          {t("projects.allProjects")}
        </Link>
      </div>
    );
  }

  const description =
    typeof detail.description === "string"
      ? detail.description
      : detail.description[i18n.language as "en" | "id" | "zh"] ??
      detail.description.en;

  const imageUrl = detail.imageUrl ? getImageUrl(detail.imageUrl) : null;

  const relatedSource: CardProject[] = apiProjects?.length
    ? apiProjects.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      technologies: p.technologies,
      imageUrl: p.imageUrl,
      featured: p.featured,
    }))
    : FALLBACK_PROJECTS.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      technologies: p.technologies,
      featured: p.featured,
    }));

  const related = relatedSource
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="container-x pb-24">
      <Link
        to="/projects"
        className="link-line inline-flex items-center gap-2 pt-28"
      >
        <Icon name="arrow-left" size={16} />
        {t("projects.allProjects")}
      </Link>

      <div className="rounded-2xl overflow-hidden aspect-[21/9] max-h-[420px] mt-6">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={detail.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <ProjectCover
            seed={detail.slug}
            label={detail.title}
            className="h-full w-full"
          />
        )}
      </div>

      <div className="mt-8 flex items-center gap-3 flex-wrap">
        <h1 className="text-display-lg font-display text-paper">
          {detail.title}
        </h1>
        {detail.featured && (
          <span className="bg-ink/80 backdrop-blur border border-amber/30 text-amber font-mono text-[10px] uppercase tracking-wider rounded-full px-2.5 py-1">
            {t("projects.featuredBadge")}
          </span>
        )}
      </div>

      <p className="text-lead text-paper-dim max-w-3xl whitespace-pre-line mt-4">
        {description}
      </p>

      {detail.technologies.length > 0 && (
        <div className="mt-10">
          <h2 className="eyebrow">{t("projects.techStack")}</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {detail.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] text-paper-faint"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {(detail.demoLink || detail.githubLink) && (
        <div className="mt-10 flex flex-wrap gap-3">
          {detail.demoLink && (
            <a
              href={detail.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t("projects.visit")}
              <Icon name="external" size={16} />
            </a>
          )}
          {detail.githubLink && (
            <a
              href={detail.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2"
            >
              {t("projects.source")}
              <Icon name="github" size={16} />
            </a>
          )}
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="eyebrow mb-6">{t("projects.moreProjects")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
