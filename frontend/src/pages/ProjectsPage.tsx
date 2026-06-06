import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { projectService } from "../services/projectService";
import { ProjectCard } from "../components/projects/ProjectCard";
import { PageLoader, SkeletonCard } from "../components/common/PageLoader";

export const ProjectsPage = () => {
  const {
    data: apiProjects,
    isLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getAll(),
  });

  // Fallback data if database is empty
  const defaultProjects = [
    {
      _id: "mock-1",
      title: "Cyber Elite Portfolio",
      description: "A high-end professional portfolio with cyber-themed aesthetics and precision engineering. Built with absolute technical control.",
      technologies: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      githubLink: "https://github.com/4yangXYAO",
      demoLink: "#",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      slug: "cyber-elite-portfolio",
      featured: true,
      order: 1
    },
    {
      _id: "mock-2",
      title: "AI Mission Dashboard",
      description: "Real-time telemetry dashboard for monitoring AI agent deployments (GPT, Gemini, Grok) and mission logs.",
      technologies: ["Next.js", "Node.js", "MongoDB", "Express"],
      githubLink: "https://github.com/4yangXYAO",
      demoLink: "#",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      slug: "ai-mission-dashboard",
      featured: true,
      order: 2
    },
    {
      _id: "mock-3",
      title: "OpenCode System Architect",
      description: "A specialized tool for architecting codebases using the OpenCode protocol and Hermes agent integration.",
      technologies: ["TypeScript", "LangGraph", "Python"],
      githubLink: "https://github.com/4yangXYAO",
      demoLink: "#",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      slug: "opencode-architect",
      featured: true,
      order: 3
    }
  ];

  const projects = apiProjects?.length ? apiProjects : defaultProjects;

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
            MISSION_LOG: <span className="text-gray-500">PROJECTS</span>
          </h1>
          <p className="font-sans text-gray-400 max-w-2xl text-lg leading-relaxed">
            Index of executed architectures and experimental prototypes.
            Each entry represents a secure protocol of technical excellence.
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : projects?.length === 0 ? (
          <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-500 font-mono tracking-widest">ERROR: NO_ENTRIES_FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects?.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
