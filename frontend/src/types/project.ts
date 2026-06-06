export interface Project {
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
}

export interface CreateProjectInput {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  featured?: boolean;
  order?: number;
  image?: File;
}
