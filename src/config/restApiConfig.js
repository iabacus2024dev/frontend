export const restApiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: import.meta.env.VITE_API_BASE_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
}
