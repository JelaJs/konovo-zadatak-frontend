<template>Login</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('jwt_token')
  if (token) {
    router.push({ name: 'home' })
  }
})
</script>
