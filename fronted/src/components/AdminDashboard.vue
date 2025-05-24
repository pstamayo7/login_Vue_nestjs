<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <h2 @click="activeView = 'welcome'" style="cursor: pointer">Panel de Administración</h2>
      <button @click="activeView = 'register'">Administrar Usuarios</button>
    </aside>

    <main class="main-content">
      <div v-if="activeView === 'welcome'">
        <h1>Bienvenido, Admin</h1>
        <p>Selecciona una opción del menú para comenzar.</p>
      </div>

      <UserRegister v-if="activeView === 'register'" />
    </main>
  </div>
</template>

<script>
import api from '../api'; // Asegúrate de que la ruta sea correcta
import UserRegister from './RegisterForm.vue'; // Reutilizamos el formulario de registro

export default {
  components: {
    UserRegister,
  },
  data() {
    return {
      activeView: 'welcome', // Por defecto, muestra mensaje de bienvenida
    };
  },
  async mounted() {
    try {
      // Verificar si el token es válido haciendo una solicitud protegida
      await api.get('/users/me');
    } catch (error) {
      console.error('Token inválido o expirado:', error);
      alert('No autorizado. Redirigiendo al login...');
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirige al login
    }
  },
};
</script>


<style scoped>
.admin-dashboard {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 220px;
  background-color: #f0f0f0;
  padding: 1rem;
  border-right: 1px solid #ccc;
}

.sidebar h2 {
  margin-bottom: 1rem;
}

.sidebar button {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border: none;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
}

.sidebar button:hover {
  background-color: #45a049;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
