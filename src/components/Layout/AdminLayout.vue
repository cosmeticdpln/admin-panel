<template>
  <div class="min-h-screen bg-dark-900">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-dark-800 border-r border-dark-700">
      <div class="flex h-16 items-center px-6 border-b border-dark-700">
        <h1 class="text-xl font-bold text-white">Cosmetic Admin</h1>
      </div>
      
      <nav class="mt-6 px-3">
        <router-link
          to="/"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors"
          :class="$route.path === '/' ? 'bg-primary-600 text-white' : 'text-dark-300 hover:bg-dark-700 hover:text-white'"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
          </svg>
          Dashboard
        </router-link>
        
        <router-link
          to="/magazines"
          class="flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors"
          :class="$route.path.startsWith('/magazines') ? 'bg-primary-600 text-white' : 'text-dark-300 hover:bg-dark-700 hover:text-white'"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
          </svg>
          Magazines
        </router-link>
      </nav>
    </div>

    <!-- Main content -->
    <div class="pl-64">
      <!-- Top bar -->
      <header class="bg-dark-800 border-b border-dark-700">
        <div class="flex h-16 items-center justify-between px-6">
          <div class="flex items-center">
            <button
              @click="toggleSidebar"
              class="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-sm text-dark-300">
              Welcome, {{ authStore.user?.name }}
            </div>
            <button
              @click="handleLogout"
              class="flex items-center px-3 py-2 text-sm text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const toggleSidebar = () => {
  // Implement sidebar toggle if needed
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
