<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-white">مجلات</h1>
        <p class="text-dark-400">مدیریت محتوای مجلات</p>
      </div>
      <router-link
        to="/magazines/create"
        class="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        ایجاد مجله
      </router-link>
    </div>

    <!-- Filters -->
    <div class="bg-dark-800 rounded-lg p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-dark-300 mb-2">جستجو</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="جستجو در مجلات..."
            class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            @input="debouncedSearch"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-dark-300 mb-2">دسته‌بندی</label>
          <select
            v-model="filters.category_id"
            class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            @change="applyFilters"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-dark-300 mb-2">نمایان بودن</label>
          <select
            v-model="filters.is_visible"
            class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            @change="applyFilters"
          >
            <option value="">همه</option>
            <option value="1">نمایان</option>
            <option value="0">مخفی</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading || (authStore.token && !authStore.user)" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-900 border border-red-700 rounded-lg p-4">
      <div class="flex">
        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-200">{{ error }}</h3>
        </div>
      </div>
    </div>

    <!-- Magazines Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="magazine in magazines"
        :key="magazine.id"
        class="bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-dark-600 transition-colors"
      >
        <!-- Featured Image -->
        <div v-if="getFeaturedImageUrl(magazine)" class="h-48 bg-dark-700 overflow-hidden">
          <img 
            :src="getFeaturedImageUrl(magazine)" 
            :alt="magazine.title"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-else class="h-48 bg-dark-700 flex items-center justify-center">
          <svg class="w-12 h-12 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>

        <div class="p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white mb-2">{{ magazine.title }}</h3>
              <p class="text-dark-400 text-sm mb-4 line-clamp-2">{{ magazine.excerpt }}</p>
              
              <div class="flex items-center space-x-4 text-sm text-dark-500">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  {{ magazine.category?.name || 'بدون دسته‌بندی' }}
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  {{ magazine.sections?.length || 0 }} بخش
                </span>
              </div>
            </div>
            
            <div class="flex items-center space-x-2 ml-4">
              <span
                v-if="magazine.is_featured"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-200"
              >
                ویژه
              </span>
              <span
                :class="magazine.is_visible ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ magazine.is_visible ? 'نمایان' : 'مخفی' }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 bg-dark-700 border-t border-dark-600 flex items-center justify-between">
          <div class="text-sm text-dark-400">
            {{ formatDate(magazine.created_at || '') }}
          </div>
          <div class="flex items-center space-x-2">
            <router-link
              :to="`/magazines/${magazine.id}/edit`"
              class="text-primary-400 hover:text-primary-300 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </router-link>
            <button
              @click="handleDelete(magazine.id!)"
              class="text-red-400 hover:text-red-300 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!isLoading && !error && magazines.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-dark-400">هیچ مجله‌ای یافت نشد</h3>
      <p class="mt-1 text-sm text-dark-500">با ایجاد مجله جدید شروع کنید.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMagazineStore } from '@/stores/magazine'
import { useAuthStore } from '@/stores/auth'
import { useDebounceFn } from '@vueuse/core'

const router = useRouter()
const magazineStore = useMagazineStore()
const authStore = useAuthStore()

const { magazines, categories, isLoading, error, fetchMagazines, fetchCategories, deleteMagazine } = magazineStore

const filters = reactive({
  search: '',
  category_id: '',
  is_visible: ''
})

const debouncedSearch = useDebounceFn(() => {
  applyFilters()
}, 500)

// Watch for authentication changes and reload data
watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated && magazines.length === 0) {
    console.log('Authentication state changed, reloading data...')
    fetchMagazines()
    fetchCategories()
  }
})

const applyFilters = () => {
  const params: Record<string, any> = {}
  if (filters.search) params.search = filters.search
  if (filters.category_id) params.category_id = filters.category_id
  if (filters.is_visible !== '') params.is_visible = filters.is_visible === '1'
  
  fetchMagazines(params)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const getFeaturedImageUrl = (magazine: any) => {
  if (magazine.media && magazine.media.length > 0) {
    const featuredMedia = magazine.media.find((m: any) => (m.collection_name || m.collection) === 'magazine-images')
    if (featuredMedia) {
      return featuredMedia.original_url || featuredMedia.preview_url || featuredMedia.url || null
    }
  }
  return null
}

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this magazine?')) {
    try {
      await deleteMagazine(id)
    } catch (err) {
      console.error('Failed to delete magazine:', err)
    }
  }
}

onMounted(async () => {
  console.log('MagazineListView mounted, checking auth and loading data...')
  
  // Ensure authentication is initialized
  if (authStore.token && !authStore.user) {
    console.log('Initializing auth...')
    await authStore.initializeAuth()
  }
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    console.log('User not authenticated, redirecting to login')
    router.push('/login')
    return
  }
  
  try {
    console.log('Loading magazines and categories...')
    await Promise.all([
      fetchMagazines(),
      fetchCategories()
    ])
    console.log('Data loaded successfully:', { 
      magazinesCount: magazines.length, 
      categoriesCount: categories.length 
    })
  } catch (error) {
    console.error('Error loading data on mount:', error)
  }
})
</script>
