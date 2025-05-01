<template>
  <div class="home">
    <h1>Bienvenue</h1>
    <button v-if="!auth.isAuthenticated" @click="auth.login()">
      Se connecter avec Google
    </button>
    <router-link v-else to="/chat" class="chat-link">
      Accéder au chat
    </router-link>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const auth = useAuthStore()

// Vérification de l'authentification au montage
onMounted(() => {
  auth.checkAuth()
})
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}
button, .chat-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: #4285f4;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
button:hover, .chat-link:hover {
  background: #3367d6;
}
</style>