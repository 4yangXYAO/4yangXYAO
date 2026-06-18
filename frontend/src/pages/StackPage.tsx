import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { StackService } from "../services/StackService";
import { StackCard } from "../components/stack/StackCard";
import { SkeletonCard } from "../components/common/PageLoader";

export const StackPage = () => {
  const { data: apiStack, isLoading } = useQuery({
    queryKey: ["stack"],
    queryFn: () => StackService.getAll(),
  });

  // Fallback data from seed_stacks.ts
  const defaultStack = [
    {
      _id: "S01",
      title: "NA_OS",
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
      slug: "Website-OS",
      featured: true,
      order: 1,
      image: "frontend/src/assets/images/stack/na_os_.webp",
    },

    {
      _id: "S02",
      title: "Blast_engine",
      description: "Sistem Kampanye dDi berbagai Platform",
      technologies: [" Node.js", "TypeScript"],
      slug: "Website-OS",
      featured: true,
      order: 2,
      image: "frontend/src/assets/images/stack/blast_engine.png",
    },
  ];

  const stack = apiStack?.length ? apiStack : defaultStack;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="section-spacing min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <header className="mb-20 border-l-4 border-[#00daf7] pl-6 md:pl-10">
          <div className="font-mono text-xs text-[#00daf7] tracking-[0.4em] uppercase mb-4">
            DATA_ARCHIVE_0x7FE
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6">
            MISSION_LOG: <span className="text-gray-500">Stack</span>
          </h1>
          <p className="font-sans text-gray-400 max-w-2xl text-lg leading-relaxed">
            some projects that I am currently developing.
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : stack?.length === 0 ? (
          <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-500 font-mono tracking-widest">
              ERROR: NO_ENTRIES_FOUND
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {stack?.map((stack, i) => (
              <motion.div
                key={stack._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <StackCard stack={stack} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
