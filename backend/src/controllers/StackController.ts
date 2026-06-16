import type { Request, Response } from "express";
import { Stack } from "../models/Stack";
import fs from "fs";
import path from "path";

export const getStacks = async (req: Request, res: Response): Promise<void> => {
  const { featured } = req.query;
  const filter = featured === "true" ? { featured: true } : {};

  const stacks = await Stack.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: stacks });
};

export const getStackBySlug = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const stack = await Stack.findOne({ slug: req.params.slug });

  if (!stack) {
    res.status(404).json({ success: false, message: "Stack not found" });
    return;
  }

  res.json({ success: true, data: stack });
};

export const createStack = async (
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
  const imageUrl = await Stack.findById(req.params.id);
    if (!title || !description) {
      res
      .status(400)
      .json({ success: false, message: "Title dan description wajib diisi" });
      return;
    }
    const stack = await Stack.create({
      title,
      description,
      technologies: technologies ? JSON.parse(technologies) : [],
      demoLink: demoLink || "",
      githubLink: githubLink || "",
      featured: featured === "true",
      order: Number(order) || 0,
      imageUrl,
    });
  res.status(201).json({ success: true, data: stack });
};

export const updateStack = async (
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
  const stack = await Stack.findById(req.params.id);
  

  if (!stack) {
    res.status(404).json({ success: false, message: "Stack not found" });
    return;
  }

  stack.title = title || stack.title;
  stack.description = description || stack.description;
  stack.technologies = technologies
    ? JSON.parse(technologies)
    : stack.technologies;
stack.demoLink = demoLink !== undefined ? demoLink : stack.demoLink;
stack.githubLink =
  githubLink !== undefined ? githubLink : stack.githubLink;
stack.featured =
  featured !== undefined ? featured === "true" : stack.featured;
stack.order = order !== undefined ? Number(order) : stack.order;

  await stack.save();
  res.json({ success: true, data: stack });
};

export const deleteStack = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const stack = await Stack.findByIdAndDelete(req.params.id);

  if (!stack) {
    res.status(404).json({ success: false, message: "Stack not found" });
    return;
  }

  if (stack.imageUrl) {
    const filePath = path.resolve(process.cwd(), `public${stack.imageUrl}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
  res.json({ success: true, message: "Stack deleted" });
};
