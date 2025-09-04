export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Cosmetic Admin Panel',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
}
