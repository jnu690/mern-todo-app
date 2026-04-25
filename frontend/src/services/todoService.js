import api from './authService';

export const todoService = {
  getAll:     ()         => api.get('/todos').then(r => r.data.data),
  create:     (data)     => api.post('/todos', data).then(r => r.data.data),
  update:     (id, data) => api.put(`/todos/${id}`, data).then(r => r.data.data),
  toggleDone: (id)       => api.patch(`/todos/${id}/done`).then(r => r.data.data),
  delete:     (id)       => api.delete(`/todos/${id}`),
};