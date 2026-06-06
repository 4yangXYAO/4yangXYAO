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

  const { data: apiProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: () => projectService.getAll(),
  });

  // Fallback data from seed_projects.ts
  const defaultProjects = [
    { _id: "m1", title: "SHOP_ECOMMERCE", description: "Website toko online dengan fitur keranjang belanja dan manajemen produk.", technologies: ["Next.js", "Redux", "Stripe", "Tailwind"], slug: "shop-ecommerce", featured: true, order: 1, image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800" },
    { _id: "m2", title: "NET_MONITOR_SYS", description: "Sistem monitoring infrastruktur jaringan dan kesehatan server secara real-time.", technologies: ["React", "SNMP", "Node.js", "Grafana"], slug: "net-monitor-sys", featured: true, order: 2, image: "https://images.unsplash.com/photo-1551288049-bb848a4fb6c5?w=800" },
    { _id: "m3", title: "IT_SUPPORT_PORTAL", description: "Portal tiket bantuan teknis untuk menangani keluhan hardware dan software pengguna.", technologies: ["TypeScript", "MongoDB", "Express", "Tailwind"], slug: "it-support-portal", featured: true, order: 3, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800" },
    { _id: "m4", title: "ADMIN_DASHBOARD", description: "Panel administrasi untuk pengelolaan data pengguna dan statistik sistem.", technologies: ["React", "Chart.js", "Framer Motion"], slug: "admin-dashboard", featured: true, order: 4, image: "https://images.unsplash.com/photo-1551288049-bb848a4fb6c5?w=800" },
    { _id: "m5", title: "NET_TOPOLOGY_MAPPER", description: "Alat visualisasi dinamis untuk memetakan titik-titik jaringan area lokal (LAN).", technologies: ["Canvas API", "Vis.js", "Networking"], slug: "net-topology-mapper", featured: false, order: 5, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800" },
    { _id: "m6", title: "PORTFOLIO_WEB", description: "Website portofolio pribadi untuk menampilkan rekam jejak karir dan karya teknis.", technologies: ["React", "CSS", "Framer Motion"], slug: "portfolio-web", featured: true, order: 6, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
    { _id: "m7", title: "AI_CHATBOT", description: "Chatbot berbasis kecerdasan buatan untuk membantu tanya jawab teknis dasar.", technologies: ["OpenAI", "Node.js", "LangChain"], slug: "ai-chatbot", featured: false, order: 7, image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=800" },
    { _id: "m8", title: "TASK_MANAGEMENT", description: "Aplikasi produktivitas untuk mengelola daftar tugas dan kolaborasi tim.", technologies: ["Socket.io", "React", "Express"], slug: "task-management", featured: false, order: 8, image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800" },
    { _id: "m9", title: "HARDWARE_INVENTORY", description: "Sistem pendataan inventaris perangkat keras IT dan riwayat pemeliharaannya.", technologies: ["Next.js", "Prisma", "PostgreSQL"], slug: "hardware-inventory", featured: false, order: 9, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800" },
    { _id: "m10", title: "BLOG_PLATFORM", description: "Platform penulisan artikel blogger dengan dashboard manajemen konten.", technologies: ["React", "Node.js", "Markdown"], slug: "blog-platform", featured: false, order: 10, image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800" },
    { _id: "m11", title: "COFFEE_SHOP_SITE", description: "Website profil untuk kedai kopi dengan menu interaktif dan lokasi toko.", technologies: ["React", "Tailwind", "Vite"], slug: "coffee-shop-site", featured: false, order: 11, image: "https://images.unsplash.com/photo-1501339818194-919992f70355?w=800" },
    { _id: "m12", title: "SCHOOL_INFO_SYSTEM", description: "Sistem informasi untuk mengelola data siswa, guru, dan jadwal pelajaran sekolah.", technologies: ["Next.js", "Database", "Authentication"], slug: "school-info-system", featured: false, order: 12, image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800" },
    { _id: "m13", title: "COMPANY_LANDING_PAGE", description: "Halaman landing profesional untuk mempromosikan layanan dan profil perusahaan.", technologies: ["HTML", "CSS", "Javascript"], slug: "company-landing-page", featured: false, order: 13, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" },
    { _id: "m14", title: "SERVICE_BOOKING_APP", description: "Aplikasi pemesanan jasa service secara online dengan jadwal yang fleksibel.", technologies: ["React Native", "Firebase", "Maps API"], slug: "service-booking-app", featured: false, order: 14, image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800" },
    { _id: "m15", title: "NEWS_PORTAL_WEB", description: "Portal berita online dengan kategori artikel dan update berita terkini.", technologies: ["Next.js", "API", "RSS Feed"], slug: "news-portal-web", featured: false, order: 15, image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800" },
    { _id: "m16", title: "ONLINE_QUIZ_APP", description: "Platform simulasi ujian dan kuis online dengan sistem penilaian otomatis.", technologies: ["React", "State Management", "Animation"], slug: "online-quiz-app", featured: false, order: 16, image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800" },
    { _id: "m17", title: "WEATHER_TRACKER", description: "Aplikasi pelacak cuaca harian berdasarkan lokasi pengguna secara real-time.", technologies: ["OpenWeatherMap API", "React", "Geolocation"], slug: "weather-tracker", featured: false, order: 17, image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800" },
    { _id: "m18", title: "REST_API_SERVER", description: "Layanan backend API untuk pengolahan dan pertukaran data aplikasi.", technologies: ["Node.js", "Express", "JWT"], slug: "rest-api-server", featured: false, order: 18, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800" },
    { _id: "m19", title: "PERSONAL_DIARY_WEB", description: "Situs catatan harian pribadi dengan fitur enkripsi dan keamanan data.", technologies: ["React", "CryptoJS", "Local Storage"], slug: "personal-diary-web", featured: false, order: 19, image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800" },
    { _id: "m20", title: "EVENT_TICKETING", description: "Sistem reservasi tiket untuk acara konser, seminar, atau kegiatan sosial.", technologies: ["Next.js", "QR Code API", "Database"], slug: "event-ticketing", featured: false, order: 20, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800" }
  ];

  const featuredProjects = (apiProjects?.filter((p) => p.featured).slice(0, 3) || []).length
    ? apiProjects?.filter((p) => p.featured).slice(0, 3)
    : defaultProjects.filter(p => p.featured).slice(0, 3);

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
          {/* CV Button Removed */}
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
