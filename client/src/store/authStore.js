import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  error: null,

  setUser: (user) => set({ user }),

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(credentials);
      if (data.token) localStorage.setItem('token', data.token);
      set({ user: data.user, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  signup: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.signup(userData);
      if (data.token) localStorage.setItem('token', data.token);
      set({ user: data.user, loading: false });
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      set({ user: null });
    } catch (error) {
      localStorage.removeItem('token');
      console.error('Logout error:', error);
    }
  },

  checkAuth: async () => {
    try {
      const data = await authService.getMe();
      set({ user: data.user, checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
    }
  }
}));
