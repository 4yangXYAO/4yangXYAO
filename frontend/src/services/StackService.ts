import api from "./api";
import type { Stack,CreateStackInput } from "../types/stack";
  
export const StackService = {
  getAll: async (featured?: boolean) => {
    const { data } = await api.get<{ success: boolean; data: Stack[] }>( 
        "/stacks",
        {
          params: featured ? { featured: true } : undefined,
        },
      );
    return data.data;
  },
  
  getBySlug: async (slug: string) => {
    const { data } = await api.get<{ success: boolean; data: Stack }>(
      `/stacks/${slug}`,
    );
    return data.data;
  },

  create: async (input: CreateStackInput) => {
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("technologies", JSON.stringify(input.technologies));
    formData.append("demoLink", input.demoLink || "");
    formData.append("githubLink", input.githubLink || "");
    formData.append("featured", input.featured ? "true" : "false");
    formData.append("order", String(input.order || 0));
    if (input.image) formData.append("image", input.image);

    const { data } = await api.post<{ success: boolean; data: Stack }>(
      "/stacks",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data.data;
  },

  update:async (id: string, input: Partial<CreateStackInput>) => {
    const formData = new FormData();
    if (input.title) formData.append("title", input.title);
    if (input.description) formData.append("description", input.description);
    if (input.technologies)

      formData.append("technologies", JSON.stringify(input.technologies));
    if (input.demoLink !== undefined)
        formData.append("demolink", input.demoLink);
    if (input.githubLink !== undefined)
        formData.append("githubLink", input.githubLink);
    if (input.featured !== undefined)
        formData.append("featured", input.featured ? "true" : "false");
    if (input.order !== undefined)
        formData.append("order", String(input.order));
    if (input.image) formData.append("image", input.image);

    const { data } = await api.put<{ success: boolean; data: Stack  }>(
      `/stacks/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data.data;
  },

  delete: async (id: string) => {
    await api.delete(`/stacks/${id}`);
  },
    
};
