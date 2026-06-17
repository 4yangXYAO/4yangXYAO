import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { profileService } from "../services/profileService";
import { StackService } from "../services/StackService";
import { PageLoader } from "../components/common/PageLoader";
import { getImageUrl } from "../utils/constants";

export const AboutPage = () => {
  const { data: apiProfile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });

  const { data: stacks, isLoading: stacksLoading } = useQuery({
    queryKey: ["stacks"],
    queryFn: () => StackService.getAll(),
  });

  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Fallback data if database is empty
  const defaultProfile = {
    name: "Kharis Jalaludin",
    bio: "I am someone who is consistently working on self-growth in the field of Information Technology (IT). I learn quickly, stay curious, and focus on improving both my skills and mindset. I believe small, consistent progress leads to meaningful long-term results",
    tagline: "ARCHITECTING DIGITAL_DREAMS",
    skills: ["React", "Typescript", "Node.js", "Vite", "Tailwind", "MongoDB"],
    avatar: "/media/profile/profile.webp",
  };

  const profile = apiProfile || defaultProfile;

  if (isLoading || stacksLoading) return <PageLoader />;

  const avatarUrl = getImageUrl(profile.avatar);

  const displayCategories =
    stacks && stacks.length > 0
      ? [
        {
          category: "MY_TOOLS",
          skills: stacks.map((s) => s.title),
        },
      ]
      : [
        {
          category: "CORE",
          skills: [
            "JAVASCRIPT",
            "TYPESCRIPT",
            "REACT",
            "NEXT.JS",
            "TAILWIND",
            "HTML/CSS",
            "REDUX",
            "FRAMER MOTION",
            "PYTHON",
            "C++",
            "C",
          ],
        },
        {
          category: "AI_MODELS",
          skills: [
            "GPT",
            "GEMINI",
            "GROK",
            "CLAUDE",
            "KIMI",
            "DEEPSEEK",
            "LLAMA",
          ],
        },
        {
          category: "AI_AGENT",
          skills: [
            "AUTOGEN",
            "CLAUDE_CODE",
            "LANGGRAPH",
            "OPENAI_AGENT",
            "OPENCODE",
            "HERMES",
          ],
        },
        {
          category: "ECOSYSTEM",
          skills: ["GIT", "DOCKER", "MONGODB", "NODE.JS", "EXPRESS"],
        },
      ];

  const careerTimeline = [
    {
      period: "2024  NOW",
      role: "UI/UX Engineer",
      company: "NOVA_FINTECH_SOLUTIONS",
      description:
        "Bridge the gap between low-latency financial models and executive-grade visual interfaces. Developed a proprietary design system used across 14 international banking platforms.",
      tags: ["DESIGN_SYS", "REACT"],
    },
    {
      period: "2025  2026",
      role: "Junior Frontend Developer, AI EXPERIMENT",
      company: "-",
      description:
        "Orchestrating the frontend infrastructure for next-gen telemetry dashboards. Implementing real-time data streaming protocols and custom WebGL visualization engines.",
      tags: ["SYSTEM_DESIGN", "WEBGL"],
    },
    {
      period: "SEP 2024  MAR 2025",
      role: "F&B Service",
      company: "KOPI APA? (Drink and Snack)",
      description:
        "Managing basic cleaning, menu recommendations, and equipment preparation.",
      tags: ["F&B_SERVICE", "CUSTOMER_CARE"],
    },
    {
      period: "MEI 2024  SEP 2024",
      role: "F&B Service",
      company: "WeCaffe (Drink and Snack)",
      description:
        "Optimized customer satisfaction through personalized service and managed production equipment.",
      tags: ["HOSPITALITY", "OPS"],
    },
    {
      period: "JUL 2023  MAR 2024",
      role: "Production Helper",
      company: "CV PANGAN BERKAH SENTOSA",
      description:
        "Assisted in daily production following SOPs and quality control sorting.",
      tags: ["PRODUCTION", "SOP"],
    },
    {
      period: "OKT 2020  FEB 2021",
      role: "Internship: Help Desk & Technician",
      company: "PT TELKOM INDONESIA",
      description:
        "Handled customer technical queries and performed field surveys/installations.",
      tags: ["NETWORK", "HELPDESK"],
    },
  ];

  const educationTimeline = [
    {
      period: "2019 — 2022",
      school: "SMK 10 NOPEMBER JOMBANG",
      major: "TEKNIK KOMPUTER JARINGAN",
      description:
        "Focused on networking, computer fundamentals, programming basics, and technical troubleshooting.",
      tags: ["TKJ", "NETWORKING"],
    },
    {
      period: "NOV 2019 — DES 2019",
      school: "BALAI LATIHAN KERJA JOMBANG",
      major: "TECHNICAL SUPPORT",
      description:
        "Applied learning in hardware/software troubleshooting and general technical problem-solving.",
      tags: ["HARDWARE", "TECH_SUPPORT"],
    },
  ];

  const organizationTimeline = [
    {
      period: "2019 — 2022",
      role: "OSIS Chairperson",
      company: "SMK 10 Nopember",
      description:
        "Led the student council and planned school events through leadership.",
      tags: ["LEADERSHIP", "ORG"],
    },
    {
      period: "2019 — 2022",
      role: "Library Member",
      company: "SMK 10 Nopember",
      description:
        "Managed book lending records and maintained the library ecosystem.",
      tags: ["ADMIN", "ARCHIVE"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="section-spacing min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-24">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 uppercase tracking-tighter">
              ABOUT_ME
            </h1>
            <div className="font-mono text-xs text-[#00daf7] tracking-[0.4em] uppercase mb-12">
              SYSTEMS_LOG :: beberapa tahun kemarin
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
              <div className="lg:col-span-1 h-full hidden lg:block"></div>
              <div className="lg:col-span-7">
                <p className="font-sans text-gray-400 text-xl leading-relaxed">
                  {profile.bio}
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-end">
                <div className="relative p-1 border border-[#00daf7]/20">
                  <img
                    src="/media/profile/profile.webp"
                    alt="Kharis"
                    className="w-48 h-48 md:w-56 md:h-56 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400";
                    }}
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#00daf7]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Career Timeline - Infinite Running Animation */}
          <div className="overflow-hidden mb-32 group relative">
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#000000] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#000000] to-transparent z-10"></div>

            <motion.div
              drag="x"
              dragConstraints={{ left: -3000, right: 0 }}
              className="flex gap-8 whitespace-nowrap cursor-grab active:cursor-grabbing"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 200,
                  ease: "linear",
                },
              }}
              whileHover={{ transition: { paused: true } }}
            >
              {/* Rendering items twice for infinite effect */}
              {[...careerTimeline, ...careerTimeline].map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[350px] md:w-[450px] flex"
                >
                  <TimelineCard item={item} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Education & Organization Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
            <div>
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <h2 className="font-display text-3xl md:text-4xl text-white uppercase">
                  ACADEMIC_ARCHIVE
                </h2>
              </div>
              <div className="space-y-8">
                {educationTimeline.map((item, index) => (
                  <div
                    key={index}
                    className="relative p-6 border-l-2 border-[#00daf7]/30 bg-[#121212]/30 group hover:border-[#00daf7] transition-all"
                  >
                    <div className="font-mono text-[10px] text-[#00daf7] mb-2">
                      {item.period}
                    </div>
                    <h3 className="font-display text-xl text-white uppercase mb-1">
                      {item.school}
                    </h3>
                    <div className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4">
                      {item.major}
                    </div>
                    <p className="font-sans text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <h2 className="font-display text-3xl md:text-4xl text-white uppercase">
                  ORG_NODES
                </h2>
              </div>
              <div className="space-y-8">
                {organizationTimeline.map((item, index) => (
                  <div
                    key={index}
                    className="relative p-6 border-l-2 border-[#00daf7]/30 bg-[#121212]/30 group hover:border-[#00daf7] transition-all"
                  >
                    <div className="font-mono text-[10px] text-[#00daf7] mb-2">
                      {item.period}
                    </div>
                    <h3 className="font-display text-xl text-white uppercase mb-1">
                      {item.role}
                    </h3>
                    <div className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4">
                      {item.company}
                    </div>
                    <p className="font-sans text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI / Stack Section */}
          <div
            id="stack"
            className="mt-48 pt-24 border-t border-white/5 scroll-mt-24"
          >
            <div className="flex items-center gap-4 mb-16">
              <h2 className="font-display text-4xl text-white uppercase">
                TECH_STACK // EMPOWERED_BY_AI
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {displayCategories.map((cat, idx) => (
                <div
                  key={cat.category}
                  className="p-6 md:p-8 bg-[#121212]/50 border border-white/5 relative group hover:border-[#00daf7]/30 transition-all overflow-hidden"
                >
                  <div className="font-mono text-[10px] text-[#00daf7] tracking-[0.4em] mb-8 uppercase px-3 py-1 bg-[#00daf7]/5 inline-block">
                    {cat.category}
                  </div>
                  <div className="relative h-12 flex items-center overflow-hidden">
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: -1000, right: 0 }}
                      className="flex gap-x-12 whitespace-nowrap absolute cursor-grab active:cursor-grabbing"
                      animate={{
                        x: ["0%", "-50%"],
                      }}
                      transition={{
                        duration: 200,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {[...cat.skills, ...cat.skills].map((skill, i) => (
                        <div key={i} className="flex flex-col gap-1 pr-6">
                          <span className="font-display text-xl md:text-2xl text-white group-hover:text-[#00daf7] transition-colors cursor-default tracking-tight uppercase">
                            {skill}
                          </span>
                          <div className="h-0.5 w-full bg-white/5 group-hover:bg-[#00daf7]/30 transition-all"></div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              ))}

              <div className="md:col-span-2 p-8 border border-[#00daf7]/10 bg-[#00daf7]/5 group">
                <div className="font-mono text-[10px] text-[#00daf7] tracking-[0.4em] mb-6 uppercase">
                  PRIMARY_FOCUS
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="font-display text-4xl md:text-6xl text-white group-hover:text-[#00daf7] transition-colors">
                    FRONTEND_DEV
                  </span>
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-[0.2em]">
                    REACT / TS / NEXT.JS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineCard = ({ item }: any) => (
  <div className="relative p-8 border border-[#00daf7]/10 bg-[#121212]/40 backdrop-blur-sm group hover:border-[#00daf7]/50 transition-all flex flex-col h-full w-full whitespace-normal">
    <div className="font-mono text-[10px] text-[#00daf7] mb-2">
      {item.period}
    </div>
    <h3 className="font-display text-2xl text-white uppercase mb-1 group-hover:text-[#00daf7] transition-colors">
      {item.role}
    </h3>
    <div className="font-mono text-xs text-gray-500 italic mb-6 uppercase tracking-widest leading-none">
      {item.company}
    </div>
    <p className="font-sans text-gray-400 mb-8 leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity flex-grow">
      {item.description}
    </p>
    <div className="flex flex-wrap gap-2 justify-inherit mt-auto pt-4">
      {item.tags.map((tag: string) => (
        <span
          key={tag}
          className="px-3 py-1 bg-[#00daf7]/5 border border-[#00daf7]/20 text-[#00daf7] font-mono text-[9px] tracking-widest uppercase"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Global screen-side accents removed */}
  </div>
);
