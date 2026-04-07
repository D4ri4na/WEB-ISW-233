# 🍕 Web ISW-233 - Aplicación de Pedidos de Comida

## Problemas Corregidos ✅

### 1. ❌ Error "Cannot GET /products"
**Problema:** Cuando se accedía directamente a `/products` en la URL, el navegador intentaba hacer una solicitud al servidor para esa ruta, generando un error 404.

**Solución:** Se creó un servidor Express.js que sirve `index.html` para todas las rutas que no sean archivos estáticos, permitiendo que el Router del lado del cliente maneje la navegación.

### 2. ⏳ Productos no se cargaban correctamente
**Problema:** El `loadData()` se llamaba sin esperar (`await`), causando que el Router se inicializara antes de que los productos estuvieran disponibles.

**Solución:** Se agregó `await` en el evento `DOMContentLoaded` para garantizar que los datos estén listos antes de que se renderice cualquier componente.

## 🚀 Cómo Ejecutar

### Opción 1: Con Node.js (Recomendado)

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar el servidor:**
   ```bash
   npm start
   ```
   O usando:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - Ir a: `http://localhost:3000`

### Opción 2: Con Live Server (VS Code)

1. En VS Code, haz clic derecho en `index.html`
2. Selecciona "Open with Live Server"
3. Navega manualmente a `/` o `/products` usando los enlaces

## 📁 Estructura del Proyecto

```
WEB-ISW-233/
├── index.html          # Página principal de la SPA
├── index.js            # Punto de entrada de la app
├── index.css           # Estilos globales
├── server.js           # 🆕 Servidor Express para manejar SPA
├── package.json        # 🆕 Dependencias de Node.js
├── blocks/
│   ├── menuPage/       # Componente de página de menú
│   ├── productItem/    # Componente de tarjeta de producto
│   ├── footer.css
│   ├── nav.css
│   └── page.css
├── services/
│   ├── API.js          # Servicio para cargar datos
│   ├── Router.js       # Router del lado del cliente
│   ├── Store.js        # Estado global (Proxy)
│   ├── Menu.js         # Lógica de menú
│   ├── Order.js        # Lógica de órdenes
│   ├── Storage.js      # Persistencia en localStorage
│   └── Storaje.js      # (Revisar si es necesario)
├── data/
│   └── products.json   # Datos de productos
└── images/             # Imágenes de la app
```

## 🔧 Cambios Realizados

### `index.js`
- ✅ Agregado `await` a `loadData()` en el evento `DOMContentLoaded`
- ✅ Ahora espera a que los productos se carguen antes de inicializar el Router

### `blocks/menuPage/menuPage.js`
- ✅ Mejorado manejo de rutas CSS (intenta `/` y `./` rutas)
- ✅ Añadido validación para arrays vacíos
- ✅ Renderiza inmediatamente si ya hay datos disponibles

### `blocks/productItem/productItem.js`
- ✅ Agregado error handling para JSON.parse
- ✅ Verificaciones de existencia de elementos antes de actualizar
- ✅ Mejor manejo de atributos

### `server.js` (Nuevo)
- ✅ Express server que sirve archivos estáticos
- ✅ Fallback a `index.html` para todas las rutas no-estáticas
- ✅ Permite que el Router del cliente maneje la navegación

### `package.json` (Nuevo)
- ✅ Dependencias necesarias (express)
- ✅ Scripts de inicio

## 🌐 Cómo Funciona Ahora

1. **Usuario accede a** `http://localhost:3000/products`
2. **Servidor Express responde** con `index.html`
3. **JavaScript se carga** y ejecuta:
   - ✅ Espera a que se carguen los productos desde `data/products.json`
   - ✅ Inicializa el Router
   - ✅ Renderiza el componente `menu-page` con los productos
4. **Usuario ve** todos los productos correctamente
5. **No hay más error** "Cannot GET /products"

## ✨ Características

- 🔄 Single Page Application (SPA) funcional
- 🛒 Carrito de compras con localStorage
- 🌐 Enrutamiento del lado del cliente
- 📦 Web Components para modularidad
- 🎨 Estilos modernos y responsivos
- ⚡ Carga eficiente de datos

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
npm install
```

### Los productos no aparecen
- Abre la consola (F12) y busca errores
- Verifica que `data/products.json` exista
- Comprueba que la ruta del servidor sea correcta

### Error CORS
- Usa el servidor Express (npm start)
- No uses Live Server para evitar problemas de rutas

---

**Creado por:** Dariana Pol A.  
**Materia:** ISW-233  
**Semestre:** 5
