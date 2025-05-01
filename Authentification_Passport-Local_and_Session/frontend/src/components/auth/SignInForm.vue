<template>
  <form @submit.prevent="onSubmit" class="signin-form">
    <div>
      <label for="emailId">Email</label>
      <input v-model="form.emailId" type="email" id="emailId" required />
    </div>

    <div>
      <label for="password">Mot de passe</label>
      <input v-model="form.password" type="password" id="password" required />
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? "Connexion..." : "Se connecter" }}
    </button>
  </form>
</template>

<script>
export default {
  name: "SignInForm",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        emailId: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit", { ...this.form });
    }
  }
};
</script>

<style scoped>
.signin-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

label {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-bottom: 1rem;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

button {
  padding: 0.75rem;
  font-weight: bold;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #2980b9;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
}
</style>
