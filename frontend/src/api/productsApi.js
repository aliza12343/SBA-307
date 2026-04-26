import { apiClient } from './apiClient'

export const productsApi = {
  getAll: () => apiClient.get('/products'),
  getByCategory: (category) => apiClient.get(`/products?category=${encodeURIComponent(category)}`),
  getById: (id) => apiClient.get(`/products/${id}`),
}
