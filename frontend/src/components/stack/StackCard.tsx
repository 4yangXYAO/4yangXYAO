import { Link } from "react-router-dom";
import type { Stack } from "../../types/stack";
import { Icon } from "../common/Icon";
import { ProjectCover } from "../common/ProjectCover";
import { getImageUrl } from "../../utils/constants";

interface StackCardProps {
  stack: Stack;
}

export const StackCard: React.FC<StackCardProps> = ({ stack }) => {
  return (
    <Link
      to={`/stacks/${stack.slug}`}
      className="card card-hover overflow-hidden group h-full flex flex-col"
    >
      <div className="aspect-[5/3] w-full overflow-hidden relative">
        {stack.imageUrl ? (
          <img
            src={getImageUrl(stack.imageUrl)}
            alt={stack.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
          />
        ) : (
          <ProjectCover
            slug={stack.slug}
            title={stack.title}
            className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-display text-paper transition-colors duration-300 group-hover:text-amber">
            {stack.title}
          </h3>
          <Icon
            name="arrow-up-right"
            size={18}
            className="mt-1 shrink-0 text-paper-faint transition-all duration-300 group-hover:text-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>

        <p className="mt-2 text-sm text-paper-dim line-clamp-3">
          {stack.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-paper-faint">
          {stack.technologies.map((tech) => (
            <span key={tech}>{tech.trim()}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};
