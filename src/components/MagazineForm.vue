<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="bg-dark-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-white mb-4">اطلاعات پایه</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-dark-300 mb-2">عنوان *</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="عنوان مجله را وارد کنید"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-dark-300 mb-2">نامک</label>
          <input
            v-model="form.slug"
            type="text"
            class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="magazine-slug"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-dark-300 mb-2">دسته‌بندی</label>
          <select
            v-model="form.magazine_category_id"
            class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">انتخاب دسته‌بندی</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-dark-300 mb-2">خلاصه</label>
          <textarea
            v-model="form.excerpt"
            rows="3"
            class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="توضیح کوتاه مجله"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="bg-dark-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-white mb-4">محتوا</h3>
      <div>
        <label class="block text-sm font-medium text-dark-300 mb-2">محتوای اصلی *</label>
        <div class="quill-editor-dark">
          <div class="mb-2 flex gap-2">
            <button
              type="button"
              @click="handleImageUpload"
              class="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              آپلود تصویر
            </button>
          </div>
          <QuillEditor
            v-model:content="form.content"
            contentType="html"
            theme="snow"
            :toolbar="toolbarConfig"
            class="min-h-[300px]"
          />
        </div>
      </div>
    </div>

    <!-- Settings -->
    <div class="bg-dark-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-white mb-4">تنظیمات</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <label class="flex items-center">
            <input
              v-model="form.is_visible"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-600 rounded bg-dark-700"
            />
            <span class="ml-2 text-sm text-dark-300">قابل مشاهده برای عموم</span>
          </label>
          
          <label class="flex items-center">
            <input
              v-model="form.is_featured"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-600 rounded bg-dark-700"
            />
            <span class="ml-2 text-sm text-dark-300">مجله ویژه</span>
          </label>
          
          <label class="flex items-center">
            <input
              v-model="form.is_offerable"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-600 rounded bg-dark-700"
            />
            <span class="ml-2 text-sm text-dark-300">قابل پیشنهاد</span>
          </label>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-dark-300 mb-2">ترتیب نمایش</label>
            <input
              v-model.number="form.sort_order"
              type="number"
              min="0"
              class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-dark-300 mb-2">تاریخ انتشار</label>
            <input
              v-model="form.published_at"
              type="datetime-local"
              class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Sections -->
    <div class="bg-dark-800 rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-white">بخش‌ها</h3>
        <button
          type="button"
          @click="addSection"
          class="inline-flex items-center px-3 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          افزودن بخش
        </button>
      </div>
      
      <div v-if="form.sections.length === 0" class="text-center py-8 text-dark-500">
        <p>هنوز بخشی اضافه نشده است. برای شروع روی "افزودن بخش" کلیک کنید.</p>
      </div>
      
      <div v-else class="space-y-4">
        <div
          v-for="(section, index) in form.sections"
          :key="index"
          class="border border-dark-600 rounded-lg p-4"
        >
          <div class="flex justify-between items-start mb-4">
            <h4 class="text-md font-medium text-white">بخش {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeSection(index)"
              class="text-red-400 hover:text-red-300 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-dark-300 mb-2">عنوان بخش *</label>
              <input
                v-model="section.title"
                type="text"
                required
                class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="عنوان بخش را وارد کنید"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-dark-300 mb-2">نوع محتوا</label>
              <select
                v-model="section.content_type"
                class="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="text">متن</option>
                <option value="html">HTML</option>
                <option value="markdown">Markdown</option>
              </select>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-dark-300 mb-2">محتوای بخش *</label>
            <div class="quill-editor-dark">
              <div class="mb-2 flex gap-2">
                <button
                  type="button"
                  @click="handleImageUpload"
                  class="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Upload Image
                </button>
              </div>
              <QuillEditor
                v-model:content="section.content"
                contentType="html"
                theme="snow"
                :toolbar="toolbarConfig"
                class="min-h-[200px]"
              />
            </div>
          </div>
          
          <div class="flex justify-between items-center">
            <div>
              <label class="block text-sm font-medium text-dark-300 mb-2">Sort Order</label>
              <input
                v-model.number="section.sort_order"
                type="number"
                min="0"
                class="w-24 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <button
              type="button"
              @click="toggleProductsSection(index)"
              class="inline-flex items-center px-3 py-2 bg-dark-700 text-white text-sm font-medium rounded-lg hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              {{ section.showProducts ? 'Hide' : 'Manage' }} Products
            </button>
          </div>
          
          <!-- Products Section -->
          <div v-if="section.showProducts" class="mt-4 pt-4 border-t border-dark-600">
            <div class="flex justify-between items-center mb-4">
              <h5 class="text-sm font-medium text-white">محصولات در این بخش</h5>
              <button
                type="button"
                @click="addProductToSection(index)"
                class="inline-flex items-center px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                افزودن محصول
              </button>
            </div>
            
            <div v-if="section.products && section.products.length > 0" class="space-y-2">
              <div
                v-for="(product, productIndex) in section.products"
                :key="productIndex"
                class="flex items-center space-x-2 p-2 bg-dark-700 rounded"
              >
                <select
                  v-model="product.product_id"
                  class="flex-1 px-3 py-2 bg-dark-600 border border-dark-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">انتخاب محصول</option>
                  <option v-for="productOption in products" :key="productOption.id" :value="productOption.id">
                    {{ productOption.name }}
                  </option>
                </select>
                <input
                  v-model="product.title"
                  type="text"
                  placeholder="عنوان سفارشی"
                  class="flex-1 px-3 py-2 bg-dark-600 border border-dark-500 rounded text-white text-sm placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  v-model.number="product.sort_order"
                  type="number"
                  min="0"
                  placeholder="ترتیب"
                  class="w-20 px-3 py-2 bg-dark-600 border border-dark-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  @click="removeProductFromSection(index, productIndex)"
                  class="text-red-400 hover:text-red-300"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-else class="text-center py-4 text-dark-500 text-sm">
              هنوز محصولی به این بخش اضافه نشده است.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end space-x-4">
      <router-link
        to="/magazines"
        class="px-6 py-2 border border-dark-600 text-dark-300 rounded-lg hover:bg-dark-700 transition-colors"
      >
        انصراف
      </router-link>
      <button
        type="submit"
        :disabled="isLoading"
        class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {{ isLoading ? 'در حال ذخیره...' : (isEdit ? 'به‌روزرسانی' : 'ایجاد') }} مجله
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useMagazineStore, type Magazine, type MagazineSection } from '@/stores/magazine'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

