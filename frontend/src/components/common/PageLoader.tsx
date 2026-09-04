import { useTranslation } from "react-i18next";

interface PageLoaderProps {
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-ink-line border-t-amber" />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
        {message ?? t("common.loading")}
      </p>
    </div>
  );
};

/** Suspense fallback for lazy routes */
export const RouteFallback = () => <PageLoader />;

/* Skeleton components for loading states */
export const SkeletonCard: React.FC = () => (
  <div className="card overflow-hidden">
    <div className="aspect-[5/3] w-full animate-pulse bg-ink-soft" />
    <div className="space-y-3 p-5">
      <div className="h-5 w-3/4 animate-pulse rounded bg-ink-soft" />
      <div className="h-4 w-full animate-pulse rounded bg-ink-soft" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-ink-soft" />
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-16 animate-pulse rounded-full bg-ink-soft" />
        <div className="h-6 w-16 animate-pulse rounded-full bg-ink-soft" />
      </div>
    </div>
  </div>
);

export const SkeletonText: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 animate-pulse rounded bg-ink-soft ${i === lines - 1 ? "w-2/3" : "w-full"}`}
      />
    ))}
  </div>
);
