<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="first_name">Name</label>
        <input
          type="text"
          id="firs_name"
          v-model="first_name"
          required
          placeholder="Enter your full name"
        />
      </div>
      <div class="form-group">
        <label for="last_name">Surname</label>
        <input
          type="text"
          id="last_name"
          v-model="last_name"
          required
          placeholder="Enter your surname"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleRegister() {
      try {
        // Enviar los datos al backend para registrar el usuario
        await axios.post('http://localhost:3000/auth/register', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        });

        alert('Registration successful!');
        this.$emit('go-to-login');  // Emitir evento para ir al login
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    },
    goToLogin() {
      this.$emit('go-to-login');  // Emitir evento para ir al login
    },
  },
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input {
  width: 100%;
  padding: 0.8em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 1em;
  font-size: 1em;
  background-color: #257227;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 1em;
}

p {
  margin-top: 1em;
  text-align: center;
}

a {
  color: #4CAF50;
  cursor: pointer;
}
</style>
