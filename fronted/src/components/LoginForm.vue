<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">Welcome back</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="Enter your password" />
        </div>
        <button type="submit">Log In</button>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


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

        const token = response.data.access_token;
        localStorage.setItem('token', token);

        // Decodifica el token para obtener el rol
        const decoded = jwtDecode(token);

        // decoded.role_id debe existir según el payload que pongas en backend

        alert('Login successful!');
        // Emite el rol para que el padre lo reciba
        this.$emit('login-success', decoded.role);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else {
          this.errorMessage = 'An error occurred, please try again later.';
        }
      }
    },
  },
};
</script>


<style scoped>
/* Container to center the login card */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f7fa;
}

/* Card with shadow and rounded corners */
.login-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.2s;
}

input:focus {
  border-color: #4caf50;
  outline: none;
}

button {
  width: 100%;
  padding: 0.9rem;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #43a047;
}

.error {
  color: #d32f2f;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.95rem;
}
</style>
