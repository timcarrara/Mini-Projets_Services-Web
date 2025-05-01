<template>
  <div class="home-connexion">
    <nav class="navbar">
      <img :src="logo" alt="logo application" class="logo-img">
      <div class="logo">Authentification Passport Local et Session</div>
      <div class="nav-buttons">
        <router-link to="/signin" @click="handleLogout" class="btn">Se déconnecter</router-link>
      </div>
    </nav>
    <h1>Bienvenue</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import logo from "@/assets/logo_application.png";

export default {
  name: "HomeConnexion",
  data() {
    return {
      logo
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["logout"]),
    async handleLogout() {
      await this.logout();
      this.$router.push("/signin");
    }
  }
};
</script>

<style scoped>
h1 {
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
