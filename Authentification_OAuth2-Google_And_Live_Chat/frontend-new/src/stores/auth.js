import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/auth/current_user`, {
        withCredentials: true
      })
      user.value = data
      isAuthenticated.value = true
    } catch (err) {
      user.value = null
      isAuthenticated.value = false
    }
  }

  const login = (provider = 'google') => {
    console.log('Tentative de connexion via:', provider) // Debug
    console.log('URL appelée:', `${import.meta.env.VITE_API_URL}/auth/${provider}`) // Debug
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`
  }

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        withCredentials: true
      })
      user.value = null
      isAuthenticated.value = false
      window.location.href = '/' // Rafraîchit la page pour nettoyer l'état
    } catch (err) {
      console.error('Logout error:', err)
      // Fallback si le logout échoue
      user.value = null
      isAuthenticated.value = false
      window.location.href = '/'
    }
  }

  return { 
    user,
    isAuthenticated,
    checkAuth,
    login,
    logout
  }
})