<template>
  <div class="auth-buttons">
    <button @click="auth.login('google')" class="google-btn">
      <img src="@/assets/google-logo.png" alt="Google">
      Continue with Google
    </button>
    <button @click="auth.login('github')" class="github-btn">
      <img src="@/assets/github-logo.png" alt="GitHub">
      Continue with GitHub
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<style scoped>
.auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

button {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.google-btn {
  background: white;
  border: 1px solid #ddd;
}

.github-btn {
  background: #24292e;
  color: white;
  border: none;
}

button img {
  width: 20px;
  margin-right: 10px;
}
</style>