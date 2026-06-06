import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { profileService } from "../../services/profileService";
import { PageLoader } from "../../components/common/PageLoader";
import { Button } from "../../components/common/Button";
import { getImageUrl } from "../../utils/constants";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string(),
  tagline: z.string(),
  email: z.string().email("Invalid email address"),
  location: z.string(),
  skills: z.string(),
  socialLinks: z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const EditProfilePage = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const { data: _profile, isLoading } = useQuery({
    queryKey: ["profile-edit"],
    queryFn: () => profileService.get(),
  });

  useEffect(() => {
    if (_profile) {
      reset({
        name: _profile.name || "",
        bio: _profile.bio || "",
        tagline: _profile.tagline || "",
        email: _profile.email || "",
        location: _profile.location || "",
        skills: _profile.skills?.join(", ") || "",
        socialLinks: {
          github: _profile.socialLinks?.github || "",
          linkedin: _profile.socialLinks?.linkedin || "",
          twitter: _profile.socialLinks?.twitter || "",
          website: _profile.socialLinks?.website || "",
        },
      });
      if (_profile.avatar) {
        setAvatarPreview(getImageUrl(_profile.avatar));
      }
    }
  }, [_profile, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const avatarInput = document.querySelector(
        'input[name="avatar"]',
      ) as HTMLInputElement | null;
      const file = avatarInput?.files?.[0];

      return profileService.update({
        ...data,
        skills: data.skills.split(",").map((s) => s.trim()).filter(Boolean),
        avatar: file,
      });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
        <p className="text-gray-500">Update your personal information and social links.</p>
      </motion.div>

      <form
        onSubmit={handleSubmit((data) => updateMutation.mutate(data))}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Avatar Section */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center sticky top-10">
              <div className="relative group mb-6">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      👤
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                  <span className="text-sm font-bold">Change Avatar</span>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Click to upload new avatar. Max size 2MB.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-8 space-y-8">
            {/* Basic Info */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Tagline</label>
                <input
                  {...register("tagline")}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Biography</label>
                <textarea
                  {...register("bio")}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Location</label>
                  <input
                    {...register("location")}
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-700">Skills (comma separated)</label>
                   <input
                     {...register("skills")}
                     type="text"
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                   />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">
                Social Links
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">GitHub URL</label>
                  <input
                    {...register("socialLinks.github")}
                    type="text"
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">LinkedIn URL</label>
                  <input
                    {...register("socialLinks.linkedin")}
                    type="text"
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Twitter URL</label>
                  <input
                    {...register("socialLinks.twitter")}
                    type="text"
                    placeholder="https://twitter.com/..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Website URL</label>
                  <input
                    {...register("socialLinks.website")}
                    type="text"
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
               <Button
                 type="submit"
                 size="lg"
                 className="px-10"
                 disabled={updateMutation.isPending}
               >
                 {updateMutation.isPending ? "Saving..." : "Save Changes"}
               </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
