
# Proyecto Administración de Usuarios con NestJS y Vue.js

## 📝 Descripción

Este proyecto es una aplicación **fullstack** para la gestión de usuarios con autenticación basada en **JWT**, roles (**admin** y **usuario**), dashboards diferenciados, y manejo **CRUD básico de usuarios**.  
El **backend** está hecho con **NestJS** y el **frontend** con **Vue.js**.

---

## 🚀 Funcionalidades principales

- ✅ Registro de usuarios con asignación de roles
- 🔐 Login con JWT
- 🔒 Control de acceso por roles (admin y usuario)
- 🧑‍💼 Dashboard de administración: listado, creación y eliminación de usuarios (solo admins)
- 👤 Dashboard para usuarios normales con visualización de sus datos
- 🚪 Logout para cerrar sesión
- 📚 Documentación automática con Swagger (`/api`)

---

## 🛠 Tecnologías usadas

### Backend

- [NestJS](https://nestjs.com/)
- TypeORM
- JWT (Json Web Token)
- Swagger

### Frontend

- [Vue.js](https://vuejs.org/)
- Axios
- jwt-decode

---

## ⚙️ Instalación y ejecución

### 📦 Backend

```bash
cd backend
npm install
npm run start:dev
```

El backend correrá en: `http://localhost:3000`

### 💻 Frontend

```bash
cd frontend
npm install
npm run serve
```

El frontend correrá en: `http://localhost:8080`

---

## 🧪 Uso

1. Registrar un usuario (con rol asignado)
2. Iniciar sesión con email y contraseña
3. Según el rol, se redirige a:
   - 🧑‍💼 AdminDashboard: gestionar usuarios
   - 👤 UserDashboard: ver sus datos
4. Usar botón de logout para cerrar sesión

---

## 📌 Endpoints principales

- `POST /auth/register`: registrar nuevo usuario
- `POST /auth/login`: login y obtención de JWT
- `GET /users/me`: obtener datos del usuario autenticado
- `GET /users`: obtener lista de usuarios (solo admins)
- `DELETE /users/:id`: eliminar usuario (solo admins)

La documentación Swagger está disponible en: `http://localhost:3000/api`

---

## 📁 Estructura del proyecto

```
backend/   → código NestJS (controladores, servicios, entidades, auth, roles)
frontend/  → código Vue.js (componentes, pantallas, manejo de token)
```

---

## ⚠️ Notas

- La clave secreta JWT está actualmente hardcodeada en `JwtStrategy`. Se recomienda usar variables de entorno en producción (`.env`).
- Las rutas protegidas usan `JwtAuthGuard` y validación por rol para controlar el acceso.

---

## ✍️ Autor

**Tu Nombre**  
https://github.com/pstamayo7

---


