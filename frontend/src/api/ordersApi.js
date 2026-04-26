import { apiClient } from './apiClient'

export const ordersApi = {
  create: (order) => apiClient.post('/orders', order),
  getAll: () => apiClient.get('/orders'),
  getById: (id) => apiClient.get(`/orders/${id}`),
}
