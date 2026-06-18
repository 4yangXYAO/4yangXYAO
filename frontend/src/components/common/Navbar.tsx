import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "PROJECTS", path: "/projects" },
    { name: "ABOUT", path: "/about" },
    { name: "STACK", path: "/stacks" },
    { name: "CONTACT", path: "/contact" },
  ];


  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b-2 ${isScrolled
          ? "bg-[#000000]/95 backdrop-blur-md border-[#00daf7]/20 h-16"
          : "bg-transparent border-transparent h-20"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="font-mono text-xl md:text-2xl font-bold tracking-tighter text-[#00daf7] drop-shadow-[0_0_8px_rgba(0,218,247,0.5)]"
        >
          {location.pathname.startsWith('/admin') ? 'ADMIN_ARCHITECT' : "XYAON'S_PORTO"}
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-mono text-[11px] tracking-[0.3em] font-medium transition-all px-2 py-1 ${location.pathname === link.path
                  ? "text-[#00daf7] border-b-2 border-[#00daf7]"
                  : "text-gray-500 hover:bg-[#00daf7] hover:text-[#000000] uppercase"
                }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 border-l border-white/10 pl-10">
            <span className="material-symbols-outlined text-[#00daf7] text-sm status-blink">sensors</span>
            <Link
              to="/contact"
              className="bg-transparent border border-[#00daf7] text-[#00daf7] px-6 py-2 font-mono text-[10px] font-bold tracking-[0.2em] hover:bg-[#00daf7] hover:text-[#000000] transition-all"
            >
              CONTACT_ME_V1.0
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <Link
            to="/contact"
            className="bg-[#00daf7] text-[#000000] px-4 py-1.5 font-mono text-[9px] font-bold tracking-widest uppercase"
          >
            CONTACT
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-[#121212] text-[#00daf7] border border-[#00daf7]/40 px-4 py-1.5 hover:bg-[#00daf7]/10 transition-all flex items-center justify-center h-[30px]"
          >
            <span className="material-symbols-outlined text-lg leading-none">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-20 right-0 w-full md:w-80 h-[calc(100vh-80px)] bg-[#0d0d0d] border-l border-[#00daf7]/30 p-8 flex flex-col gap-6 lg:hidden backdrop-blur-xl z-[49]"
          >
            <div className="font-mono text-[10px] text-gray-600 mb-4 tracking-[0.4em] uppercase">SYSTEM_NAVIGATION</div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-mono text-2xl tracking-tighter p-4 border-l-4 transition-all ${location.pathname === link.path
                    ? "bg-[#00daf7]/5 border-[#00daf7] text-[#00daf7]"
                    : "border-transparent text-gray-500 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-auto pt-8 border-t border-white/5 font-mono text-[9px] text-[#00daf7] tracking-widest uppercase">
              SYSTEM_STATUS: OPERATIONAL
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
