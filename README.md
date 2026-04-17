# ⚙️ UrbanEats Backend

API REST desarrollada con Node.js y Express para gestionar usuarios, restaurantes, productos y pedidos, incluyendo autenticación mediante JWT y control de roles (usuario/admin).

---

### 🌐 Base URL

```
https://urban-eats-server-smoky.vercel.app
```

---

### 🛠️ Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

---

### ⚙️ Instalación

```bash
git clone https://github.com/bryanpf93/UrbanEats-server.git
cd UrbanEats-server
npm install
```

Crear archivo `.env`:

```env
MONGODB_URI=your_mongo_uri
TOKEN_SECRET=your_secret
```

Ejecutar servidor:

```bash
npm run dev
```

---

### 🔐 Autenticación y roles

La API utiliza JWT para proteger rutas.

Enviar token en headers:

```
Authorization: Bearer <token>
```

### Roles:
- 👤 Usuario → pedidos y perfil
- 🛠️ Admin → gestión de restaurantes y productos

---

### 📡 Endpoints

---

### 🔐 Auth

| Método | Endpoint | Descripción |
|--------|----------|------------|
| POST | `/auth/signup` | Registro de usuario |
| POST | `/auth/login` | Inicio de sesión |

---

### 🍔 Restaurantes

### 🌍 Público
| Método | Endpoint | Descripción |
|--------|----------|------------|
| GET | `/restaurants` | Obtener todos los restaurantes |
| GET | `/restaurants/:restaurantId` | Obtener detalle de un restaurante |

### 🛠️ Admin
| Método | Endpoint | Descripción |
|--------|----------|------------|
| POST | `/restaurants` | Crear restaurante |
| PUT | `/restaurants/:restaurantId` | Editar restaurante |
| DELETE | `/restaurants/:restaurantId` | Eliminar restaurante |

---

### 🍽️ Productos

### 🌍 Público
| Método | Endpoint | Descripción |
|--------|----------|------------|
| GET | `/restaurants/:restaurantId/products` | Obtener productos de un restaurante |
| GET | `/products/:productId` | Obtener detalle de un producto |

### 🛠️ Admin
| Método | Endpoint | Descripción |
|--------|----------|------------|
| POST | `/restaurants/:restaurantId/products` | Crear producto |
| PUT | `/products/:productId` | Editar producto |
| DELETE | `/products/:productId` | Eliminar producto |

---

### 🛒 Pedidos (Usuario autenticado)

| Método | Endpoint | Descripción |
|--------|----------|------------|
| POST | `/orders` | Crear pedido |
| GET | `/orders/user` | Obtener pedidos del usuario |
| GET | `/orders/:orderId` | Obtener detalle de un pedido |
| PUT | `/orders/:orderId/status` | Actualizar estado del pedido |
| DELETE | `/orders/:orderId` | Eliminar pedido |

---

### 🧱 Estructura del proyecto

```
models/
routes/
middleware/
config/
server.js
```

---

### 📚 Aprendizajes

- Creación de APIs REST
- Autenticación con JWT
- Control de acceso por roles (admin/user)
- Modelado de datos con MongoDB
- Validación de datos en backend

---

### 🚀 Mejoras futuras

- ⭐ Sistema de valoraciones
- ❤️ Favoritos
- 📊 Panel de administración
- 🌍 Multi-idioma

---

### 👤 Autor

- Bryan Santiago Paucarima Franco - Ironhack
- https://www.linkedin.com/in/bryanpf93/