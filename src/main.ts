import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

// Configure axios
import { API_CONFIG } from './config/api'

axios.defaults.baseURL = API_CONFIG.baseURL
axios.defaults.timeout = API_CONFIG.timeout
Object.assign(axios.defaults.headers.common, API_CONFIG.headers)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
