<template>
  <main>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input type="text" v-model="username" />
        <input type="password" v-model="password" />
        <button>Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const error = ref('')
const password = ref('')
import { useRedirectIfAuthenticated } from '@/composables/useRedirectIfAuthenticated'

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
