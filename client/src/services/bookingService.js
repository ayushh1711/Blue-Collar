import api from './api';

export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getBookings: async (status) => {
    const response = await api.get('/bookings', { params: { status } });
    return response.data;
  },

  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  acceptBooking: async (id) => {
    const response = await api.patch(`/bookings/${id}/accept`);
    return response.data;
  },

  rejectBooking: async (id) => {
    const response = await api.patch(`/bookings/${id}/reject`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },

  cancelBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};
