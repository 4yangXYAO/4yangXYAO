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
  const lang: "en" | "id" | "zh" = i18n.language.startsWith("zh")
    ? "zh"
    : i18n.language.startsWith("id")
      ? "id"
      : "en";

  const description =
    typeof project.description === "string"
      ? project.description
      : project.description[lang] ?? project.description.en;
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
      className="card card-hover overflow-hidden group flex h-full flex-col"
    >
      <div className="relative aspect-[8/5] overflow-hidden">
        {cover ? (
          <img
            src={getImageUrl(cover)}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]"
          />
        ) : (
          <ProjectCover
            slug={project.slug}
            title={project.title}
            className="h-full w-full transition-transform duration-500 ease-smooth group-hover:scale-[1.04]"
          />
        )}

        {project.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-ink-deep/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-amber">
            {t("projects.featuredBadge")}
          </span>
        )}

        <span className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full border border-ink-line bg-ink/60 text-paper-faint backdrop-blur transition-all duration-300 ease-smooth group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
          <Icon name="arrow-up-right" size={18} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-paper transition-colors duration-300 group-hover:text-amber">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-paper-dim">{description}</p>
        <p className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">
          {technologies.join(" · ")}
        </p>
      </div>
    </Link>
  );
};
