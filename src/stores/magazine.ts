import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface MagazineSection {
  id?: number
  title: string
  content: string
  content_type: 'text' | 'html' | 'markdown'
  sort_order: number
  products?: MagazineSectionProduct[]
}

export interface MagazineSectionProduct {
  product_id: number
  title?: string
  description?: string
  sort_order: number
}

export interface Magazine {
  id?: number
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  is_visible: boolean
  is_featured: boolean
  is_offerable: boolean
  sort_order: number
  magazine_category_id?: number
  meta_data?: Record<string, any>
  published_at?: string
  sections?: MagazineSection[]
  category?: {
    id: number
    name: string
    slug: string
  }
  created_at?: string
  updated_at?: string
}

export interface MagazineCategory {
  id: number
  name: string
  slug: string
}

export interface Product {
  id: number
  name: string
  slug: string
  price: number
}

export const useMagazineStore = defineStore('magazine', () => {
  const magazines = ref<Magazine[]>([])
  const categories = ref<MagazineCategory[]>([])
  const products = ref<Product[]>([])
  const currentMagazine = ref<Magazine | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchMagazines = async (params: Record<string, any> = {}) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get('/api/v1/admin/magazines', { params })
      magazines.value = response.data.data || response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch magazines'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchMagazine = async (id: number) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get(`/api/v1/admin/magazines/${id}`)
      currentMagazine.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch magazine'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const createMagazine = async (magazineData: Partial<Magazine>) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.post('/api/v1/admin/magazines', magazineData)
      const newMagazine = response.data
      magazines.value.unshift(newMagazine)
      return newMagazine
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create magazine'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateMagazine = async (id: number, magazineData: Partial<Magazine>) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.put(`/api/v1/admin/magazines/${id}`, magazineData)
      const updatedMagazine = response.data
      const index = magazines.value.findIndex(m => m.id === id)
      if (index !== -1) {
        magazines.value[index] = updatedMagazine
      }
      if (currentMagazine.value?.id === id) {
        currentMagazine.value = updatedMagazine
      }
      return updatedMagazine
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update magazine'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteMagazine = async (id: number) => {
    isLoading.value = true
    error.value = null
    try {
      await axios.delete(`/api/v1/admin/magazines/${id}`)
      magazines.value = magazines.value.filter(m => m.id !== id)
      if (currentMagazine.value?.id === id) {
        currentMagazine.value = null
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete magazine'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/v1/admin/magazines/0/categories')
      categories.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch categories'
      throw err
    }
  }

  const fetchProducts = async (search: string = '') => {
    try {
      const response = await axios.get('/api/v1/admin/magazines/0/products', {
        params: { search }
      })
      products.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch products'
      throw err
    }
  }

  return {
    magazines,
    categories,
    products,
    currentMagazine,
    isLoading,
    error,
    fetchMagazines,
    fetchMagazine,
    createMagazine,
    updateMagazine,
    deleteMagazine,
    fetchCategories,
    fetchProducts
  }
})
