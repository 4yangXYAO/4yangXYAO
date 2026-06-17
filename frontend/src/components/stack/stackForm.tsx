import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../common/Button";
import type { Stack, CreateStackInput } from "../../types/stack";

const stackSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z.string().min(1, "At least one technology is required"),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

type StackFormData = z.infer<typeof stackSchema>;

interface StackFormProps {
  interface?: Stack;
  initialData?: Stack;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export const StackForm: React.FC<StackFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StackFormData>({
    resolver: zodResolver(stackSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          technologies: initialData.technologies.join(", "),
          featured: initialData.featured,
          order: initialData.order,
        }
      : {
          featured: false,
          order: 0,
        },
  });

  const onSubmitHandler = handleSubmit((data) => {
    const payload = {
      ...data,
      technologies: data.technologies.split(",").map((s) => s.trim()),
    };
    onSubmit(payload);
  });

  return (
    <form onSubmit={onSubmitHandler} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
            Title
          </label>
          <input
            {...register("title")}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="e.g. React.js"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
            Order
          </label>
          <input
            type="number"
            {...register("order", { valueAsNumber: true })}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
          Technologies (Comma separated)
        </label>
        <input
          {...register("technologies")}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all"
          placeholder="React, TypeScript, Framer Motion"
        />
        {errors.technologies && (
          <p className="mt-1 text-xs text-red-500">
            {errors.technologies.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("featured")}
          id="featured"
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
          Featured Stack
        </label>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-2xl shadow-lg shadow-indigo-600/20"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : initialData ? (
          "Update Stack"
        ) : (
          "Add Stack"
        )}
      </Button>
    </form>
  );
};
