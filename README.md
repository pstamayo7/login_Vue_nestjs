# login_Vue_nestjs
Proyecto de login usando Vue.js en el frontend y NestJS en el backend con JWT


Proyecto Administración de Usuarios con NestJS y Vue.js
Descripción
Este proyecto es una aplicación fullstack para la gestión de usuarios con autenticación basada en JWT, roles (admin y usuario), dashboards diferenciados, y manejo CRUD básico de usuarios.
El backend está hecho con NestJS y el frontend con Vue.js.

Funcionalidades principales
Registro de usuarios con asignación de roles.

Login con JWT.

Control de acceso por roles (admin y usuario).

Dashboard de administración con listado, creación y eliminación de usuarios (solo admins).

Dashboard para usuarios normales con visualización de sus datos.

Logout para cerrar sesión.

Documentación automática con Swagger (backend).

Tecnologías usadas
Backend
NestJS

TypeORM

JWT para autenticación

Swagger para documentación

Frontend
Vue.js

Axios para llamadas HTTP

jwt-decode para decodificar tokens en frontend

Instalación y ejecución
Backend
bash
Copiar
Editar
cd backend
npm install
npm run start:dev
El backend correrá por defecto en http://localhost:3000.

Frontend
bash
Copiar
Editar
cd frontend
npm install
npm run serve
El frontend correrá por defecto en http://localhost:8080.

Uso
Registrar un usuario (con rol asignado).

Iniciar sesión con email y contraseña.

Según el rol, se redirige a:

AdminDashboard: gestionar usuarios.

UserDashboard: ver sus datos.

Usar botón de logout para cerrar sesión.

Endpoints principales
POST /auth/register: registrar nuevo usuario.

POST /auth/login: login y obtención de JWT.

GET /users/me: obtener datos del usuario autenticado.

GET /users: obtener lista de usuarios (solo admins).

DELETE /users/:id: eliminar usuario (solo admins).

La documentación Swagger está disponible en /api (puedes acceder cuando el backend esté corriendo).

Estructura del proyecto
backend/: código NestJS (controladores, servicios, entidades, auth, roles)

frontend/: código Vue.js (componentes, páginas, manejo de token, rutas)

Notas
La clave secreta JWT está actualmente hardcodeada en JwtStrategy. Se recomienda usar variables de entorno en producción.

Las rutas protegidas usan guardias de NestJS para controlar el acceso.

El token JWT incluye el rol del usuario para validaciones en frontend.

Autor
Tu Nombre - Pstamayo7

