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

    <!-- Featured Image Upload -->
    <div class="bg-dark-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-white mb-4">تصویر شاخص</h3>
      <div class="space-y-4">
        <!-- Current Image Display -->
        <div v-if="featuredImageUrl" class="relative">
          <img
            :src="featuredImageUrl"
            alt="تصویر شاخص"
            class="w-full max-w-md h-48 object-cover rounded-lg border border-dark-600"
          />
          <button
            type="button"
            @click="removeFeaturedImage"
            class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Upload Button -->
        <div class="flex items-center gap-4">
          <input
            ref="featuredImageInput"
            type="file"
            accept="image/*"
            @change="handleFeaturedImageUpload"
            class="hidden"
          />
          <button
            type="button"
            @click="() => featuredImageInput?.click()"
            class="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {{ featuredImageUrl ? 'تغییر تصویر' : 'آپلود تصویر شاخص' }}
          </button>

          <div v-if="isUploadingFeaturedImage" class="text-sm text-dark-400">
            در حال آپلود...
          </div>
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
              @click="() => handleImageUpload()"
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

      <div v-if="form.sections && form.sections.length === 0" class="text-center py-8 text-dark-500">
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
                  @click="handleImageUpload(index)"
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
              <label class="block text-sm font-medium text-dark-300 mb-2">ترتیب نمایش</label>
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
              {{ section.showProducts ? 'مخفی کردن' : 'مدیریت' }} محصولات
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

            <!-- Product Search -->
            <div v-if="section.showProducts" class="mb-4">
              <div class="flex gap-2 mb-3">
                <input
                  v-model="sectionProductSearch[section.id || index]"
                  @input="searchProducts(String(section.id || index), ($event.target as HTMLInputElement).value)"
                  type="text"
                  placeholder="جستجوی محصول..."
                  class="flex-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  @click="clearProductSearch(String(section.id || index))"
                  class="px-3 py-2 bg-dark-600 text-white rounded hover:bg-dark-500"
                >
                  پاک کردن
                </button>
              </div>

              <!-- Search Results -->
              <div v-if="sectionProductSearch[section.id || index] && filteredProducts[section.id || index]?.length > 0"
                   class="max-h-40 overflow-y-auto border border-dark-600 rounded bg-dark-700 mb-3">
                <div
                  v-for="product in filteredProducts[section.id || index]"
                  :key="product.id"
                  @click="addProductToSectionFromSearch(index, product)"
                  class="p-2 hover:bg-dark-600 cursor-pointer border-b border-dark-600 last:border-b-0"
                >
                  <div class="text-white text-sm font-medium">{{ product.name }}</div>
                  <div class="text-dark-400 text-xs">{{ product.sku || 'بدون کد' }} - {{ product.price }} تومان</div>
                </div>
              </div>
            </div>

            <div v-if="section.products && section.products.length > 0" class="space-y-2">
              <div
                v-for="(product, productIndex) in section.products"
                :key="productIndex"
                class="flex items-center space-x-2 p-2 bg-dark-700 rounded"
              >
                <div class="flex-1">
                  <div class="text-white text-sm font-medium">{{ getProductName(product.product_id, product) }}</div>
                  <div class="text-dark-400 text-xs">{{ getProductSku(product.product_id, product) || 'بدون کد' }} - {{ getProductPrice(product.product_id, product) }} تومان</div>
                </div>
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

// Featured image state (read-only from media)
const featuredImageInput = ref<HTMLInputElement>()
const featuredImageUrl = ref<string>('')
const isUploadingFeaturedImage = ref(false)
const fakeModelId = ref<number>()

// Product search state
const sectionProductSearch = ref<Record<string, string>>({})
const filteredProducts = ref<Record<string, any[]>>({})
const searchTimeout = ref<Record<string, number>>({})

