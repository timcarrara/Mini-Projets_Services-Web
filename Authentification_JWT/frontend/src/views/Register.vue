<template>
  <div>
    <nav class="navbar">
      <div class="logo">AUTHENTIFICATION AVEC JWT</div>
      <div class="nav-links">
        <RouterLink to="/login" class="btn">Connexion</RouterLink>
        <RouterLink to="/" class="btn btn-secondary">Accueil</RouterLink>
      </div>
    </nav>

    <form @submit.prevent="signup">
      <h3>S'inscrire</h3>
      <fieldset>
        <div class="form-inputs">
          <label for="firstname">FirstName :</label>
          <input id="firstname" type="text" v-model="user.firstName" required />
        </div>

        <div class="form-inputs">
          <label for="lastName">LastName :</label>
          <input id="lastName" type="text" v-model="user.lastName" required />
        </div>

        <div class="form-inputs">
          <label for="email">Email :</label>
          <input id="email" type="email" v-model="user.emailId" required />
        </div>

        <div class="form-inputs">
          <label for="password">Password :</label>
          <input id="password" type="password" v-model="user.password" required />
        </div>

        <button type="submit">S'inscrire</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegisterUser",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["register"]),
    async signup() {
      try {
        console.log(this.user);
        const response = await this.register(this.user);
        if (response.error !== 1) {
          await this.$router.push("/login");
        } else {
          alert("Création du compte refusée");
        }
      } catch (err) {
        console.error("SignUpForm.vue | Erreur lors de la création du compte", err);
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
  max-width: 500px;
  margin: 80px auto;
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
  border-color: #28a745;
  outline: none;
}

button[type="submit"] {
  width: 100%;
  padding: 0.9rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #218838;
}
</style>
