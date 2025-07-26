import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  rating: number;
  delivery_time: string;
  min_order: number;
  delivery_fee: number;
  image_url: string;
  cuisines: string[];
  is_open: boolean;
  offers: Offer[];
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order: number;
  valid_until: string;
}

export interface Review {
  id: number;
  user_id: number;
  restaurant_id: number;
  rating: number;
  comment: string;
  created_at: string;
  user_name: string;
  user_image: string;
}

export interface Tracking {
  order_id: number;
  status: string;
  estimated_delivery_time: string;
  current_location: {
    lat: number;
    lng: number;
  };
  delivery_partner: {
    id: number;
    name: string;
    phone: string;
    image_url: string;
  };
}

export const advancedFeatures = {
  // Restaurant Features
  async getRestaurants(filters: {
    cuisine?: string;
    rating?: number;
    delivery_time?: number;
    min_order?: number;
    sort_by?: 'rating' | 'delivery_time' | 'min_order';
  } = {}) {
    try {
      const response = await axios.get(`${API_URL}/restaurants`, { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  },

  async getRestaurantDetails(restaurantId: number) {
    try {
      const response = await axios.get(`${API_URL}/restaurants/${restaurantId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      throw error;
    }
  },

  // Reviews and Ratings
  async getRestaurantReviews(restaurantId: number) {
    try {
      const response = await axios.get(`${API_URL}/restaurants/${restaurantId}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  async addReview(restaurantId: number, review: {
    rating: number;
    comment: string;
  }) {
    try {
      const response = await axios.post(
        `${API_URL}/restaurants/${restaurantId}/reviews`,
        review,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },

  // Offers and Discounts
  async getAvailableOffers() {
    try {
      const response = await axios.get(`${API_URL}/offers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching offers:', error);
      throw error;
    }
  },

  async applyOffer(orderId: number, offerCode: string) {
    try {
      const response = await axios.post(
        `${API_URL}/orders/${orderId}/apply-offer`,
        { offer_code: offerCode },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error applying offer:', error);
      throw error;
    }
  },

  // Live Tracking
  async getOrderTracking(orderId: number) {
    try {
      const response = await axios.get(`${API_URL}/orders/${orderId}/tracking`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tracking:', error);
      throw error;
    }
  },

  // Search and Filters
  async searchRestaurants(query: string) {
    try {
      const response = await axios.get(`${API_URL}/search/restaurants`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching restaurants:', error);
      throw error;
    }
  },

  async getPopularCuisines() {
    try {
      const response = await axios.get(`${API_URL}/cuisines/popular`);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular cuisines:', error);
      throw error;
    }
  },

  // Recommendations
  async getPersonalizedRecommendations() {
    try {
      const response = await axios.get(`${API_URL}/recommendations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  }
}; 