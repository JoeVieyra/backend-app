# 📦 Backend - API de Autenticación y Gestión de Empleados

Este backend proporciona una API REST para autenticación de usuarios, manejo de contraseñas, gestión de colaboradores y consumo de servicios externos. Desarrollado con **Node.js**, **Express** y base de datos **MongoDB**.

## 🚀 Requisitos

- Node.js 18 o superior
- npm o yarn
- MongoDB
- `.env` configurado 

## .Env

PORT=3000
DB_URI=mongodb://localhost:27017/miapp
JWT_SECRET=supersecreto123

## Endpoints principales

| Método | Ruta                        | Descripción         |
| ------ | --------------------------- | ------------------- |
| POST   | `/api/auth/register`        | Registro de usuario |
| POST   | `/api/auth/login`           | Inicio de sesión    |
| POST   | `/api/auth/change-password` | Cambiar contraseña  |
| GET    | `/api/empleados`            | Listar empleados    |
| POST   | `/api/empleados`            | Crear empleado      |
| PUT    | `/api/empleados/:id`        | Editar empleado     |
| DELETE | `/api/empleados/:id`        | Eliminar empleado   |



## 🔧 Instalación

### para bd ejecutar archivo seed.js

```bash
git clone https://github.com/JoeVieyra/backend-app
cd backend-app
npm install




