import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://art-gallery-server-eight.vercel.app/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
});

export const domian = 'https://art-gallery-server-eight.vercel.app'
export default instance