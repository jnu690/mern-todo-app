import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// Add token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authService = {
  register: (data) => api.post('/auth/register', data).then(r => r.data),
  login:    (data) => api.post('/auth/login', data).then(r => r.data),
  getMe:    ()     => api.get('/auth/me').then(r => r.data),
};

export default api;