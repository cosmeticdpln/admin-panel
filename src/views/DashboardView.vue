<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="bg-gradient-to-r from-primary-600/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p class="text-dark-300 text-lg">Welcome to the Cosmetic Magazine Admin Panel</p>
        </div>
        <div class="hidden md:block">
          <div class="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl p-6 border border-dark-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark-300 mb-1">Total Magazines</p>
            <p class="text-3xl font-bold text-white">{{ stats.totalMagazines }}</p>
            <p class="text-xs text-dark-400 mt-1">All magazines</p>
          </div>
          <div class="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl p-6 border border-dark-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark-300 mb-1">Published</p>
            <p class="text-3xl font-bold text-white">{{ stats.publishedMagazines }}</p>
            <p class="text-xs text-dark-400 mt-1">Live magazines</p>
          </div>
          <div class="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl p-6 border border-dark-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark-300 mb-1">Featured</p>
            <p class="text-3xl font-bold text-white">{{ stats.featuredMagazines }}</p>
            <p class="text-xs text-dark-400 mt-1">Highlighted</p>
          </div>
          <div class="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl p-6 border border-dark-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-dark-300 mb-1">Total Sections</p>
            <p class="text-3xl font-bold text-white">{{ stats.totalSections }}</p>
            <p class="text-xs text-dark-400 mt-1">Content sections</p>
          </div>
          <div class="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Magazines -->
    <div class="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl border border-dark-700/50 shadow-xl">
      <div class="px-8 py-6 border-b border-dark-700/50">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-white">Recent Magazines</h2>
            <p class="text-dark-400 mt-1">Latest magazine content</p>
          </div>
          <router-link
            to="/magazines"
            class="inline-flex items-center px-4 py-2 bg-primary-600/20 text-primary-400 hover:text-primary-300 hover:bg-primary-600/30 text-sm font-medium rounded-xl transition-all duration-200 border border-primary-500/30"
          >
            View all
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>
      </div>
      
      <div v-if="isLoading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
      </div>
      
      <div v-else-if="recentMagazines.length === 0" class="px-6 py-8 text-center text-dark-500">
        <p>No magazines found. <router-link to="/magazines/create" class="text-primary-400 hover:text-primary-300">Create your first magazine</router-link></p>
      </div>
      
      <div v-else class="divide-y divide-dark-700/50">
        <div
          v-for="magazine in recentMagazines"
          :key="magazine.id"
          class="px-8 py-6 hover:bg-dark-700/30 transition-all duration-200 group"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">{{ magazine.title }}</h3>
                <span
                  :class="magazine.is_visible ? 'bg-green-900/50 text-green-300 border-green-700/50' : 'bg-red-900/50 text-red-300 border-red-700/50'"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                >
                  {{ magazine.is_visible ? 'Visible' : 'Hidden' }}
                </span>
                <span v-if="magazine.is_featured" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-300 border border-yellow-700/50">
                  Featured
                </span>
              </div>
              <p class="text-dark-300 mb-3 line-clamp-2">{{ magazine.excerpt }}</p>
              <div class="flex items-center space-x-6 text-sm text-dark-400">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  {{ magazine.category?.name || 'No Category' }}
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ formatDate(magazine.created_at!) }}
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  {{ magazine.sections?.length || 0 }} sections
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-3 ml-6">
              <router-link
                :to="`/magazines/${magazine.id}/edit`"
                class="p-2 text-dark-400 hover:text-primary-400 hover:bg-primary-600/20 rounded-lg transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl border border-dark-700/50 shadow-xl p-8">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-white mb-2">Quick Actions</h2>
        <p class="text-dark-400">Get things done faster</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          to="/magazines/create"
          class="group flex items-center p-6 bg-gradient-to-br from-dark-700/50 to-dark-800/50 rounded-xl hover:from-primary-600/20 hover:to-primary-700/20 transition-all duration-300 border border-dark-600/50 hover:border-primary-500/50 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">Create Magazine</h3>
            <p class="text-sm text-dark-400 group-hover:text-dark-300">Add a new magazine</p>
          </div>
        </router-link>

        <router-link
          to="/magazines"
          class="group flex items-center p-6 bg-gradient-to-br from-dark-700/50 to-dark-800/50 rounded-xl hover:from-green-600/20 hover:to-green-700/20 transition-all duration-300 border border-dark-600/50 hover:border-green-500/50 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white group-hover:text-green-300 transition-colors">Manage Magazines</h3>
            <p class="text-sm text-dark-400 group-hover:text-dark-300">View and edit magazines</p>
          </div>
        </router-link>

        <div class="group flex items-center p-6 bg-gradient-to-br from-dark-700/50 to-dark-800/50 rounded-xl border border-dark-600/50 opacity-75">
          <div class="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white">Analytics</h3>
            <p class="text-sm text-dark-400">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMagazineStore } from '@/stores/magazine'

const magazineStore = useMagazineStore()
const { magazines, isLoading, fetchMagazines } = magazineStore

const recentMagazines = computed(() => magazines.slice(0, 5))

const stats = computed(() => ({
  totalMagazines: magazines.length,
  publishedMagazines: magazines.filter(m => m.is_visible).length,
  featuredMagazines: magazines.filter(m => m.is_featured).length,
  totalSections: magazines.reduce((total, m) => total + (m.sections?.length || 0), 0)
}))

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(async () => {
  await fetchMagazines()
})
</script>
