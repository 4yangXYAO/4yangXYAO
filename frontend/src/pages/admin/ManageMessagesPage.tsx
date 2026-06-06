import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { messageService } from "../../services/messageService";
import { PageLoader } from "../../components/common/PageLoader";
import { Button } from "../../components/common/Button";

export const ManageMessagesPage = () => {
  const {
    data: messages = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["messages-admin"],
    queryFn: () => messageService.getAll(),
  });

  const readMutation = useMutation({
    mutationFn: (id: string) => messageService.markAsRead(id),
    onSuccess: () => refetch(),
    onError: () => toast.error("Failed to mark as read"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => messageService.delete(id),
    onSuccess: () => {
      toast.success("Message deleted");
      refetch();
    },
    onError: () => toast.error("Failed to delete message"),
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete message from "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-500">Inbound inquiries from your contact form.</p>
      </motion.div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <motion.div
                key={msg._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`p-6 rounded-3xl transition-all duration-300 border ${
                  msg.isRead
                    ? "bg-white border-gray-100 opacity-80"
                    : "bg-white border-indigo-200 shadow-lg shadow-indigo-600/5 ring-1 ring-indigo-50"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                      msg.isRead ? "bg-gray-100 text-gray-400" : "bg-indigo-100 text-indigo-600"
                    }`}>
                      {msg.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        {msg.name}
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">{msg.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end md:self-start">
                    {!msg.isRead && (
                      <Button
                        onClick={() => readMutation.mutate(msg._id)}
                        size="sm"
                        variant="outline"
                        className="h-10 px-4"
                        disabled={readMutation.isPending}
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(msg._id, msg.name)}
                      size="sm"
                      variant="danger"
                      className="h-10 px-4"
                      disabled={deleteMutation.isPending}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50/50 p-4 rounded-2xl">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap italic">
                    "{msg.message}"
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>📅</span>
                  {new Date(msg.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-5xl mb-4">📭</p>
              <h3 className="text-xl font-bold text-gray-900">No messages yet</h3>
              <p className="text-gray-500">Your inbox is clean!</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
