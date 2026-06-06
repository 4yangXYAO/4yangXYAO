import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PageLoader } from "../common/PageLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;
  if (!user) return <Navigate to="/admin/login" />;

  return <>{children}</>;
};
