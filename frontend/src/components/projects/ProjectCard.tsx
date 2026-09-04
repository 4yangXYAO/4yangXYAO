import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "../common/Icon";
import { ProjectCover } from "../common/ProjectCover";
import { getImageUrl } from "../../utils/constants";

export interface CardProject {
  _id: string;
  title: string;
  slug: string;
  description: string | { en: string; id: string; zh: string };
  technologies: string[] | string;
  image?: string;
  imageUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: CardProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t, i18n } = useTranslation();

  const description =
    typeof project.description === "string"
      ? project.description
      : project.description[i18n.language as "en" | "id" | "zh"] ??
        project.description.en;

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : project.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);

  const cover = project.image ?? project.imageUrl;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="card card-hover overflow-hidden group h-full flex flex-col"
    >
      <div className="aspect-[5/3] w-full overflow-hidden relative">
        {cover ? (
          <img
            src={getImageUrl(cover)}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <ProjectCover
            seed={project.slug}
            label={project.title}
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}

        {project.featured && (
          <span className="absolute top-3 left-3 bg-ink/80 backdrop-blur border border-amber/30 text-amber font-mono text-[10px] uppercase tracking-wider rounded-full px-2.5 py-1">
            {t("projects.featuredBadge")}
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-display text-paper">{project.title}</h3>
          <Icon
            name="arrow-up-right"
            size={18}
            className="text-paper-faint transition-all group-hover:text-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1"
          />
        </div>

        <p className="mt-2 text-sm text-paper-dim line-clamp-3">
          {description}
        </p>

        <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <span key={tech} className="font-mono text-[11px] text-paper-faint">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
