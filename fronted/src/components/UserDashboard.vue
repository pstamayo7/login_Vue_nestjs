<template>
  <div>
    <h2>User Dashboard</h2>
    <p>Welcome, user!</p>
    <button @click="logout" style="background: red; color: white;">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      window.location.href = '/';
    },
  },
};
</script>
