import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Project } from "../../types/project";
import { getImageUrl } from "../../utils/constants";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      layout
      className="group relative bg-[#121212]/70 backdrop-blur-md border border-white/5 border-l-4 border-l-[#00daf7] transition-all duration-300 hover:border-[#00daf7]/40 hover:-translate-y-1 overflow-hidden"
    >
      {/* Index Number Overlay */}
      <div className="absolute top-2 right-4 pointer-events-none font-mono text-[40px] font-black text-white/5 group-hover:text-[#00daf7]/10 transition-colors z-20">
        00{project.order || "X"}
      </div>

      <div className="relative h-48 overflow-hidden bg-black">
         {project.imageUrl && (
            <img
              src={getImageUrl(project.imageUrl)}
              alt={project.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1635332398717-924205a760de?q=80&w=1000&auto=format&fit=crop';
              }}
            />
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60"></div>
         
         {project.featured && (
            <div className="absolute top-4 left-4 z-20">
               <span className="bg-[#00daf7] text-[#0d0d0d] text-[10px] font-mono font-bold px-2 py-1 tracking-widest uppercase">
                 FEATURED_BUILD
               </span>
            </div>
         )}
      </div>

      <div className="p-6 relative z-10 flex flex-col h-full">
         <div className="mb-4">
            <h3 className="text-xl font-display font-bold text-white uppercase group-hover:text-[#00daf7] transition-colors mb-2">
              {project.title.replace(" ", "_")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="bg-[#1f1f1f] text-gray-500 text-[10px] font-mono px-2 py-0.5 border border-white/5 tracking-tighter"
                >
                  {tech.toUpperCase()}
                </span>
              ))}
            </div>
         </div>

         <p className="text-sm text-gray-400 font-sans line-clamp-2 mb-6 leading-relaxed">
            {project.description}
         </p>

         <div className="mt-auto flex items-center justify-between">
          {/* BUKA_PROTOKOL HIDDEN */}
         </div>
      </div>
      
      {/* Decorative corner lines */}
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none border-r-2 border-b-2 border-transparent group-hover:border-[#00daf7]/30 transition-all duration-300"></div>
    </motion.div>
  );
};
