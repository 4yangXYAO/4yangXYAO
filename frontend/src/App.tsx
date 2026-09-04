import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { RouteFallback } from "./components/common/PageLoader";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
const AdminLayout = lazy(() => import("./components/admin/AdminLayout").then((m) => ({ default: m.AdminLayout })));

// public pages — home eager, rest split per-route
import { HomePage } from "./pages/HomePage";
const ProjectsPage = lazy(() => import("./pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage })));
const StackPage = lazy(() => import("./pages/StackPage").then((m) => ({ default: m.StackPage })));
const StackDetailPage = lazy(() => import("./pages/StackDetailPage").then((m) => ({ default: m.StackDetailPage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));

// admin panel — never needed for a first-time visitor, fully split off
const LoginPage = lazy(() => import("./pages/admin/LoginPage").then((m) => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage").then((m) => ({ default: m.DashboardPage })));
const ManageProjectsPage = lazy(() => import("./pages/admin/ManageProjectsPage").then((m) => ({ default: m.ManageProjectsPage })));
const ManageStack = lazy(() => import("./pages/admin/ManageStack").then((m) => ({ default: m.ManageStack })));
const EditProfilePage = lazy(() => import("./pages/admin/EditProfilePage").then((m) => ({ default: m.EditProfilePage })));
const ManageMessagesPage = lazy(() => import("./pages/admin/ManageMessagesPage").then((m) => ({ default: m.ManageMessagesPage })));

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
        <Suspense fallback={<RouteFallback />}>
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

            {/* Public Routes - Wrapped in Navbar + Footer. `/*` so the nested
                Routes below also match /projects, /about, etc. */}
            <Route
              path="/*"
              element={
                <div className="grain flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route index element={<HomePage />} />
                      <Route path="projects" element={<ProjectsPage />} />
                      <Route path="projects/:slug" element={<ProjectDetailPage />} />
                      <Route path="stacks" element={<StackPage />} />
                      <Route path="stacks/:id" element={<StackDetailPage />} />
                      <Route path="about" element={<AboutPage />} />
                      <Route path="contact" element={<ContactPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Suspense>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#181513",
              color: "#ede9e3",
              border: "1px solid #2a2622",
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
