import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projectService } from "../../services/projectService";
import { messageService } from "../../services/messageService";
import { PageLoader } from "../../components/common/PageLoader";
import { useAuth } from "../../hooks/useAuth";

export const DashboardPage = () => {
  const { user } = useAuth();
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => projectService.getAll(),
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: () => messageService.getAll(),
  });

  if (projectsLoading || messagesLoading) return <PageLoader />;

  const stats = [
    {
      label: "Total Projects",
      value: projects?.length || 0,
      icon: "📁",
      color: "bg-blue-500",
      link: "/admin/projects",
    },
    {
      label: "Unread Messages",
      value: messages?.filter((m) => !m.isRead).length || 0,
      icon: "✉️",
      color: "bg-purple-500",
      link: "/admin/messages",
    },
    {
      label: "Total Messages",
      value: messages?.length || 0,
      icon: "📥",
      color: "bg-indigo-500",
      link: "/admin/messages",
    },
  ];

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back, {user?.username}!
        </h1>
        <p className="text-gray-500">Here's what's happening with your portfolio.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={stat.link}
              className="group block bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
            >
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-2xl shadow-lg ring-4 ring-gray-50`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black text-gray-900 leading-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/projects"
            className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 text-gray-700 font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            <span className="text-xl">➕</span> Add New Project
          </Link>
          <Link
            to="/admin/profile"
            className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 text-gray-700 font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            <span className="text-xl">⚙️</span> Update Profile
          </Link>
          <Link
            to="/admin/messages"
            className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 text-gray-700 font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            <span className="text-xl">👁️</span> Review Messages
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 text-gray-700 font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            <span className="text-xl">🌐</span> View Live Site
          </Link>
        </div>
      </motion.section>
    </div>
  );
};
