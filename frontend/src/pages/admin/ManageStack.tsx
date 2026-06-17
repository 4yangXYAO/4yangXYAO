import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { StackService } from "../../services/StackService";
import { PageLoader } from "../../components/common/PageLoader";
import { StackForm } from "../../components/stack/StackForm";
import { Button } from "../../components/common/Button";
import type { CreateStackInput } from "../../types/stack";

export const ManageStack = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    data: stacks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stacks-admin"],
    queryFn: () => StackService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateStackInput) => StackService.create(data),
    onSuccess: () => {
      toast.success("Stack added successfully!");
      setIsFormOpen(false);
      refetch();
    },
    onError: () => toast.error("Failed to add stack"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => StackService.delete(id),
    onSuccess: () => {
      toast.success("Stack deleted");
      refetch();
    },
    onError: () => toast.error("Failed to delete stack"),
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Tech Stack</h1>
          <p className="text-gray-500">Add or update the technologies you use.</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          variant={isFormOpen ? "secondary" : "primary"}
          size="lg"
        >
          {isFormOpen ? "Cancel" : "Add Tech"}
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
              <h2 className="text-xl font-bold mb-6">Add New Technology</h2>
              <StackForm
                onSubmit={async (data) => createMutation.mutate(data)}
                isLoading={createMutation.isPending}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stacks.map((stack, i) => (
          <motion.div
            key={stack._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
          >
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                  {stack.title}
                </h3>
                {stack.featured && (
                  <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded">FEATURED</span>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {stack.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.technologies.map(tech => (
                  <span key={tech} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono uppercase">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex gap-2">
               <Button
                onClick={() => handleDelete(stack._id, stack.title)}
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
    </div>
  );
};
