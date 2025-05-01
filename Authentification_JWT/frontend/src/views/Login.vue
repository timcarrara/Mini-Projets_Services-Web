<template>
  <div>
    <nav class="navbar">
      <div class="logo">AUTHENTIFICATION AVEC JWT</div>
      <div class="nav-links">
        <RouterLink to="/register" class="btn">Inscription</RouterLink>
        <RouterLink to="/" class="btn btn-secondary">Accueil</RouterLink>
      </div>
    </nav>

    <form @submit.prevent="signin">
      <h3>Connexion</h3>
      <fieldset>
        <div class="form-inputs">
          <label for="email">Email :</label>
          <input id="email" type="text" v-model="user.emailId" required />
        </div>

        <div class="form-inputs">
          <label for="password">Password :</label>
          <input
              id="password"
              type="password"
              v-model="user.password"
              required
          />
        </div>

        <button type="submit">Log in</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "loginUser",
  data() {
    return {
      user: {
        emailId: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["authenticate"]),
    ...mapMutations(["updateAuthStatus"]),

    async signin() {
      try {
        const response = await this.authenticate(this.user);
        if (response.error !== 1) {
          this.updateAuthStatus(true);
          await this.$router.push("/home");
        } else {
          alert("Votre adresse email ou votre mot de passe est incorrect");
        }
      } catch (err) {
        console.error("SignInForm.vue | Erreur lors de la connexion", err);
      }
    },
  },
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

.btn-secondary {
  background: #4c6fff;
}

.btn-secondary:hover {
  background: #3d56cc;
}

form {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
}

input {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button[type="submit"] {
  width: 100%;
  padding: 0.9rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
