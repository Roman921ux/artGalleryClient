import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://8a42-95-153-133-136.ngrok-free.app/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
});

export const domian = 'https://8a42-95-153-133-136.ngrok-free.app'
export default instance