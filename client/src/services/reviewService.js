import api from './api';

export const reviewService = {
  createReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  getProviderReviews: async (providerId) => {
    const response = await api.get(`/reviews/provider/${providerId}`);
    return response.data;
  }
};