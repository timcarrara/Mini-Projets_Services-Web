import { defineStore } from 'pinia'
import { ref } from 'vue'
import { io } from 'socket.io-client'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const socket = io(import.meta.env.VITE_API_URL)

  socket.on('connect', () => {
    console.log('Connected to chat server')
  })

  socket.on('message', (message) => {
    messages.value.push(message)
  })

  const sendMessage = (text) => {
    socket.emit('message', {
      text,
      user: 'Current User', // À remplacer par le vrai user après auth
      timestamp: new Date().toISOString()
    })
  }

  return { messages, sendMessage }
})