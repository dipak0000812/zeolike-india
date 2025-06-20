import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/auth/users');
    return response.data;
  },

  toggleUserStatus: async (id, isActive) => {
    const response = await api.put(`/auth/users/${id}/status`, { isActive });
    return response.data;
  },
};

// Listings API
export const listingsAPI = {
  getAll: async (params) => {
    const response = await api.get('/listings', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  },

  create: async (listingData) => {
    const response = await api.post('/listings', listingData);
    return response.data;
  },

  update: async (id, listingData) => {
    const response = await api.put(`/listings/${id}`, listingData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/listings/${id}`);
    return response.data;
  },

  toggleVerification: async (id, verified) => {
    const response = await api.put(`/listings/${id}/verify`, { verified });
    return response.data;
  },
};

// Favorites API
export const favoritesAPI = {
  addFavorite: async (listingId, userId) => {
    const response = await api.post('/favorites', { listingId, userId });
    return response.data;
  },
  removeFavorite: async (favoriteId) => {
    const response = await api.delete(`/favorites/${favoriteId}`);
    return response.data;
  },
  getFavoritesByUserId: async (userId) => {
    const response = await api.get(`/favorites/user/${userId}`);
    return response.data;
  },
};

export default api; 