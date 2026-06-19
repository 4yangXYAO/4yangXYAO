export interface Stack {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  image?: File;
}

export interface CreateStackInput {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  featured: boolean;
  order: number;
  image?: File;
}
