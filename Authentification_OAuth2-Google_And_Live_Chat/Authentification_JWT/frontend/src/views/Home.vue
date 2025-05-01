<template>
  <div class="container-home-connexion">
    <nav class="navbar">
      <div class="logo">AUTHENTIFICATION AVEC JWT</div>
      <div class="nav-links">
        <RouterLink to="/login" @click="handleLogout" class="btn">Se déconnecter</RouterLink>
      </div>
    </nav>
    <div>
      <h1>Bienvenue {{ user.firstName }}</h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "HomeView",
  components: {},
  computed : {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout();
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1f1f1f;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.btn {
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: #ff4c4c;
  color: white;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #e84343;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  font-weight: bold;
  align-items: center;
}
</style>

