<template>
    <form @submit.prevent="handleSubmit">
      <input v-model="message" placeholder="Tapez votre message..." />
      <button type="submit">Envoyer</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const emit = defineEmits(['send'])
  const message = ref('')
  
  const handleSubmit = () => {
    if (message.value.trim()) {
      emit('send', message.value)
      message.value = ''
    }
  }
  </script>
  
  <style scoped>
  form {
    display: flex;
    gap: 0.5rem;
  }
  input {
    flex-grow: 1;
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
  }
  </style>