<template>
    <div class="chat-wrapper">
      <div class="chat-toggle" @click="toggleChat">
        {{ isOpen ? 'Fermer le chat' : 'Ouvrir le chat' }}
      </div>
      
      <div v-if="isOpen" class="chat-container">
        <div class="messages" ref="messagesContainer">
          <div v-for="message in messages" :key="message._id" class="message">
            <img :src="message.sender.avatar || '/default-avatar.png'" class="avatar" />
            <div class="message-content">
              <span class="sender-name">{{ message.sender.displayName }}</span>
              <p>{{ message.content }}</p>
              <small>{{ formatDate(message.timestamp) }}</small>
            </div>
          </div>
        </div>
        
        <div class="message-input">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Écrivez un message..."
          />
          <button @click="sendMessage">Envoyer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import io from 'socket.io-client';
  
  const authStore = useAuthStore();
  const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000');
  
  const messages = ref([]);
  const newMessage = ref('');
  const isOpen = ref(false);
  const messagesContainer = ref(null);
  
  onMounted(async () => {
    await fetchPreviousMessages();
    setupSocket();
  });
  
  async function fetchPreviousMessages() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`);
      messages.value = await response.json();
      scrollToBottom();
    } catch (err) {
      console.error('Erreur chargement messages:', err);
    }
  }
  
  function setupSocket() {
    socket.on('newMessage', (message) => {
      messages.value.push(message);
      scrollToBottom();
    });
  }
  
  function sendMessage() {
    if (newMessage.value.trim() && authStore.user) {
      socket.emit('sendMessage', {
        content: newMessage.value,
        userId: authStore.user._id,
        displayName: authStore.user.displayName,
        avatar: authStore.user.avatar
      });
      newMessage.value = '';
    }
  }
  
  function toggleChat() {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      nextTick(scrollToBottom);
    }
  }
  
  function scrollToBottom() {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  }
  
  function formatDate(date) {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  </script>
  
  <style scoped>
  .chat-wrapper {
    position: fixed;
    bottom: 0;
    right: 20px;
    width: 300px;
    z-index: 1000;
  }
  
  .chat-toggle {
    background: #4285f4;
    color: white;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px 8px 0 0;
  }
  
  .chat-container {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px 8px 0 0;
    height: 400px;
    display: flex;
    flex-direction: column;
  }
  
  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
  
  .message {
    display: flex;
    margin-bottom: 10px;
  }
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
  }
  
  .message-content {
    background: #f1f1f1;
    padding: 8px 12px;
    border-radius: 18px;
    max-width: 80%;
  }
  
  .sender-name {
    font-weight: bold;
    font-size: 0.8em;
    display: block;
  }
  
  .message-input {
    display: flex;
    padding: 8px;
    border-top: 1px solid #eee;
  }
  
  .message-input input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 8px;
  }
  
  .message-input button {
    padding: 8px 12px;
    background: #4285f4;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
  }
  </style>