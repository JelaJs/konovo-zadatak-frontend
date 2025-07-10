<template>
  <main class="min-h-100 flex items-center justify-center">
    <div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md">
      <h1 class="text-2xl font-semibold text-center mb-6 text-red-500">Login</h1>
      <form @submit.prevent="login" class="space-y-4">
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRedirectIfAuthenticated } from '@/composables/useRedirectIfAuthenticated'
import { updateAuthStatus } from '@/composables/useAuthStatus'

const router = useRouter()
const username = ref('')
const error = ref('')
const password = ref('')

const { redirect } = useRedirectIfAuthenticated()

const login = () => {
  //Napomena koristio sam herokuapp kako bih zaobisao cors validaciju, ovo je bilo jednostavnije resenje kako ne bih pisao ceo backend proxy
  //ako zelite da testirate udjite na: https://cors-anywhere.herokuapp.com/corsdemo i pritisnite Requet temporary access to the demo server
  axios
    .post('https://cors-anywhere.herokuapp.com/https://zadatak.konovo.rs/login', {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      const token = response.data.token

      if (token) {
        localStorage.setItem('jwt_token', token)
        router.push({ name: 'home' })
        updateAuthStatus()
      }
    })
    .catch((err) => {
      error.value = err.response.data.error
    })
}

onMounted(() => {
  redirect()
})
</script>
