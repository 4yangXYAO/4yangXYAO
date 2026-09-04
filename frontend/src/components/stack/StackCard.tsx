import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Stack } from "../../types/stack";
import { Icon } from "../common/Icon";

const iconFor = (title: string): string => {
  const s = title.toLowerCase();
  if (s.includes("os") || s.includes("system")) return "layers";
  if (s.includes("data") || s.includes("base")) return "database";
  if (s.includes("server") || s.includes("api") || s.includes("engine"))
    return "server";
  if (s.includes("net") || s.includes("wifi") || s.includes("blast")) return "wifi";
  if (s.includes("monitor") || s.includes("dashboard")) return "monitor";
  if (s.includes("cpu") || s.includes("chip")) return "cpu";
  if (s.includes("cloud")) return "cloud";
  if (s.includes("shield") || s.includes("security")) return "shield";
  if (s.includes("code") || s.includes("web") || s.includes("app")) return "code";
  if (s.includes("terminal") || s.includes("cli")) return "terminal";
  return "zap";
};

interface StackCardProps {
  stack: Stack;
}

export const StackCard: React.FC<StackCardProps> = ({ stack }) => {
  const { t } = useTranslation();

  return (
    <Link to={`/stacks/${stack.slug}`} className="group block">
      <div className="card card-hover p-6">
        <div className="flex items-start justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-amber-soft text-amber">
            <Icon name={iconFor(stack.title)} size={20} />
          </div>
          <Icon
            name="arrow-up-right"
            size={18}
            className="text-paper-faint transition-colors group-hover:text-amber"
          />
        </div>

        <h3 className="mt-4 font-display text-lg text-paper">{stack.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-paper-dim">
          {stack.description}
        </p>

        <div className="mt-4 font-mono text-[11px] text-paper-faint">
          {stack.technologies.length} {t("common.technologies")}
        </div>
      </div>
    </Link>
  );
};
