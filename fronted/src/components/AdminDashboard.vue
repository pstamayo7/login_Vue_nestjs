<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <h2 @click="activeView = 'welcome'" style="cursor: pointer">Panel de Administración</h2>
      <button @click="activeView = 'register'">Crear Usuario</button>
      <button @click="activeView = 'list'">Lista de Usuarios</button>
      <button @click="logout">Cerrar sesión</button>
    </aside>

    <main class="main-content">
      <div v-if="activeView === 'welcome'">
        <h1>Bienvenido, Admin</h1>
        <p>Selecciona una opción del menú para comenzar.</p>
      </div>

      <UserRegister v-if="activeView === 'register'" />

      <div v-if="activeView === 'list'">
        <h2>Usuarios Registrados</h2>
        <table>
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
      <td>{{ user.role?.name }}</td>
      <td>
        <button @click="confirmDelete(user.id)">Eliminar</button>
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
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.user-table th,
.user-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
</style>



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
