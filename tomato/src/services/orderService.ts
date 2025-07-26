import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface Order {
  id: number;
  order_id: string;
  user_id: number;
  restaurant_id: number;
  total_amount: number;
  status: string;
  delivery_address: string;
  created_at: string;
  updated_at: string;
  user_name: string;
  restaurant_name: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  menu_item_id: number;
  quantity: number;
  price_at_time: number;
  name: string;
}

export const orderService = {
  // Fetch all orders with optional filters
  async getOrders(filters: {
    status?: string;
    startDate?: string;
    endDate?: string;
  } = {}) {
    try {
      const response = await axios.get(`${API_URL}/admin/orders`, { 
        params: filters,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Fetch order details by ID
  async getOrderById(orderId: number) {
    try {
      const response = await axios.get(`${API_URL}/admin/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  // Update order status
  async updateOrderStatus(orderId: number, status: string) {
    try {
      const response = await axios.put(
        `${API_URL}/admin/orders/${orderId}/status`, 
        { status },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get analytics data
  async getAnalytics(filters: {
    startDate?: string;
    endDate?: string;
  } = {}) {
    try {
      const response = await axios.get(`${API_URL}/admin/analytics`, { 
        params: filters,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
}; 