import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projectService } from "../services/projectService";
import { profileService } from "../services/profileService";
import { ProjectCard } from "../components/projects/ProjectCard";
import { SkeletonCard } from "../components/common/PageLoader";

export const HomePage = () => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => projectService.getAll(),
  });

  const featuredProjects = projects?.filter((p) => p.featured).slice(0, 3) || [];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Subtle Ambient HUD Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(to right, #00daf7 1px, transparent 1px), linear-gradient(to bottom, #00daf7 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
        </div>

        {/* Floating Sector Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-5 py-2 bg-[#121212]/80 backdrop-blur-xl border border-[#00daf7]/30 mb-8 z-10"
        >
          <span className="w-1.5 h-1.5 bg-[#00daf7] rounded-full animate-status-blink shadow-[0_0_8px_#00daf7]"></span>
          <span className="font-mono text-xs text-[#00daf7] tracking-[0.5em] uppercase">
            AUTHOR :: {profile?.name?.toUpperCase() || "XYAON'S_PORTO"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-8xl lg:text-[120px] text-white max-w-7xl mb-10 leading-[0.85] tracking-tighter uppercase z-10"
        >
          ARCHITECTING <br />
          <span className="text-[#00daf7] drop-shadow-[0_0_30px_rgba(0,218,247,0.2)]">DIGITAL_DREAMS</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-6 z-10 mb-16"
        >
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#00daf7]/40 to-transparent"></div>
          <p className="font-sans text-gray-400 max-w-2xl text-lg md:text-xl leading-relaxed px-4">
             Membangun antarmuka kelas dunia yang menggabungkan presisi teknis dengan estetika futuristik. 
             <span className="block mt-4 text-[#00daf7]/60 font-mono text-xs tracking-widest">EXECUTED_BY::{profile?.name?.toUpperCase() || "KHARIS_JALALUDIN"}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 z-10"
        >
          <Link to="/projects" className="cyber-glow-btn px-12 py-4 flex items-center gap-4 group">
            <span>VIEW_ALL_WORK</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </Link>
          <button className="px-12 py-4 bg-[#121212]/50 backdrop-blur-md text-white font-mono text-xs tracking-[0.3em] border border-white/10 hover:border-[#00daf7]/40 transition-all uppercase">
            DOWNLOAD_CV.PDF
          </button>
        </motion.div>

        {/* Vertical HUD Line */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 opacity-20">
           <span className="font-mono text-[9px] rotate-90 origin-left translate-x-4 mb-20 whitespace-nowrap tracking-widest text-[#00daf7]">SYSTEM_MANIFEST_V1.0</span>
           <div className="w-[1px] h-40 bg-gradient-to-b from-transparent via-[#00daf7] to-transparent"></div>
        </div>
      </section>

      {/* Technical Stack Section (Mid-page) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-32 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
           <div className="cyber-rail-l pl-8">
              <div className="font-mono text-[10px] text-[#00daf7] tracking-[0.5em] mb-4">CORE_COMPETENCIES</div>
              <h2 className="text-4xl md:text-6xl text-white font-display tracking-tight">TECHNICAL_MASTERY</h2>
           </div>
           <div className="text-right font-mono text-[10px] text-gray-700 tracking-widest">
              X00_DIRECTORY_SEARCH_STATUS:OK
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <SkillCard 
             number="001" 
             title="UI/UX_DESIGN" 
             description="Menciptakan pengalaman pengguna yang intuitif dengan struktur visual yang tajam dan atmospheric depth."
             tags={["FIGMA", "PROTOTYPING"]} 
             icon="design_services" 
           />
           <SkillCard 
             number="002" 
             title="FRONTEND_DEV" 
             description="Implementasi kode yang bersih dan performa tinggi menggunakan React, TypeScript, dan Next.js."
             tags={["JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXT.JS"]} 
             icon="terminal" 
           />
           <SkillCard 
             number="003" 
             title="AI_INTEGRATION" 
             description="Mengintegrasikan LLM (GPT, Gemini, Grok) dan Agent (Hermes, OpenCode) ke dalam alur kerja sistem."
             tags={["GPT", "AGENTS"]} 
             icon="auto_awesome" 
           />
        </div>
      </section>
      
      {/* Limitless Control Banner */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden my-20">
         <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale" 
              alt="cyber-pattern" />
         <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
         <div className="relative z-10 border-x-4 border-[#00daf7] px-20 py-8 bg-[#000000]/40 backdrop-blur-sm">
            <h2 className="text-3xl md:text-5xl font-mono tracking-[0.6em] text-[#00daf7]">LIMITLESS_CONTROL</h2>
         </div>
      </section>

      {/* Featured Missions */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-48">
         <div className="flex justify-between items-end mb-24">
            <div className="cyber-rail-l pl-8">
              <div className="font-mono text-[10px] text-[#00daf7] tracking-[0.5em] mb-4 uppercase">MISSION_LOG</div>
              <h2 className="text-4xl md:text-6xl text-white font-display tracking-tight uppercase">SELECTED_ARCHIVES</h2>
            </div>
            <Link to="/projects" className="text-[#00daf7] font-mono text-[10px] tracking-widest hover:underline mb-4">
              VIEW_ALL_MODS
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projectsLoading ? (
              [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            ) : (
              featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            )}
         </div>
      </section>
    </div>
  );
};

const SkillCard = ({ number, title, description, tags, icon }: any) => (
  <div className="group relative glass-panel p-10 cyber-rail-l hover:border-[#00daf7]/60 transition-all duration-500 overflow-hidden">
    <div className="absolute top-6 right-8 font-mono text-[10px] text-gray-800 group-hover:text-[#00daf7]/40 transition-colors">
      {number}
    </div>
    <span className="material-symbols-outlined text-[#00daf7] text-5xl mb-8 group-hover:scale-110 transition-transform">{icon}</span>
    <h3 className="text-white font-display text-2xl mb-4 tracking-tight uppercase">{title}</h3>
    <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
       {description}
    </p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => (
        <span key={tag} className="px-3 py-1 bg-[#00daf7]/5 border border-[#00daf7]/20 text-[#00daf7] font-mono text-[9px] tracking-widest uppercase">
          {tag}
        </span>
      ))}
    </div>
  </div>
);
