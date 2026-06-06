import { useQuery } from "@tanstack/react-query";
import { projectService } from "../services/projectService";
import type { Project } from "../types/project";

export const useProjects = (featured?: boolean) => {
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<Project[]>({
    queryKey: ["projects", { featured }],
    queryFn: () => projectService.getAll(featured),
  });

  return { projects, isLoading, error };
};
