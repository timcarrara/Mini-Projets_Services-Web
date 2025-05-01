<template>
  <div class="auth-page">
    <nav class="navbar">
      <img :src="logo" alt="logo application" class="logo-img">
      <div class="logo">Authentification Passport Local et Session</div>
      <div class="nav-buttons">
        <router-link to="/signin" class="btn">Se connecter</router-link>
        <router-link to="/" class="btn">Accueil</router-link>
      </div>
    </nav>
    <h2>Inscription</h2>
    <SignUpForm @submit="handleRegister" :loading="loading" :error="localError" />
  </div>
</template>

<script>
import SignUpForm from "@/components/auth/SignUpForm.vue";
import { mapGetters, mapActions } from "vuex";
import logo from "@/assets/logo_application.png";

export default {
  components: { SignUpForm },
  computed: {
    ...mapGetters(["isLoading"]),
    loading() {
      return this.isLoading;
    }
  },
  data() {
    return {
      localError: null,
      logo
    };
  },
  methods: {
    ...mapActions(["register"]),
    async handleRegister(userData) {
      this.localError = null;
      try {
        await this.register(userData);
        this.$router.push("/signin");
      } catch (err) {
        console.error("Inscription échouée:", err.response?.data?.message);
        if (
            err.response &&
            err.response.data &&
            err.response.data.message === "Cet email est déjà utilisé"
        ) {
          this.localError = "Un compte avec cet email existe déjà.";
        } else {
          this.localError = "Une erreur est survenue lors de l'inscription.";
        }
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
