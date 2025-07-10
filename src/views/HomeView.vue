<template>
  <main>
    <h1>Home Page</h1>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRedirectIfNotAuthenticated } from '@/composables/useRedirectIfNotAuthenticated'

const { redirect } = useRedirectIfNotAuthenticated()

onMounted(() => {
  redirect('login')
})
</script>
