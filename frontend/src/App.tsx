import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";

import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/admin/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { ManageProjectsPage } from "./pages/admin/ManageProjectsPage";
import { ManageStack } from "./pages/admin/ManageStack";
import { EditProfilePage } from "./pages/admin/EditProfilePage";
import { ManageMessagesPage } from "./pages/admin/ManageMessagesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Admin Login - No Layout */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Admin Routes - Wrapped in ProtectedRoute and AdminLayout */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="projects" element={<ManageProjectsPage />} />
                    <Route path="stack" element={<ManageStack />} />
                    <Route path="profile" element={<EditProfilePage />} />
                    <Route path="messages" element={<ManageMessagesPage />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Public Routes - Wrapped in Navbar + Footer */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen relative">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route
                      path="/projects/:slug"
                      element={<ProjectDetailPage />}
                    />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route
                      path="*"
                      element={
                        <div className="section-spacing text-center">
                          <h1 className="text-4xl font-bold mb-4">404</h1>
                          <p className="text-gray-500 mb-8">Page Not Found</p>
                          <Navigate to="/" replace />
                        </div>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "12px",
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
