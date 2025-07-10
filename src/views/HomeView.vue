<template>
  <main class="min-h-screen flex flex-col items-center justify-start p-8 bg-white">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Products</h1>

    <input
      type="text"
      placeholder="Search product..."
      v-model="category"
      @input="getByCategory"
      class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <ul v-if="products && !error" class="w-full max-w-2xl space-y-2">
      <li
        v-for="product in products"
        :key="product.id"
        class="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
      >
        <span class="block font-medium text-gray-700">Name:</span> {{ product.naziv }}
        <br />
        <span class="block font-medium text-gray-700">Price:</span> {{ product.price.toFixed(2) }}
      </li>
    </ul>

    <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRedirectIfNotAuthenticated } from '@/composables/useRedirectIfNotAuthenticated'
import axios from 'axios'

const { redirect } = useRedirectIfNotAuthenticated()
const error = ref('')
const category = ref('')
const products = ref([])
const token = localStorage.getItem('jwt_token')
const timeoutRef = ref(0)

const getProducts = function () {
  axios
    .get('http://127.0.0.1:8000/api/v1/products', {
      params: {
        category: category.value,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      products.value = response.data.data
      error.value = ''
    })
    .catch((err) => {
      error.value = 'Products not found'
    })
}

const getByCategory = function () {
  clearTimeout(timeoutRef.value)

  timeoutRef.value = setTimeout(() => {
    getProducts()
  }, 300)
}

onMounted(() => {
  redirect('login')
  getProducts()
})
</script>
