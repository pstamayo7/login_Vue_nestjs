import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

// Interceptor para añadir el token a todas las peticiones
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

createApp(App).mount('#app')
