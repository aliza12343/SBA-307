import { apiClient } from './apiClient'

export const contactApi = {
  submit: (data) => apiClient.post('/contact', data),
}
