<template>
  <div id="app">
    <NavBar />
    <router-view/>
    <!-- Ajoutez le chat en bas de page (ou selon votre préférence) -->
    <Chat v-if="isAuthenticated" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Si vous utilisez Pinia
import NavBar from '@/components/NavBar.vue';
import Chat from '@/components/Chat.vue'; // Importez votre composant Chat

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  position: relative;
  min-height: 100vh;
}
</style>