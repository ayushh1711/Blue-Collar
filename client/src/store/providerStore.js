import { create } from 'zustand';
import { providerService } from '../services/providerService';

export const useProviderStore = create((set) => ({
  providers: [],
  loading: false,
  error: null,

  fetchProviders: async (filters) => {
    set({ loading: true, error: null });
    try {
      const data = await providerService.getAllProviders(filters);
      set({ providers: data.providers, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateAvailability: async (isAvailable) => {
    set({ loading: true, error: null });
    try {
      await providerService.toggleAvailability(isAvailable);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));
