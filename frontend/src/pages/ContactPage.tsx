import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { messageService } from "../services/messageService";
import { profileService } from "../services/profileService";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.get(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await messageService.create(data as import("../types/message").CreateMessageInput);
      toast.success("TRANSMISSION_SUCCESSFUL", {
        style: { background: "#121212", color: "#00daf7", border: "1px solid #00daf733" },
      });
      reset();
    } catch (err) {
      toast.error("TRANSMISSION_FAILED");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="section-spacing min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00daf7]/10 border border-[#00daf7]/30 mb-6">
            <span className="w-1.5 h-1.5 bg-[#00daf7] rounded-full animate-pulse"></span>
            <span className="font-mono text-[10px] text-[#00daf7] tracking-widest uppercase">
              SYSTEM_STATUS: READY_FOR_INPUT
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white uppercase tracking-tighter leading-none mb-8">
            LET'S BUILD <br /> <span className="text-[#00daf7]">THE FUTURE</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="relative p-2 border border-[#00daf7]/20 bg-[#121212]/30">
               <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00daf7]" />
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00daf7]" />
               
               <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="material-symbols-outlined text-[#00daf7]">mail</span>
                    <span className="font-mono text-xs text-[#00daf7] tracking-[0.3em] uppercase">
                      TRANSMISSION_PROTOCOL
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                      IDENTIFIER [NAME]
                    </label>
                    <input
                      {...register("name")}
                      placeholder="GUEST_USER"
                      className="w-full bg-white/5 border-b-2 border-white/10 px-0 py-4 font-mono text-sm text-white focus:border-[#00daf7] focus:outline-none transition-all placeholder:text-gray-700 uppercase"
                    />
                    {errors.name && <p className="text-[#ff3e3e] font-mono text-[10px] mt-2">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                      COMM_CHANNEL [EMAIL]
                    </label>
                    <input
                      {...register("email")}
                      placeholder="USER@NETWORK.SYS"
                      className="w-full bg-white/5 border-b-2 border-white/10 px-0 py-4 font-mono text-sm text-white focus:border-[#00daf7] focus:outline-none transition-all placeholder:text-gray-700 uppercase"
                    />
                    {errors.email && <p className="text-[#ff3e3e] font-mono text-[10px] mt-2">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                      PROJECT_PROTOCOL [BRIEF]
                    </label>
                    <textarea
                      {...register("message")}
                      placeholder="DESCRIBE_THE_MISSION..."
                      rows={4}
                      className="w-full bg-white/5 border-b-2 border-white/10 px-0 py-4 font-mono text-sm text-white focus:border-[#00daf7] focus:outline-none transition-all placeholder:text-gray-700 resize-none uppercase"
                    />
                    {errors.message && <p className="text-[#ff3e3e] font-mono text-[10px] mt-2">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-transparent border-2 border-[#00daf7] text-[#00daf7] font-mono text-sm tracking-[0.4em] hover:bg-[#00daf7] hover:text-[#0d0d0d] transition-all duration-300 flex items-center justify-center gap-4 group"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "EXECUTE_SEND"}
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">send</span>
                  </button>
               </form>
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="relative p-8 border border-white/5 bg-[#121212]/50">
               <div className="flex items-center gap-4 mb-8">
                 <span className="material-symbols-outlined text-[#00daf7]">hub</span>
                 <span className="font-mono text-xs text-[#00daf7] tracking-[0.3em] uppercase">
                   NETWORK_NODES
                 </span>
               </div>
               
               <div className="space-y-4">
                  {[
                    { name: "WHATSAPP", url: profile?.socialLinks?.whatsapp || "62895330107704", icon: "perm_phone_msg" },
                    { name: "GITHUB", url: profile?.socialLinks?.github || "https://github.com/4yangXYAO", icon: "code" },
                    { name: "LINKEDIN", url: profile?.socialLinks?.linkedin || "#", icon: "person" }
                  ].map((node) => (
                    <a
                      key={node.name}
                      href={node.url.startsWith("http") ? node.url : (node.name === "WHATSAPP" ? `https://wa.me/${node.url}` : node.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-[#00daf7]/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#00daf7]/50 text-sm group-hover:text-[#00daf7]">{node.icon}</span>
                        <span className="font-mono text-xs text-white/60 group-hover:text-white uppercase tracking-widest">{node.name}</span>
                      </div>
                      <span className="material-symbols-outlined text-[#00daf7] text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                    </a>
                  ))}
               </div>
            </div>

            <div className="relative aspect-video overflow-hidden border border-white/5 group">
               <img 
                 src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                 alt="datacentre" 
                 className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-1000" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#00daf7]/5 backdrop-blur-md border border-[#00daf7]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 bg-[#00daf7] rounded-full shadow-[0_0_5px_#00daf7]"></span>
                    <span className="font-mono text-[9px] text-[#00daf7] tracking-widest uppercase">CONNECTION_SECURED</span>
                  </div>
                  <h3 className="text-white font-display font-bold text-lg mb-1 uppercase">High-Performance Connection</h3>
                  <p className="font-mono text-[9px] text-gray-500 uppercase tracking-tighter">
                    Latency: 14ms | Uplink: Active | Location: Global_Hub
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
