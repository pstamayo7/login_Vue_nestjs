<template>
  <div class="admin-register-wrapper">
    <div class="register-panel">
      <h2 class="title">User Management</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-row">
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              v-model="first_name"
              required
              placeholder="John"
            />
          </div>
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              v-model="last_name"
              required
              placeholder="Doe"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="admin@example.com"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="********"
            />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit">Register User</button>
        </div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </form>
    </div>
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
        await axios.post('http://localhost:3000/auth/register', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        });
        alert('User registered successfully!');
        this.$emit('go-to-login');
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    },
  },
};
</script>

<style scoped>
.admin-register-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 3rem 4rem;
  min-height: 100vh;
  background-color: #eef2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-panel {
  background-color: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 700px;
}

.title {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #34495e;
}

input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #2980b9;
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

button {
  background-color: #2980b9;
  color: white;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #1c5980;
}

.error {
  margin-top: 1rem;
  color: #e74c3c;
  font-weight: 500;
}
</style>
