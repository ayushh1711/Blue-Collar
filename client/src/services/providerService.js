import api from './api';

export const providerService = {
  getAllProviders: async (filters) => {
    const response = await api.get('/providers', { params: filters });
    return response.data;
  },

  getProviderById: async (id) => {
    const response = await api.get(`/providers/${id}`);
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.patch('/providers/profile', profileData);
    return response.data;
  },

  toggleAvailability: async (isAvailable) => {
    const response = await api.patch('/providers/availability', { isAvailable });
    return response.data;
  },

  updateLocation: async (lat, long) => {
    const response = await api.patch('/providers/location', { lat, long });
    return response.data;
  }
};
