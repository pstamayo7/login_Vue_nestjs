<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
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
      <button type="submit">Login</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <p>
      Don't have an account? 
      <a href="#" @click.prevent="goToRegister">Register here</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('token', response.data.access_token);
        alert('Login successful!');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else {
          this.errorMessage = 'An error occurred, please try again later.';
        }
      }
    },
    goToRegister() {
      this.$emit('go-to-register');  // Emit event to go to register page
    },
  },
};
</script>

<style scoped>
.login {
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
  background-color: #4CAF50;
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
