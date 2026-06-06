import api from './api';
import type { User, LoginInput } from '../types/auth';

export const authService = {
  login: async (input: LoginInput) => {
    const { data } = await api.post<{ success: boolean; user: User }>('/auth/login', input);
    return data.user;
  },

  getMe: async () => {
    const { data } = await api.get<{ success: boolean; user: User | null }>('/auth/me');
    return data.user;
  },

  logout: async () => {
    await api.get('/auth/logout');
  }
};
