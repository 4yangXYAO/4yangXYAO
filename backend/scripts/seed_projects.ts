import "dotenv/config";
import mongoose from "mongoose";
import { Project } from "../src/models/Project";

const seedProjects = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    const projects = [
      { title: "SHOP_ECOMMERCE", description: "Website toko online dengan fitur keranjang belanja dan manajemen produk.", technologies: ["Next.js", "Redux", "Stripe", "Tailwind"], slug: "shop-ecommerce", featured: true, order: 1 },
      { title: "NET_MONITOR_SYS", description: "Sistem monitoring infrastruktur jaringan dan kesehatan server secara real-time.", technologies: ["React", "SNMP", "Node.js", "Grafana"], slug: "net-monitor-sys", featured: true, order: 2 },
      { title: "IT_SUPPORT_PORTAL", description: "Portal tiket bantuan teknis untuk menangani keluhan hardware dan software pengguna.", technologies: ["TypeScript", "MongoDB", "Express", "Tailwind"], slug: "it-support-portal", featured: true, order: 3 },
      { title: "ADMIN_DASHBOARD", description: "Panel administrasi untuk pengelolaan data pengguna dan statistik sistem.", technologies: ["React", "Chart.js", "Framer Motion"], slug: "admin-dashboard", featured: true, order: 4 },
      { title: "NET_TOPOLOGY_MAPPER", description: "Alat visualisasi dinamis untuk memetakan titik-titik jaringan area lokal (LAN).", technologies: ["Canvas API", "Vis.js", "Networking"], slug: "net-topology-mapper", featured: false, order: 5 },
      { title: "PORTFOLIO_WEB", description: "Website portofolio pribadi untuk menampilkan rekam jejak karir dan karya teknis.", technologies: ["React", "CSS", "Framer Motion"], slug: "portfolio-web", featured: true, order: 6 },
      { title: "AI_CHATBOT", description: "Chatbot berbasis kecerdasan buatan untuk membantu tanya jawab teknis dasar.", technologies: ["OpenAI", "Node.js", "LangChain"], slug: "ai-chatbot", featured: false, order: 7 },
      { title: "TASK_MANAGEMENT", description: "Aplikasi produktivitas untuk mengelola daftar tugas dan kolaborasi tim.", technologies: ["Socket.io", "React", "Express"], slug: "task-management", featured: false, order: 8 },
      { title: "HARDWARE_INVENTORY", description: "Sistem pendataan inventaris perangkat keras IT dan riwayat pemeliharaannya.", technologies: ["Next.js", "Prisma", "PostgreSQL"], slug: "hardware-inventory", featured: false, order: 9 },
      { title: "BLOG_PLATFORM", description: "Platform penulisan artikel blogger dengan dashboard manajemen konten.", technologies: ["React", "Node.js", "Markdown"], slug: "blog-platform", featured: false, order: 10 },
      { title: "COFFEE_SHOP_SITE", description: "Website profil untuk kedai kopi dengan menu interaktif dan lokasi toko.", technologies: ["React", "Tailwind", "Vite"], slug: "coffee-shop-site", featured: false, order: 11 },
      { title: "SCHOOL_INFO_SYSTEM", description: "Sistem informasi untuk mengelola data siswa, guru, dan jadwal pelajaran sekolah.", technologies: ["Next.js", "Database", "Authentication"], slug: "school-info-system", featured: false, order: 12 },
      { title: "COMPANY_LANDING_PAGE", description: "Halaman landing profesional untuk mempromosikan layanan dan profil perusahaan.", technologies: ["HTML", "CSS", "Javascript"], slug: "company-landing-page", featured: false, order: 13 },
      { title: "SERVICE_BOOKING_APP", description: "Aplikasi pemesanan jasa service secara online dengan jadwal yang fleksibel.", technologies: ["React Native", "Firebase", "Maps API"], slug: "service-booking-app", featured: false, order: 14 },
      { title: "NEWS_PORTAL_WEB", description: "Portal berita online dengan kategori artikel dan update berita terkini.", technologies: ["Next.js", "API", "RSS Feed"], slug: "news-portal-web", featured: false, order: 15 },
      { title: "ONLINE_QUIZ_APP", description: "Platform simulasi ujian dan kuis online dengan sistem penilaian otomatis.", technologies: ["React", "State Management", "Animation"], slug: "online-quiz-app", featured: false, order: 16 },
      { title: "WEATHER_TRACKER", description: "Aplikasi pelacak cuaca harian berdasarkan lokasi pengguna secara real-time.", technologies: ["OpenWeatherMap API", "React", "Geolocation"], slug: "weather-tracker", featured: false, order: 17 },
      { title: "REST_API_SERVER", description: "Layanan backend API untuk pengolahan dan pertukaran data aplikasi.", technologies: ["Node.js", "Express", "JWT"], slug: "rest-api-server", featured: false, order: 18 },
      { title: "PERSONAL_DIARY_WEB", description: "Situs catatan harian pribadi dengan fitur enkripsi dan keamanan data.", technologies: ["React", "CryptoJS", "Local Storage"], slug: "personal-diary-web", featured: false, order: 19 },
      { title: "EVENT_TICKETING", description: "Sistem reservasi tiket untuk acara konser, seminar, atau kegiatan sosial.", technologies: ["Next.js", "QR Code API", "Database"], slug: "event-ticketing", featured: false, order: 20 }
    ];

    for (const p of projects) {
      await Project.findOneAndUpdate({ slug: p.slug }, p, { upsert: true });
    }

    console.log("20 Projects Synchronized Successfully");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding projects:", error);
    process.exit(1);
  }
};

seedProjects();
