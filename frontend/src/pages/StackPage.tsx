import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { Stack } from "../types/stack";
import { StackService } from "../services/StackService";
import { StackCard } from "../components/stack/StackCard";
import { SkeletonCard } from "../components/common/PageLoader";

export const StackPage = () => {
  const { t } = useTranslation();
  const { data: apiStack, isLoading } = useQuery({
    queryKey: ["stack"],
    queryFn: () => StackService.getAll(),
  });

  // Fallback data (tool names, intentionally untranslated)
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
      imageUrl: "/media/stack/blast_engine.png",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const stack = apiStack?.length ? apiStack : defaultStack;

  return (
    <main className="container-x min-h-screen section-y">
      <header className="mb-16">
        <div className="eyebrow mb-4">{t("stack.label")}</div>
        <h1 className="text-display-lg text-paper">{t("stack.title")}</h1>
        <p className="mt-4 max-w-2xl text-lead text-paper-dim">
          {t("stack.subtitle")}
        </p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : stack.length === 0 ? (
        <p className="text-paper-dim">{t("stack.empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((s) => (
            <StackCard key={s._id} stack={s} />
          ))}
        </div>
      )}
    </main>
  );
};
