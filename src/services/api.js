import axios from 'axios';

// Configure base URL for API calls
const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Report API
export const reportAPI = {
  uploadReport: (formData) => apiClient.post('/reports/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getReportAnalysis: (reportId) => apiClient.get(`/reports/${reportId}/analysis`),
  getRecommendations: (reportId) => apiClient.get(`/reports/${reportId}/recommendations`)
};

// Doctor API
export const doctorAPI = {
  getNearbyDoctors: (params) => apiClient.get('/doctors/nearby', { params }),
  getDoctorById: (doctorId) => apiClient.get(`/doctors/${doctorId}`)
};

export default apiClient;
