import api from "./api";
import type { Profile, UpdateProfileInput } from "../types/profile";

export const profileService = {
  get: async () => {
    const { data } = await api.get<{ success: boolean; data: Profile | null }>(
      "/profile",
    );
    return data.data;
  },

  update: async (input: UpdateProfileInput) => {
    const formData = new FormData();
    if (input.name) formData.append("name", input.name);
    if (input.bio) formData.append("bio", input.bio);
    if (input.tagline) formData.append("tagline", input.tagline);
    if (input.email) formData.append("email", input.email);
    if (input.location) formData.append("location", input.location);
    if (input.skills) formData.append("skills", JSON.stringify(input.skills));
    if (input.socialLinks)
      formData.append("socialLinks", JSON.stringify(input.socialLinks));
    if (input.avatar) formData.append("avatar", input.avatar);

    const { data } = await api.put<{ success: boolean; data: Profile }>(
      "/profile",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data.data;
  },
};
