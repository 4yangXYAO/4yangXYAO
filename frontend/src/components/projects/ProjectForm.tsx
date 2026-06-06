import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../common/Button";
import type { Project, CreateProjectInput } from "../../types/project";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z.string().min(1, "At least one technology is required"),
  demoLink: z.string().url("Invalid demo URL").or(z.literal("")).optional(),
  githubLink: z.string().url("Invalid GitHub URL").or(z.literal("")).optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          technologies: initialData.technologies.join(", "),
          demoLink: initialData.demoLink || "",
          githubLink: initialData.githubLink || "",
          featured: initialData.featured,
          order: initialData.order,
        }
      : {
          featured: false,
          order: 0,
        },
  });

  const onFormSubmit = async (data: ProjectFormData) => {
    const imageInput = document.querySelector(
      'input[name="image"]',
    ) as HTMLInputElement | null;
    const file = imageInput?.files?.[0];

    await onSubmit({
      ...data,
      technologies: data.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      image: file,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Project Title</label>
          <input
            {...register("title")}
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="E-commerce Platform"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Technologies (comma separated)
          </label>
          <input
            {...register("technologies")}
            type="text"
            placeholder="React, TypeScript, Tailwind"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.technologies && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.technologies.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
        <textarea
          {...register("description")}
          rows={5}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
          placeholder="Detailed project description..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1 font-medium">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Demo Link</label>
          <input
            {...register("demoLink")}
            type="text"
            placeholder="https://demo.example.com"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.demoLink && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.demoLink.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">GitHub Link</label>
          <input
            {...register("githubLink")}
            type="text"
            placeholder="https://github.com/your-username/repo"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {errors.githubLink && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.githubLink.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Project Image</label>
          <div className="relative group">
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-200 mb-0.5">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              {...register("featured")}
              type="checkbox"
              className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-sm font-bold text-gray-700 group-hover:text-indigo-600">
              Featured Project
            </span>
          </label>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-700">Order</label>
            <input
              {...register("order", { valueAsNumber: true })}
              type="number"
              className="w-16 px-2 py-1 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-center font-bold"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="px-12 py-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing
            </span>
          ) : initialData ? (
            "Update Project"
          ) : (
            "Create Project"
          )}
        </Button>
      </div>
    </form>
  );
};
