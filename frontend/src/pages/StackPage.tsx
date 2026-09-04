import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Stack } from "../types/stack";
import { StackService } from "../services/StackService";
import { StackCard } from "../components/stack/StackCard";
import { Reveal } from "../components/common/Reveal";
import { Icon } from "../components/common/Icon";
import { SectionHeading } from "../components/common/SectionHeading";
import { ProjectCover } from "../components/common/ProjectCover";
import { STACK_CATEGORIES } from "../data/stacks";

export const StackPage = () => {
  const { t } = useTranslation();
  const { data: apiStack } = useQuery({
    queryKey: ["stack"],
    queryFn: () => StackService.getAll(),
  });

  // Fallback data (tool names + descriptions intentionally Indonesian, kept verbatim with typos).
  const defaultStack: Stack[] = [
    {
      _id: "S01",
      title: "NA_OS",
      description:
        "Sebuah sistem operasi eksperimental yang saya kembangkan untuk memahami konseep OS sederhana, Di dalam Website, dengan beberapa fitur sederhana",
      technologies: [
        "Node.js",
        "SolidJS",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Fastify",
        "Socket.IO",
        "Lucide Solid",
        "Zod",
        "dan Vitest",
      ],
      slug: "Website-OS",
      featured: true,
      order: 1,
      imageUrl: "/media/stack/na_os_.webp",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "S02",
      title: "Blast_engine",
      description: "Sistem Kampanye Di berbagai Platform",
      technologies: [" Node.js", "TypeScript"],
      slug: "Website-OS",
      featured: true,
      order: 2,
      // broken /media/stack/blast_engine.png does not exist — let ProjectCover render instead
      imageUrl: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return (
    <main className="container-x min-h-screen section-y">
      {/* ===== Header ===== */}
      <header className="mb-20 max-w-3xl">
        <div className="eyebrow mb-6">{t("stack.label")}</div>
        <h1 className="text-display-xl font-extrabold text-paper">
          {t("stack.title")}
        </h1>
        <p className="mt-6 max-w-xl text-lead text-paper-dim">
          {t("stack.subtitle")}
        </p>
      </header>

      {/* ===== Experiments ===== */}
      <section className="mb-24">
        <SectionHeading
          index="01"
          eyebrow={t("stack.experimentsLabel")}
          title={t("stack.experimentsTitle")}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {defaultStack.map((s) => (
            <Link
              key={s._id}
              to={`/stacks/${s.slug}`}
              className="card card-hover group block overflow-hidden"
            >
              <div className="aspect-[16/10] overflow-hidden">
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.04]"
                  />
                ) : (
                  <ProjectCover
                    slug={s.slug}
                    title={s.title}
                    className="h-full w-full"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-paper transition-colors duration-300 group-hover:text-amber">
                  {s.title}
                </h3>
                <p className="mt-2 text-paper-dim">{s.description}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">
                  {s.technologies.map((tech) => tech.trim()).join(" · ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== API items (when the DB returns) ===== */}
      {apiStack?.length ? (
        <section className="mb-24">
          <h2 className="eyebrow mb-8">{t("stack.items")}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apiStack.map((s) => (
              <StackCard key={s._id} stack={s} />
            ))}
          </div>
        </section>
      ) : null}

      {/* ===== Categories / depth ===== */}
      <section>
        <SectionHeading
          index="02"
          eyebrow={t("stack.depth")}
          title={t("stack.depth")}
        />

        <div className="grid gap-12 lg:grid-cols-3">
          {STACK_CATEGORIES.map((group) => (
            <Reveal key={group.key}>
              <div className="mb-5 flex items-center gap-3">
                <Icon
                  name={group.icon}
                  size={20}
                  className="shrink-0 text-amber"
                />
                <h3 className="font-display text-xl font-bold text-paper">
                  {t(`stack.categories.${group.key}`)}
                </h3>
                <span className="ml-auto font-mono text-[11px] text-paper-faint tabular-nums">
                  {group.tools.length}
                </span>
              </div>

              <div>
                {group.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="border-t border-ink-line py-3 last:border-b"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0">
                        <span className="text-paper">{tool.name}</span>
                        {tool.note && (
                          <p className="mt-0.5 font-mono text-[10px] text-paper-faint">
                            {tool.note}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 font-mono text-xs tabular-nums text-paper-dim">
                        {tool.level}
                      </span>
                    </div>
                    <div className="meter mt-2">
                      <span
                        className="meter-fill"
                        style={{ ["--w" as never]: `${tool.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
};
