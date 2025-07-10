<template>
  <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
    <div class="max-w-7xl mx-auto px-4 py-3">
      <nav class="flex justify-end space-x-4">
        <RouterLink
          v-if="!isLoggedIn"
          :to="{ name: 'login' }"
          class="text-blue-600 hover:underline"
        >
          Login
        </RouterLink>
        <RouterLink
          v-if="isLoggedIn"
          @click="logOut"
          :to="{ name: 'login' }"
          class="text-red-600 hover:underline"
        >
          Logout
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn, updateAuthStatus } from '@/composables/useAuthStatus'

const router = useRouter()

const logOut = function () {
  localStorage.removeItem('jwt_token')
  router.push({ name: 'login' })
  updateAuthStatus()
}

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('jwt_token')
})
</script>
