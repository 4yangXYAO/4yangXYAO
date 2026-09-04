import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  /** "01" style index, rendered as an oversized ghost numeral */
  index?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  action,
  index,
  className = "",
}) => (
  <Reveal className={`mb-12 md:mb-16 ${className}`}>
    <div className="relative">
      {index && (
        <span aria-hidden="true" className="section-num absolute -top-10 right-0 sm:-top-16">
          {index}
        </span>
      )}
      {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-display-lg text-paper">{title}</h2>
          {description && (
            <p className="mt-5 max-w-xl text-paper-dim leading-relaxed">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0 pb-1">{action}</div>}
      </div>
    </div>
  </Reveal>
);
