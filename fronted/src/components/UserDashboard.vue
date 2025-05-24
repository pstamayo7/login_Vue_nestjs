<template>
  <div class="dashboard-wrapper">
    <header class="dashboard-header">
      <h1>User Dashboard</h1>
      <button class="logout-button" @click="logout">🚪 Logout</button>
    </header>

    <main class="dashboard-content">
      <div class="user-card">
        <h2 class="greeting">👋 Welcome, {{ user.first_name }} {{ user.last_name }}!</h2>
        <ul class="user-info">
          <li><strong>Email:</strong> {{ user.email }}</li>
          <li><strong>Role:</strong> {{ user.role?.name || user.role }}</li>
        </ul>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
    </main>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      user: {},
      errorMessage: '',
    };
  },
  async created() {
    try {
      const response = await api.get('/users/me');
      this.user = response.data;
    } catch (error) {
      this.errorMessage = 'No se pudo cargar la información del usuario.';
      console.error(error);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      window.location.href = '/';
    },
  },
};
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  background: linear-gradient(to right, #00b4db, #0083b0);
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.dashboard-header h1 {
  font-size: 1.75rem;
  font-weight: bold;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #c0392b;
}

.dashboard-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.user-card {
  background-color: white;
  color: #2c3e50;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 100%;
}

.greeting {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #2980b9;
}

.user-info {
  list-style: none;
  padding: 0;
  margin: 0;
  line-height: 2;
  font-size: 1.1rem;
}

.user-info li {
  border-bottom: 1px solid #ecf0f1;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.error-message {
  margin-top: 1rem;
  color: #e74c3c;
  font-weight: bold;
}
</style>
