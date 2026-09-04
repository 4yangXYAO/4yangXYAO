import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { projectService } from "../services/projectService";
import { PageLoader } from "../components/common/PageLoader";
import { Icon } from "../components/common/Icon";
import { ProjectCover } from "../components/common/ProjectCover";
import { getImageUrl } from "../utils/constants";
import { FALLBACK_PROJECTS, type LocalizedText } from "../data/projects";

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

type RelatedProject = {
  _id: string;
  title: string;
  slug: string;
  description: string | LocalizedText;
  technologies: string[] | string;
};

export const ProjectDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const lang: "en" | "id" | "zh" = i18n.language.startsWith("zh")
    ? "zh"
    : i18n.language.startsWith("id")
      ? "id"
      : "en";

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
      : detail.description[lang] ?? detail.description.en;

  const imageUrl = detail.imageUrl ? getImageUrl(detail.imageUrl) : null;

  const relatedSource: RelatedProject[] = apiProjects?.length
    ? apiProjects.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      technologies: p.technologies,
    }))
    : FALLBACK_PROJECTS.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      technologies: p.technologies,
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
        {t("projects.backToAll")}
      </Link>

      {/* ============ HERO ============ */}
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="eyebrow mb-5">{t("projects.title")}</div>
          <h1 className="text-display-xl font-display font-extrabold text-paper">
            {detail.title}
          </h1>
          <p className="mt-6 font-serif text-display-md italic leading-snug text-paper-dim">
            {description}
          </p>
        </div>

        {/* meta rail */}
        <div className="lg:col-span-5">
          <div className="well p-6">
            <span className="eyebrow">{t("projects.techStack")}</span>
            <ul className="mt-4">
              {detail.technologies.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center justify-between gap-4 border-t border-ink-line py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-faint"
                >
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
            {(detail.demoLink || detail.githubLink) && (
              <div className="mt-6 flex flex-col gap-3 border-t border-ink-line pt-5">
                {detail.demoLink && (
                  <a
                    href={detail.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]"
                  >
                    {t("projects.visit")}
                    <Icon name="external" size={14} />
                  </a>
                )}
                {detail.githubLink && (
                  <a
                    href={detail.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]"
                  >
                    {t("projects.source")}
                    <Icon name="github" size={14} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============ COVER ============ */}
      <div className="crop mt-10">
        <div className="overflow-hidden rounded-lg border border-ink-line bg-ink-card">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={detail.title}
              className="aspect-[21/9] w-full object-cover"
            />
          ) : (
            <ProjectCover
              slug={detail.slug}
              title={detail.title}
              className="aspect-[21/9] w-full"
            />
          )}
        </div>
      </div>

      {/* ============ OVERVIEW ============ */}
      <div className="prose mt-16 max-w-2xl">
        <h2 className="eyebrow mb-5">{t("projects.overview")}</h2>
        <p className="leading-relaxed text-paper-dim">{description}</p>
      </div>

      {/* ============ MORE PROJECTS (editorial rows) ============ */}
      {related.length > 0 && (
        <div className="mt-16">
          <div className="eyebrow mb-6">{t("projects.moreProjects")}</div>
          <div className="border-b border-ink-line">
            {related.map((p, i) => (
              <Link
                key={p._id}
                to={`/projects/${p.slug}`}
                className="group relative block border-t border-ink-line py-7 transition-colors duration-300 hover:bg-ink-card sm:py-9"
              >
                <div className="grid grid-cols-[3rem_1fr] items-start gap-4 px-1 sm:grid-cols-[5rem_1fr_auto]">
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
                      {Array.isArray(p.technologies)
                        ? p.technologies.slice(0, 4).join(" · ")
                        : p.technologies}
                    </p>
                  </div>
                  <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-line text-paper-faint transition-all duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-ink lg:flex">
                    <Icon name="arrow-up-right" size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
