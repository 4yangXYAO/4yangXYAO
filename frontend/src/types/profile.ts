export interface Profile {
  _id?: string;
  name: string;
  bio: string;
  tagline: string;
  avatar?: string;
  email: string;
  location: string;
  skills: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
    website?: string;
    cv?: string;
  };
}

export interface UpdateProfileInput {
  name?: string;
  bio?: string;
  tagline?: string;
  email?: string;
  location?: string;
  skills?: string[];
  socialLinks?: Profile["socialLinks"];
  avatar?: File;
}
