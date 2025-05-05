const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/events`,
  EVENT: (id) => `${API_BASE_URL}/events/${id}`,
  UPLOAD: `${API_BASE_URL}/upload`,
};

export default API_BASE_URL; 