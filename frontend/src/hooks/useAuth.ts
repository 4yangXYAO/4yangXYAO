import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import type { User } from "../types/auth";

export const useAuth = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: () => authService.getMe(),
    retry: false,
    staleTime: Infinity,
  });

  const logout = async () => {
    await authService.logout();
  };

  return { user, isLoading, error, logout };
};
