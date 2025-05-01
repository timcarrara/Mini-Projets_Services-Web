import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io';

// 1. Création de l'instance Pinia
const pinia = createPinia()

// 2. Création de l'app Vue
const app = createApp(App)

// 3. Installation des plugins (Pinia doit être avant Router)
app.use(pinia)
app.use(router)

// 4. Montage de l'application
app.mount('#app')

const socket = new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_API_URL,
  });
  
  new Vue({
    // ...
    socket,
    // ...
  });