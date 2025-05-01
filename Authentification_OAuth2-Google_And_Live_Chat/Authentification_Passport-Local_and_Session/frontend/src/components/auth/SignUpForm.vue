<template>
  <form @submit.prevent="onSubmit" class="signup-form">
    <div>
      <label for="emailId">Email</label>
      <input v-model="form.emailId" type="email" id="emailId" required />
    </div>

    <div>
      <label for="firstName">Firstname</label>
      <input v-model="form.firstName" type="text" id="firstName" required />
    </div>

    <div>
      <label for="lastName">LastName</label>
      <input v-model="form.lastName" type="text" id="lastName" required />
    </div>

    <div>
      <label for="password">Mot de passe</label>
      <input v-model="form.password" type="password" id="password" required />
    </div>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>

    <button type="submit" :disabled="loading">
      {{ loading ? "Inscription..." : "S'inscrire" }}
    </button>
  </form>
</template>

<script>
export default {
  name: "SignUpForm",
  props: {
    loading: { type: Boolean, default: false },
    error: { type: String, default: null }
  },
  data() {
    return {
      form: {
        emailId: "",
        firstName: "",
        lastName: "",
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
.signup-form {
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
