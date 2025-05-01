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
/* Aquí puedes agregar estilos globales */
</style>