interface Props {
  magazine?: Magazine
  isEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false
})

const emit = defineEmits<{
  submit: [data: Partial<Magazine>]
}>()

const magazineStore = useMagazineStore()
const authStore = useAuthStore()
const { categories, products, fetchCategories, fetchProducts } = magazineStore

const isLoading = ref(false)

const form = reactive<Partial<Magazine>>({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featured_image: '',
  is_visible: true,
  is_featured: false,
  is_offerable: false,
  sort_order: 0,
  magazine_category_id: undefined,
  meta_data: {},
  published_at: '',
  sections: []
})


// Quill Configuration
const toolbarConfig = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],
  ['link']
]

// Custom image upload handler
const handleImageUpload = async () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()
  
  input.onchange = async function() {
    const file = (this as HTMLInputElement).files?.[0]
    if (file) {
      try {
        const formData = new FormData()
        formData.append('image', file)
        
        const response = await axios.post('/api/v1/admin/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authStore.token}`
          }
        })
        
        if (response.data.success) {
          // Insert image into editor
          const imageUrl = response.data.url
          const editor = document.querySelector('.ql-editor') as HTMLElement
          if (editor) {
            const img = document.createElement('img')
            img.src = imageUrl
            img.style.maxWidth = '100%'
            img.style.height = 'auto'
            img.style.borderRadius = '8px'
            img.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            editor.appendChild(img)
          }
        } else {
          alert('Image upload failed')
        }
      } catch (error) {
        console.error('Image upload failed:', error)
        alert('Image upload failed: ' + error)
      }
    }
  }
}



// Initialize form with magazine data if editing
watch(() => props.magazine, (magazine) => {
  if (magazine) {
    Object.assign(form, {
      ...magazine,
      sections: magazine.sections?.map(section => ({
        ...section,
        showProducts: false,
        products: section.products || []
      })) || []
    })
  }
}, { immediate: true })

const addSection = () => {
  form.sections!.push({
    title: '',
    content: '',
    content_type: 'text',
    sort_order: form.sections!.length,
    showProducts: false,
    products: []
  })
}

const removeSection = (index: number) => {
  form.sections!.splice(index, 1)
}

const toggleProductsSection = (index: number) => {
  form.sections![index].showProducts = !form.sections![index].showProducts
}

const addProductToSection = (sectionIndex: number) => {
  if (!form.sections![sectionIndex].products) {
    form.sections![sectionIndex].products = []
  }
  form.sections![sectionIndex].products!.push({
    product_id: 0,
    title: '',
    description: '',
    sort_order: form.sections![sectionIndex].products!.length
  })
}

const removeProductFromSection = (sectionIndex: number, productIndex: number) => {
  form.sections![sectionIndex].products!.splice(productIndex, 1)
}

const handleSubmit = async () => {
  isLoading.value = true
  try {
    // Clean up the form data before submitting
    const submitData = {
      ...form,
      sections: form.sections?.map(section => ({
        ...section,
        showProducts: undefined, // Remove this property
        products: section.products?.filter(p => p.product_id > 0) || []
      }))
    }
    
    emit('submit', submitData)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    fetchCategories(),
    fetchProducts()
  ])
})
</script>
