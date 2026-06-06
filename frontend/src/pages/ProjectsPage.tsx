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
            Daftar portofolio yang merangkum berbagai jenis proyek teknis dan 
            eksperimen pengembangan sistem yang telah saya selesaikan.
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
