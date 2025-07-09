<template>
  <header>
    <div>
      <nav>
        <RouterLink v-if="!isLoggedIn" :to="{ name: 'login' }">Login</RouterLink>
        <RouterLink v-if="isLoggedIn" @click="logOut" :to="{ name: 'login' }">Logout</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isLoggedIn = ref(false)
const router = useRouter()

const logOut = function () {
  localStorage.removeItem('jwt_token')
  router.push({ name: 'login' })
}

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('jwt_token')
})
</script>
