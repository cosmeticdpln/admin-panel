<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center space-x-4">
      <router-link
        to="/magazines"
        class="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </router-link>
      <div>
        <h1 class="text-2xl font-bold text-white">Create Magazine</h1>
        <p class="text-dark-400">Add a new magazine to your collection</p>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="bg-red-900 border border-red-700 rounded-lg p-4">
      <div class="flex">
        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-200">{{ error }}</h3>
        </div>
      </div>
    </div>

    <!-- Form -->
    <MagazineForm
      :is-edit="false"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMagazineStore, type Magazine } from '@/stores/magazine'
import MagazineForm from '@/components/MagazineForm.vue'

const router = useRouter()
const magazineStore = useMagazineStore()
const { createMagazine } = magazineStore

const error = ref('')

const handleSubmit = async (data: Partial<Magazine>) => {
  try {
    await createMagazine(data)
    router.push('/magazines')
  } catch (err: any) {
    error.value = err.message || 'Failed to create magazine'
  }
}
</script>
