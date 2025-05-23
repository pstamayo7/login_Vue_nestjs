<template>
  <div id="app">
    <LoginForm v-if="showLogin" @go-to-register="showRegister = true; showLogin = false" />
    <RegisterForm v-if="showRegister" @go-to-login="showRegister = false; showLogin = true" />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      showLogin: true,  // Por defecto, mostrar el formulario de login
      showRegister: false,  // No mostrar el formulario de registro al principio
    };
  },
};
</script>

<style>
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
}</style>
