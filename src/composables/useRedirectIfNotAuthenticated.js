import { useRouter } from 'vue-router'

export function useRedirectIfNotAuthenticated() {
  const router = useRouter()

  const redirect = (path) => {
    const token = localStorage.getItem('jwt_token')
    if (!token) {
      router.push({ name: path })
    }
  }

  return { redirect }
}
