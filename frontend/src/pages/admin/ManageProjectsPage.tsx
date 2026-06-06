import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { projectService } from "../../services/projectService";
import { PageLoader } from "../../components/common/PageLoader";
import { ProjectForm } from "../../components/projects/ProjectForm";
import { Button } from "../../components/common/Button";
import type { CreateProjectInput } from "../../types/project";
import { getImageUrl } from "../../utils/constants";

export const ManageProjectsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["projects-admin"],
    queryFn: () => projectService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateProjectInput) => projectService.create(data),
    onSuccess: () => {
      toast.success("Project created successfully!");
      setIsFormOpen(false);
      refetch();
    },
    onError: () => toast.error("Failed to create project"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectService.delete(id),
    onSuccess: () => {
      toast.success("Project deleted");
      refetch();
    },
    onError: () => toast.error("Failed to delete project"),
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500">Manage your work and show off your skills.</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          variant={isFormOpen ? "secondary" : "primary"}
          size="lg"
        >
          {isFormOpen ? "Cancel" : "Add Project"}
        </Button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-100 mb-8">
              <h2 className="text-xl font-bold mb-6">Create New Project</h2>
              <ProjectForm
                onSubmit={async (data) => createMutation.mutate(data)}
                isLoading={createMutation.isPending}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
          >
            <div className="relative h-40 mb-4 rounded-2xl overflow-hidden bg-gray-50">
              {project.imageUrl ? (
                <img
                  src={getImageUrl(project.imageUrl)}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl bg-indigo-50">
                  🚀
                </div>
              )}
              {project.featured && (
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-lg">
                  Featured
                </span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-1">
                {project.slug}
              </p>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-50">
              <Button
                onClick={() => navigate(`/admin/projects/${project._id}/edit`)}
                size="sm"
                variant="ghost"
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(project._id, project.title)}
                variant="danger"
                size="sm"
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <p className="text-5xl mb-4">📂</p>
          <h3 className="text-xl font-bold text-gray-900">No projects found</h3>
          <p className="text-gray-500">Start by adding your first masterpiece!</p>
        </div>
      )}
    </div>
  );
};
