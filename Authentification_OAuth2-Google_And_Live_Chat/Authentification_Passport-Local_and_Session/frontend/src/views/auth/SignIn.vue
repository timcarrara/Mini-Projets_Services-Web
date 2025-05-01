<template>
  <div class="auth-page">
    <nav class="navbar">
      <img :src="logo" alt="logo application" class="logo-img">
      <div class="logo">Authentification Passport Local et Session</div>
      <div class="nav-buttons">
        <router-link to="/signup" class="btn">S'inscrire</router-link>
        <router-link to="/" class="btn">Accueil</router-link>
      </div>
    </nav>
    <h2>Connexion</h2>
    <SignInForm @submit="handleLogin" :loading="loading" :error="error" />
  </div>
</template>

<script>
import SignInForm from "@/components/auth/SignInForm.vue";
import { mapGetters, mapActions } from "vuex";
import logo from "@/assets/logo_application.png";

export default {
  components: { SignInForm },
  data() {
    return {
      logo
    };
  },
  computed: {
    ...mapGetters(["isLoading", "authError"]),
    loading() {
      return this.isLoading;
    },
    error() {
      return this.authError;
    }
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin(credentials) {
      await this.login(credentials);
      if (!this.authError) {
        this.$router.push("/home");
      }
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin: 2rem 0;
}
.logo-img {
  height: 40px;
  margin-right: 1rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  color: white;
  text-decoration: none;
  background-color: #3498db;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #2980b9;
}
</style>

