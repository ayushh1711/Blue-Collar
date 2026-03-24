import { create } from 'zustand';
import { bookingService } from '../services/bookingService';

export const useBookingStore = create((set) => ({
  bookings: [],
  loading: false,
  error: null,

  fetchBookings: async (status) => {
    set({ loading: true, error: null });
    try {
      const data = await bookingService.getBookings(status);
      set({ bookings: data.bookings, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createBooking: async (bookingData) => {
    set({ loading: true, error: null });
    try {
      const data = await bookingService.createBooking(bookingData);
      set((state) => ({
        bookings: [data.booking, ...state.bookings],
        loading: false
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));
