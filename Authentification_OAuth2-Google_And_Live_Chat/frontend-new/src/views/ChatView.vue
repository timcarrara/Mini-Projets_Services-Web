<template>
    <div class="chat-container">
      <div class="messages">
        <div v-for="message in chat.messages" :key="message.id" class="message">
          <strong>{{ message.user }}:</strong> {{ message.text }}
        </div>
      </div>
      <MessageInput @send="chat.sendMessage" />
    </div>
  </template>
  
  <script setup>
  import { useChatStore } from '@/stores/chat'
  import MessageInput from '@/components/chat/MessageInput.vue'
  const chat = useChatStore()
  </script>
  
  <style scoped>
  .chat-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
  .messages {
    height: 70vh;
    overflow-y: auto;
    border: 1px solid #eee;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .message {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: #f9f9f9;
    border-radius: 4px;
  }
  </style>