<template>
  <div id="app">
    <LoginForm
      v-if="showLogin"
      @go-to-register="showRegister = true; showLogin = false"
      @login-success="onLoginSuccess"
    />
    <RegisterForm v-if="showRegister" @go-to-login="showRegister = false; showLogin = true" />

    <AdminDashboard v-if="showDashboard && userRole === 'admin'" />
<UserDashboard v-if="showDashboard && userRole === 'user'" />

  </div>
</template>

<script>
import AdminDashboard from './components/AdminDashboard.vue';
import UserDashboard from './components/UserDashboard.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm,
    AdminDashboard,
    UserDashboard,
  },
  data() {
    return {
      showDashboard: false,
      showLogin: true,
      showRegister: false,
      userRole: null,
    };
  },
  methods: {
    onLoginSuccess(role_id) {
      this.userRole = role_id;
      this.showDashboard = true;
      this.showLogin = false;
      this.showRegister = false;
    },
  },
};
</script>
