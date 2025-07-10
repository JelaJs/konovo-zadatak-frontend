import { ref } from 'vue'

export const isLoggedIn = ref(!!localStorage.getItem('jwt_token'))

export function updateAuthStatus() {
  isLoggedIn.value = !!localStorage.getItem('jwt_token')
}
