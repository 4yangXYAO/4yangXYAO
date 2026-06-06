import type { Request, Response } from "express";
import { Project } from "../models/Project";
import fs from "fs";
import path from "path";

export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { featured } = req.query;
  const filter = featured === "true" ? { featured: true } : {};

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: projects });
};

export const getProjectBySlug = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    res.status(404).json({ success: false, message: "Project not found" });
    return;
  }

  res.json({ success: true, data: project });
};

export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    title,
    description,
    technologies,
    demoLink,
    githubLink,
    featured,
    order,
  } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

  if (!title || !description) {
    res
      .status(400)
      .json({ success: false, message: "Title dan description wajib diisi" });
    return;
  }

  const project = await Project.create({
    title,
    description,
    technologies: technologies ? JSON.parse(technologies) : [],
    demoLink: demoLink || "",
    githubLink: githubLink || "",
    featured: featured === "true",
    order: Number(order) || 0,
    imageUrl,
  });

  res.status(201).json({ success: true, data: project });
};

export const updateProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    title,
    description,
    technologies,
    demoLink,
    githubLink,
    featured,
    order,
  } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404).json({ success: false, message: "Project not found" });
    return;
  }

  if (req.file) {
    const oldPath = project.imageUrl
      ? path.resolve(process.cwd(), `public${project.imageUrl}`)
      : null;

    if (oldPath && fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    project.imageUrl = `/uploads/${req.file.filename}`;
  }

  project.title = title || project.title;
  project.description = description || project.description;
  project.technologies = technologies
    ? JSON.parse(technologies)
    : project.technologies;
  project.demoLink = demoLink !== undefined ? demoLink : project.demoLink;
  project.githubLink =
    githubLink !== undefined ? githubLink : project.githubLink;
  project.featured =
    featured !== undefined ? featured === "true" : project.featured;
  project.order = order !== undefined ? Number(order) : project.order;

  await project.save();
  res.json({ success: true, data: project });
};

export const deleteProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    res.status(404).json({ success: false, message: "Project not found" });
    return;
  }

  if (project.imageUrl) {
    const filePath = path.resolve(process.cwd(), `public${project.imageUrl}`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  res.json({ success: true, message: "Project deleted" });
};
