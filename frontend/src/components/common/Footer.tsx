import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { profileService } from "../../services/profileService";

export const Footer = () => {
  const year = new Date().getFullYear();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });

  const socialLinks = [
    { name: "GITHUB", url: profile?.socialLinks?.github || "https://github.com/4yangXYAO", isExternal: true },
    { name: "LINKEDIN", url: profile?.socialLinks?.linkedin || "#", isExternal: true },
  ];

  return (
    <footer className="w-full py-12 md:py-20 bg-[#0a0a0a] border-t-2 border-white/5 relative overflow-hidden">
      {/* Background Decorative Grid segment */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right, #00daf7 1px, transparent 1px), linear-gradient(to bottom, #00daf7 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="text-white font-bold font-mono text-xl tracking-tighter drop-shadow-[0_0_8px_#00daf744]">
            Project By XYAON
          </div>
          <div className="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase">
            WITH Alya, Jester, Rena, and ❤️.
          </div>
        </div>

        <div className="flex gap-8 md:gap-12">
          {socialLinks.map((item) => (
            item.isExternal ? (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 font-mono text-xs tracking-widest hover:text-[#00daf7] transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.url}
                className="text-gray-400 font-mono text-xs tracking-widest hover:text-[#00daf7] transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        <div className="font-mono text-[10px] text-[#00daf7] flex items-center gap-3 bg-[#00daf7]/5 px-4 py-2 border border-[#00daf7]/20 rounded-full">
          <span className="w-1.5 h-1.5 bg-[#00daf7] rounded-full animate-pulse shadow-[0_0_5px_#00daf7]"></span>
          SECURE_CONNECTION_TLS_1.3
        </div>
      </div>
    </footer>
  );
};
