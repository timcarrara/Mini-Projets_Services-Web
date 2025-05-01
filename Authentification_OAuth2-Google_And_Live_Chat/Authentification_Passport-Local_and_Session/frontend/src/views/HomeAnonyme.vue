<template>
  <div class="home-page">
    <nav class="navbar">
      <img :src="logo" alt="logo application" class="logo-img">
      <div class="logo">Authentification Passport Local et Session</div>
      <div class="nav-buttons">
        <router-link to="/signup" class="btn">S’inscrire</router-link>
        <router-link to="/signin" class="btn">Se connecter</router-link>
      </div>
    </nav>

    <main class="content">
      <h1>Bienvenue sur l'application pour s'authentifier en toute sécurité</h1>
      <h2>Connectez-vous ou créez un compte pour commencer.</h2>
    </main>

    <div class="author">
      <h3>Une application réalisée par CARRARA Tim et ROSE Mathéo</h3>
    </div>
  </div>
</template>

<script>

import logo from "@/assets/logo_application.png";

export default {
  name: "HomeAnonyme",
  data() {
    return {
      logo
    };
  }
};
</script>

<style scoped>
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

.content {
  text-align: center;
  margin-top: 4rem;
}

.author {
  margin-top: 6rem;
  text-align: center;
  font-size: 1rem;
  color: #555;
}
</style>
