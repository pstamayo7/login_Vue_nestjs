<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <h2 @click="activeView = 'welcome'" class="logo">⚙️ Admin Panel</h2>
      <button @click="activeView = 'register'">➕ Crear Usuario</button>
      <button @click="activeView = 'list'">📋 Lista de Usuarios</button>
      <button class="logout" @click="logout">🚪 Cerrar sesión</button>
    </aside>

    <main class="main-content">
      <div v-if="activeView === 'welcome'" class="welcome">
        <h1>Bienvenido, Administrador</h1>
        <p>Selecciona una opción del menú lateral para comenzar.</p>
      </div>

      <UserRegister v-if="activeView === 'register'" />

      <div v-if="activeView === 'list'" class="user-list">
        <h2>👥 Usuarios Registrados</h2>
        <table class="user-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role?.name || 'Sin rol' }}</td>
              <td>
                <button class="delete-btn" @click="confirmDelete(user.id)">🗑️ Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import api from '../api';
import UserRegister from './RegisterForm.vue';

export default {
  components: { UserRegister },
  data() {
    return {
      activeView: 'welcome',
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    },
    async confirmDelete(userId) {
      const confirmed = window.confirm('¿Estás seguro que deseas eliminar este usuario?');
      if (!confirmed) return;

      try {
        await api.delete(`/users/${userId}`);
        this.users = this.users.filter(user => user.id !== userId);
        alert('Usuario eliminado con éxito');
      } catch (error) {
        console.error('Error eliminando usuario:', error);
        alert('Ocurrió un error al eliminar el usuario.');
      }
    },
    logout() {
      localStorage.removeItem('token');
      window.location.href = '/';
    },
  },
  watch: {
    activeView(newVal) {
      if (newVal === 'list') {
        this.fetchUsers();
      }
    },
  },
  async mounted() {
    try {
      await api.get('/users/me');
    } catch (error) {
      console.error('Token inválido o expirado:', error);
      alert('No autorizado. Redirigiendo al login...');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  },
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f8;
}

.sidebar {
  width: 240px;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 2rem;
  cursor: pointer;
  text-align: center;
}

.sidebar button {
  background-color: #34495e;
  border: none;
  color: white;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  text-align: left;
}

.sidebar button:hover {
  background-color: #3d566e;
}

.sidebar .logout {
  background-color: #e74c3c;
  margin-top: auto;
}

.sidebar .logout:hover {
  background-color: #c0392b;
}

.main-content {
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
}

.welcome {
  text-align: center;
  margin-top: 5rem;
}

.user-list {
  margin-top: 2rem;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.user-table th,
.user-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #3498db;
  color: white;
}

.user-table tr:hover {
  background-color: #f1f1f1;
}

.delete-btn {
  background-color: #e74c3c;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
