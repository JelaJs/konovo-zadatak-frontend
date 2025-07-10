<template>
  <main>
    <h1>Products</h1>
    <input placeholder="search product..." v-model="category" @input="getByCategory" />
    <ul v-if="products && !error">
      <li v-for="product in products" :key="product.id">
        Name: {{ product.naziv }} - Price: {{ product.price }}
      </li>
    </ul>
    <p v-if="error">{{ error }}</p>
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
