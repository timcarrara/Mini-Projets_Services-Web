<template>
  <div class="page-container">
    <nav class="navbar">
      <div class="logo">AUTHENTIFICATION AVEC JWT</div>
      <div class="nav-links">
        <routerLink to="/login" class="btn">Connexion</routerLink>
        <routerLink to="/register" class="btn btn-secondary">Inscription</routerLink>
      </div>
    </nav>

    <div class="content">
      <h1>Bienvenue sur l'application pour s'authentifier en toute sécurité</h1>
      <h2>Connectez-vous ou créez un compte pour commencer.</h2>
    </div>

    <div class="author">
      <h3>Une application réalisée par CARRARA Tim et ROSE Mathéo</h3>
    </div>
  </div>
</template>


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

.btn-secondary {
  background: #4c6fff;
}

.btn-secondary:hover {
  background: #3d56cc;
}

.content {
  text-align: center;
  margin-top: 4rem;
  padding: 0 1rem;
}

.content h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.content h2 {
  font-size: 1.25rem;
  color: #555;
}

.author {
  text-align: center;
  margin-top: 3rem;
  padding: 1rem;
  background-color: #f5f5f5;
  color: #333;
  border-top: 1px solid #ccc;
}

.author h3 {
  margin: 0;
  font-size: 1rem;
}
</style>
