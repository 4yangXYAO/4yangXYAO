// ponytail: static fallback so /api/v1/stacks serves real data without Mongo.
// Flat Stack[] shape consumed by frontend StackCard (the category/proficiency
// UI comes from the frontend's own static STACK_CATEGORIES).

export const FALLBACK_STACKS = [
  {
    _id: "S01",
    title: "NA_OS",
    slug: "Website-OS",
    description:
      "Sebuah sistem operasi eksperimental yang saya kembangkan untuk memahami konseep OS sederhana, Di dalam Website, dengan beberapa fitur sederhana",
    technologies: [
      "Node.js",
      "SolidJS",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Fastify",
      "Socket.IO",
      "Lucide Solid",
      "Zod",
      "dan Vitest",
    ],
    imageUrl: "/media/stack/na_os_.webp",
    featured: true,
    order: 1,
  },
  {
    _id: "S02",
    title: "Blast_engine",
    slug: "blast-engine",
    description: "Sistem Kampanye Di berbagai Platform",
    technologies: [" Node.js", "TypeScript"],
    // broken /media/stack/blast_engine.png does not exist — let ProjectCover render instead
    imageUrl: undefined,
    featured: true,
    order: 2,
  },
];
