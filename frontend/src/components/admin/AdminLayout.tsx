import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/projects", label: "Projects", icon: "📁" },
  { to: "/admin/profile", label: "Profile", icon: "👤" },
  { to: "/admin/messages", label: "Messages", icon: "✉️" },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white shadow-2xl">
        <div className="p-8">
          <Link to="/" className="text-2xl font-bold gradient-text">
            Admin Panel
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-2">
            {adminLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    location.pathname === link.to
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800 bg-gray-950/50">
          <div className="flex items-center gap-3 mb-6 px-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
              {user?.username?.[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.username}</p>
              <p className="text-xs text-gray-500 truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white py-3 rounded-xl font-semibold transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-gray-900 text-white z-50 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <span className="text-xl font-bold gradient-text">Admin</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-800"
                >
                  ✕
                </button>
              </div>
              <nav className="flex-1 p-6">
                <ul className="space-y-2">
                  {adminLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`flex items-center gap-3 px-4 py-4 rounded-2xl font-medium transition-all ${
                          location.pathname === link.to
                            ? "bg-indigo-600 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <span className="text-xl">{link.icon}</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-6 border-t border-gray-800">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 py-4 rounded-2xl font-bold uppercase tracking-wider text-sm shadow-lg shadow-red-600/20"
                >
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navbar (Mobile only) */}
        <header className="bg-white border-b border-gray-100 p-4 flex justify-between items-center lg:hidden sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-xl"
          >
            ☰
          </button>
          <span className="font-bold text-gray-900">Admin Panel</span>
          <div className="w-10" /> {/* Spacer */}
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};
