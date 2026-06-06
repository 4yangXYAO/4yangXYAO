import api from "./api";
import type { Message, CreateMessageInput } from "../types/message";

export const messageService = {
  getAll: async () => {
    const { data } = await api.get<{ success: boolean; data: Message[] }>(
      "/messages",
    );
    return data.data;
  },

  create: async (input: CreateMessageInput) => {
    const { data } = await api.post<{ success: boolean; data: Message }>(
      "/messages",
      input,
    );
    return data.data;
  },

  markAsRead: async (id: string) => {
    const { data } = await api.patch<{ success: boolean; data: Message }>(
      `/messages/${id}/read`,
    );
    return data.data;
  },

  delete: async (id: string) => {
    await api.delete(`/messages/${id}`);
  },
};
