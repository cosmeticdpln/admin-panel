import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import axios from 'axios'

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'customer'
}

export interface AuthResponse {
  user: User
  access_token: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('admin_token'))
  const isLoading = ref(false)
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.role === 'editor')

  // Set up axios defaults
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  const login = async (email: string, password: string) => {
    isLoading.value = true
    try {
      const response = await axios.post<AuthResponse>('/api/v1/login', {
        email,
        password
      })

      const result = response.data.data;
      const userData = result.user
      const access_token = result.access_token

      console.log(userData)
      // Check if user has admin or editor role
      if (!['admin', 'editor'].includes(userData.role)) {
        throw new Error('Access denied. Admin or editor role required.')
      }

      user.value = userData
      token.value = access_token
      localStorage.setItem('admin_token', access_token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

      return {success: true}
    } catch (error: any) {
      console.error('Login error:', error)
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed'
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('admin_token')
    delete axios.defaults.headers.common['Authorization']
  }

  const fetchUser = async () => {
    if (!token.value) return

    try {
      const response = await axios.get<User>('/api/v1/user')
      user.value = response.data
    } catch (error) {
      console.error('Failed to fetch user:', error)
      logout()
    }
  }

  const initializeAuth = async () => {
    if (token.value) {
      await fetchUser()
    }
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    fetchUser,
    initializeAuth
  }
})
