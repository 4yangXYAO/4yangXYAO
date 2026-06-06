import { Schema, model, type InferSchemaType } from "mongoose";

const profileSchema = new Schema(
  {
    name: { type: String, default: "" },
    bio: { type: String, default: "" },
    tagline: { type: String, default: "" },
    avatar: { type: String, default: "" },
    email: { type: String, default: "" },
    location: { type: String, default: "" },
    skills: [{ type: String }],
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      website: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

export type ProfileDocument = InferSchemaType<typeof profileSchema>;

export const Profile = model("Profile", profileSchema);
