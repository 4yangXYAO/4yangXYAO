import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { StackService } from "../services/StackService";
import { PageLoader } from "../components/common/PageLoader";
import { ProjectCover } from "../components/common/ProjectCover";
import { Icon } from "../components/common/Icon";
import { getImageUrl } from "../utils/constants";

export const StackDetailPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const {
    data: stack,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stack", slug],
    queryFn: () => StackService.getBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <PageLoader />;

  if (error || !stack) {
    return (
      <main className="container-x min-h-screen section-y">
        <Link
          to="/stacks"
          className="link-line inline-flex items-center gap-2 text-sm text-paper-dim"
        >
          <Icon name="arrow-left" size={16} />
          {t("stack.label")}
        </Link>
        <h1 className="mt-8 text-display-md text-paper">
          {t("common.notFound")}
        </h1>
        <p className="mt-4 max-w-xl text-paper-dim">
          {t("common.notFoundBody")}
        </p>
      </main>
    );
  }

  return (
    <main className="container-x min-h-screen section-y">
      <Link
        to="/stacks"
        className="link-line inline-flex items-center gap-2 text-sm text-paper-dim"
      >
        <Icon name="arrow-left" size={16} />
        {t("stack.label")}
      </Link>

      <div className="mt-6 max-h-[420px] overflow-hidden rounded-2xl crop aspect-[21/9]">
        {stack.imageUrl ? (
          <img
            src={getImageUrl(stack.imageUrl)}
            alt={stack.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <ProjectCover
            slug={stack.slug}
            title={stack.title}
            className="h-full w-full"
          />
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-display-xl text-paper">{stack.title}</h1>
        {stack.featured && (
          <span className="rounded-full border border-amber/30 bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-amber backdrop-blur">
            {t("common.featured")}
          </span>
        )}
      </div>

      <p className="mt-4 max-w-3xl whitespace-pre-line text-lead text-paper-dim">
        {stack.description}
      </p>

      {stack.technologies.length > 0 && (
        <div className="mt-10">
          <h2 className="eyebrow">{t("common.technologies")}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {stack.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-ink-line bg-ink-line px-3 py-1 font-mono text-[11px] text-paper-faint"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {(stack.demoLink || stack.githubLink) && (
        <div className="mt-10 flex flex-wrap gap-3">
          {stack.demoLink && (
            <a
              href={stack.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2"
            >
              {t("stack.demo")}
              <Icon name="external" size={16} />
            </a>
          )}
          {stack.githubLink && (
            <a
              href={stack.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2"
            >
              {t("stack.source")}
              <Icon name="github" size={16} />
              <Icon name="external" size={16} />
            </a>
          )}
        </div>
      )}
    </main>
  );
};
