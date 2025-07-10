<template>
  <main>
    <h1>Home Page</h1>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('jwt_token')
  if (!token) {
    router.push({ name: 'login' })
  }
})
</script>
