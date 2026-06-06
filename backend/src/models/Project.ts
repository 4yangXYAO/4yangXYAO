import { Schema, model, type InferSchemaType } from "mongoose";
import slugify from "slugify";

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    technologies: [{ type: String }],
    demoLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

projectSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export type ProjectDocument = InferSchemaType<typeof projectSchema>;

export const Project = model("Project", projectSchema);
