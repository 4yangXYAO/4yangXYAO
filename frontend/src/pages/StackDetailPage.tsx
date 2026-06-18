import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { StackService } from "../services/StackService";
import { PageLoader } from "../components/common/PageLoader";
import { Button } from "../components/common/Button";
import { getImageUrl } from "../utils/constants";

export const StackDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: stack,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stack", slug],
    queryFn: () => StackService.getBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <PageLoader />;

  if (error || !stack) {
    return (
      <div className="section-spacing text-center font-mono text-[#ff3e3e]">
        <h1 className="text-4xl font-bold mb-4 uppercase">
          PROTOCOL_ERROR: NO_ENTRY
        </h1>
        <p className="text-gray-500 mb-8 tracking-widest">
          The requested data stream for {slug?.toUpperCase()} is unavailable.
        </p>
        <Link to="/stacks">
          <Button variant="outline">BACK_TO_TERMINAL</Button>
        </Link>
      </div>
    );
  }

  const imageUrl = getImageUrl(stack.imageUrl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="section-spacing min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Cyber Breadcrumbs */}
        <nav className="flex mb-12 font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase overflow-x-auto pb-4 border-b border-white/5">
          <Link
            to="/"
            className="hover:text-[#00daf7] transition-colors shrink-0"
          >
            ROOT
          </Link>
          <span className="mx-4 text-[#00daf7]/40">::</span>
          <Link
            to="/stacks"
            className="hover:text-[#00daf7] transition-colors shrink-0"
          >
            STACK_DATABASE
          </Link>

          <span className="mx-4 text-[#00daf7]/40">::</span>
          <span className="text-[#00daf7] truncate">
            {stack.title.replace(" ", "_")}
          </span>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-20 items-start">
          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-12 xl:col-span-8 mb-12 lg:mb-0"
          >
            <div className="relative p-2 border border-[#00daf7]/20 bg-[#121212]/30 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00daf7]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00daf7]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00daf7]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00daf7]" />

              <div className="aspect-video overflow-hidden bg-black">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={stack.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl grayscale opacity-20">
                    📷
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-12 xl:col-span-4"
          >
            <div className="font-mono text-xs text-[#00daf7] uppercase tracking-[0.4em] mb-4">
              SYSTEM_LOG // 001
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight uppercase tracking-tighter">
              {stack.title.split(" ").map((w, i) => (
                <span
                  key={i}
                  className={i === 0 ? "text-white" : "text-[#00daf7]"}
                >
                  {w}{" "}
                </span>
              ))}
            </h1>

            <div className="flex flex-wrap gap-2 mb-10">
              {stack.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-[#00daf7]/10 text-[#00daf7] px-3 py-1 font-mono text-[10px] tracking-widest border border-[#00daf7]/20 uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="font-sans text-gray-400 mb-12 leading-relaxed text-lg whitespace-pre-wrap border-l-2 border-white/5 pl-8">
              {stack.description}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stack.demoLink && (
                <a
                  href={stack.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-glow-btn text-xs font-black tracking-[0.2em]"
                >
                  LIVE_ACCESS
                </a>
              )}
              {stack.githubLink && (
                <a
                  href={stack.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#121212] text-white font-mono text-[10px] tracking-widest border-2 border-white/5 hover:border-[#00daf7]/30 transition-all text-center uppercase flex items-center justify-center"
                >
                  SOURCE_CODE
                </a>
              )}
            </div>

            <div className="mt-20 p-6 bg-[#00daf7]/10 border border-[#00daf7]/20">
              <div className="font-mono text-[9px] text-[#00daf7] tracking-[0.3em] uppercase mb-4 opacity-70">
                METADATA_STREAM
              </div>
              <div className="space-y-2 font-mono text-[10px] text-gray-500">
                <div className="flex justify-between">
                  <span>SECURITY_STATUS</span>
                  <span className="text-[#00daf7]">ENCRYPTED</span>
                </div>
                <div className="flex justify-between">
                  <span>DEPLOYMENT_DATE</span>
                  <span className="text-white">
                    {new Date(stack.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
