<template>
  <nav>
    <div v-if="auth.isAuthenticated">
      <img :src="auth.user.avatar" class="avatar" />
      <span>{{ auth.user.displayName }}</span>
      <button @click="auth.logout()">Déconnexion</button>
    </div>
    <div v-else class="auth-buttons">
      <button @click="login('google')" class="google-btn">
        <img src="https://www.google.com/favicon.ico" class="provider-icon">
        Google
      </button>
      <button @click="login('github')" class="github-btn">
        <img src="https://github.com/favicon.ico" class="provider-icon">
        GitHub
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const auth = useAuthStore()

const login = (provider) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) throw new Error('VITE_API_URL non défini')
    
    window.location.href = `${apiUrl}/auth/${provider}`
  } catch (err) {
    console.error('Erreur de connexion:', err)
    alert('Erreur de connexion - vérifiez la console')
  }
}

onMounted(() => {
  auth.checkAuth()
})
</script>

<style scoped>
nav {
  padding: 1rem;
  background: #f5f5f5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.google-btn {
  background: #fff;
  color: #757575;
}

.github-btn {
  background: #24292e;
  color: white;
  border-color: #24292e;
}

.provider-icon {
  width: 16px;
  height: 16px;
}
</style>