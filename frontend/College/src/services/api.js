import axios from 'axios';
import { API_ENDPOINTS } from '../config';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_ENDPOINTS.EVENTS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Event API calls
export const eventService = {
  // Get all events
  getAllEvents: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single event
  getEvent: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create event
  createEvent: async (formData) => {
    try {
      const response = await api.post('/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update event
  updateEvent: async (id, formData) => {
    try {
      const response = await api.put(`/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete event
  deleteEvent: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api; 