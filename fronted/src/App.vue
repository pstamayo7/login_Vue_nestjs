<template>
  <div id="app">
    <LoginForm
      v-if="showLogin"
      @go-to-register="showRegister = true; showLogin = false"
      @login-success="showDashboard = true; showLogin = false"
    />
    <RegisterForm v-if="showRegister" @go-to-login="showRegister = false; showLogin = true" />
    <AdminDashboard v-if="showDashboard" />
  </div>
</template>

<script>
import AdminDashboard from './components/AdminDashboard.vue';

import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm,
    AdminDashboard, 
  },
  data() {
    return {
         showDashboard: false, // nueva variable
      showLogin: true,  // Por defecto, mostrar el formulario de login
      showRegister: false,  // No mostrar el formulario de registro al principio
    };
  },
};
</script>

<style>
</style>