const form = reactive<Partial<Magazine>>({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
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

// Featured image upload handler
const handleFeaturedImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  isUploadingFeaturedImage.value = true
  try {
    const result = await magazineStore.uploadMedia(file, fakeModelId.value)

    if (result.success) {
      if (result.fake_model_id) {
        fakeModelId.value = result.fake_model_id
      }
      if (result.media) {
        featuredImageUrl.value = result.media.original_url || result.media.preview_url || result.media.url
      } else if (result.url) {
        featuredImageUrl.value = result.url
      }
    }
  } catch (error) {
    console.error('Featured image upload failed:', error)
    alert('آپلود تصویر شاخص ناموفق بود')
  } finally {
    isUploadingFeaturedImage.value = false
  }
}

const removeFeaturedImage = () => {
  featuredImageUrl.value = ''
  fakeModelId.value = undefined
}

// Custom image upload handler
const handleImageUpload = async (sectionIndex?: number) => {
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()

  input.onchange = async function() {
    const file = (this as HTMLInputElement).files?.[0]
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await axios.post('/api/v1/admin/media/upload', formData, {
          params: { direct_upload: 1 },
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (response.data.success) {
          // Insert image into the correct editor
          const imageUrl = response.data.url
          let editor: HTMLElement | null = null

          if (sectionIndex !== undefined) {
            // Find the section editor
            const sectionEditors = document.querySelectorAll('.ql-editor')
            editor = sectionEditors[sectionIndex + 1] as HTMLElement // +1 because first is main content
          } else {
            // Find the main content editor
            editor = document.querySelector('.ql-editor') as HTMLElement
          }

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
          alert('آپلود تصویر ناموفق بود')
        }
      } catch (error) {
        console.error('Image upload failed:', error)
        alert('آپلود تصویر ناموفق بود: ' + error)
      }
    }
  }
}



// Initialize form with magazine data if editing
watch(() => props.magazine, (magazine) => {
  if (magazine) {
    Object.assign(form, {
      ...magazine,
      sections: magazine.sections?.map(section => {
        // Transform products from pivot format to form format
        const transformedProducts = section.products?.map((product: any) => ({
          product_id: product.id,
          title: product.pivot?.title || product.name || '',
          description: product.pivot?.description || '',
          sort_order: product.pivot?.sort_order || 0,
          // Store full product data for display
          product_name: product.name,
          product_sku: product.sku || '',
          product_price: product.price || '0'
        })) || []

        return {
          ...section,
          showProducts: transformedProducts.length > 0, // Show products section if products exist
          products: transformedProducts
        }
      }) || []
    })

    // Initialize featured image from media only
    if (magazine.media && magazine.media.length > 0) {
      const featuredMedia = magazine.media.find(m => (m.collection_name || (m as any).collection) === 'magazine-images')
      if (featuredMedia) {
        featuredImageUrl.value = featuredMedia.original_url || featuredMedia.preview_url || (featuredMedia as any).url
        console.log('Initialized featured image:', featuredMedia.url)
      }
    }

    console.log('Initialized form with magazine data:', form)
    console.log('Sections with products:', form.sections?.filter(s => s.products && s.products.length > 0))
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
  const section = form.sections![index]
  section.showProducts = !section.showProducts

  console.log('Toggling products section:', index, 'showProducts:', section.showProducts)
  console.log('Current products:', section.products)

  // If showing products section and no products exist, add one automatically
  if (section.showProducts && (!section.products || section.products.length === 0)) {
    console.log('Adding first product to section')
    // Create a new products array to ensure reactivity
    const newProducts = [{
      product_id: 0,
      title: '',
      description: '',
      sort_order: 0,
      // Store empty product data for display
      product_name: 'انتخاب محصول',
      product_sku: '',
      product_price: '0'
    }]

    // Update the section with the new products array
    form.sections![index] = {
      ...section,
      products: newProducts
    }

    console.log('Products after adding:', form.sections![index].products)
  }
}

const addProductToSection = (sectionIndex: number) => {
  if (!form.sections![sectionIndex].products) {
    form.sections![sectionIndex].products = []
  }
  form.sections![sectionIndex].products!.push({
    product_id: 0,
    title: '',
    description: '',
    sort_order: form.sections![sectionIndex].products!.length,
    // Store empty product data for display
    product_name: 'انتخاب محصول',
    product_sku: '',
    product_price: '0'
  })
}

const removeProductFromSection = (sectionIndex: number, productIndex: number) => {
  form.sections![sectionIndex].products!.splice(productIndex, 1)
}

// Product search methods
const searchProducts = async (sectionId: string, searchTerm: string) => {
  // Clear previous timeout
  if (searchTimeout.value[sectionId]) {
    clearTimeout(searchTimeout.value[sectionId])
  }

  // If search term is empty, clear results
  if (!searchTerm.trim()) {
    filteredProducts.value[sectionId] = []
    return
  }

  // Debounce search
  searchTimeout.value[sectionId] = setTimeout(async () => {
    try {
      console.log('Searching products for section:', sectionId, 'with term:', searchTerm)
      const response = await axios.get('/api/v1/admin/magazines/0/products', {
        params: { search: searchTerm }
      })
      console.log('Search results:', response.data)
      filteredProducts.value[sectionId] = response.data
    } catch (error) {
      console.error('Error searching products:', error)
      filteredProducts.value[sectionId] = []
    }
  }, 300) // 300ms debounce
}

const clearProductSearch = (sectionId: string) => {
  sectionProductSearch.value[sectionId] = ''
  filteredProducts.value[sectionId] = []
  if (searchTimeout.value[sectionId]) {
    clearTimeout(searchTimeout.value[sectionId])
  }
}

const addProductToSectionFromSearch = (sectionIndex: number, product: any) => {
  // Check if product is already added
  const existingProduct = form.sections![sectionIndex].products?.find(p => p.product_id === product.id)
  if (existingProduct) {
    alert('این محصول قبلاً اضافه شده است')
    return
  }

  // Add product to section
  if (!form.sections![sectionIndex].products) {
    form.sections![sectionIndex].products = []
  }

  form.sections![sectionIndex].products!.push({
    product_id: product.id,
    title: product.name,
    description: '',
    sort_order: form.sections![sectionIndex].products!.length,
    // Store full product data for display
    product_name: product.name,
    product_sku: product.sku || '',
    product_price: product.price || '0'
  })

  // Clear search
  clearProductSearch(form.sections![sectionIndex].id?.toString() || sectionIndex.toString())
}

// Helper methods to get product info
const getProductName = (productId: number, productData?: any) => {
  if (productData?.product_name) {
    return productData.product_name
  }
  const product = products.find(p => p.id === productId)
  return product?.name || 'محصول نامشخص'
}

const getProductSku = (productId: number, productData?: any) => {
  if (productData?.product_sku) {
    return productData.product_sku
  }
  const product = products.find(p => p.id === productId)
  return product?.sku || ''
}

const getProductPrice = (productId: number, productData?: any) => {
  if (productData?.product_price) {
    return productData.product_price
  }
  const product = products.find(p => p.id === productId)
  return product?.price || '0'
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
      })),
      fake_model_id: fakeModelId.value
    }

    console.log('Submitting magazine data:', submitData)
    console.log('Sections with products being submitted:', submitData.sections?.filter(s => s.products && s.products.length > 0))

    emit('submit', submitData)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    await Promise.all([
      fetchCategories(),
      fetchProducts()
    ])
  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>
