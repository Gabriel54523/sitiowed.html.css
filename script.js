 // script.js

// Simulación de usuarios (puedes extender esto o vincularlo a un back-end luego)
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const mainPage = document.getElementById("main-page");
  const productSection = document.getElementById("product-section");
  const productList = document.getElementById("product-list");
  const carritoList = document.getElementById("carrito-list");
  const totalSpan = document.getElementById("total");
  const orderForm = document.getElementById("order-form");
  const logoutBtn = document.getElementById("logout-btn");

  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    mostrarPaginaPrincipal();
  }

  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const user = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

    if (!user || !pass) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!usuarios[user]) {
      usuarios[user] = { password: pass };
      alert("Usuario registrado con éxito.");
    } else if (usuarios[user].password !== pass) {
      alert("Contraseña incorrecta.");
      return;
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("currentUser", user);
    mostrarPaginaPrincipal();
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("carrito");
    location.reload();
  });

  function mostrarPaginaPrincipal() {
    document.getElementById("login-page").classList.add("hidden");
    mainPage.classList.remove("hidden");
    cargarProductos();
    actualizarCarrito();
  }

  function cargarProductos() {
    productos.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p>Precio: $${p.precio}</p>
        <p>Stock: <span id="stock-${p.id}">${p.stock}</span></p>
        <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
      `;
      productList.appendChild(card);
    });
  }

  window.agregarAlCarrito = function (id) {
    const producto = obtenerProducto(id);
    if (producto.stock <= 0) {
      alert("Producto sin stock");
      return;
    }

    const carrito = obtenerCarrito();
    const item = carrito.find(p => p.id === id);
    if (item) {
      item.cantidad++;
    } else {
      carrito.push({ id, cantidad: 1 });
    }

    producto.stock--;
    document.getElementById(`stock-${id}`).innerText = producto.stock;

    guardarCarrito(carrito);
    actualizarCarrito();
  };

  function actualizarCarrito() {
    const carrito = obtenerCarrito();
    carritoList.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
      const producto = obtenerProducto(item.id);
      total += producto.precio * item.cantidad;

      const li = document.createElement("li");
      li.innerHTML = `
        ${producto.nombre} - $${producto.precio} x ${item.cantidad}
        <button onclick="sumar(${item.id})">+</button>
        <button onclick="restar(${item.id})">-</button>
      `;
      carritoList.appendChild(li);
    });

    totalSpan.innerText = total;
  }

  window.sumar = function (id) {
    const carrito = obtenerCarrito();
    const producto = obtenerProducto(id);
    const item = carrito.find(p => p.id === id);

    if (producto.stock <= 0) {
      alert("No hay más stock disponible");
      return;
    }

    item.cantidad++;
    producto.stock--;
    document.getElementById(`stock-${id}`).innerText = producto.stock;

    guardarCarrito(carrito);
    actualizarCarrito();
  };

  window.restar = function (id) {
    let carrito = obtenerCarrito();
    const producto = obtenerProducto(id);
    const item = carrito.find(p => p.id === id);

    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      carrito = carrito.filter(p => p.id !== id);
    }

    producto.stock++;
    document.getElementById(`stock-${id}`).innerText = producto.stock;

    guardarCarrito(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  };

  orderForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("¡Pedido realizado con éxito!");
    localStorage.removeItem("carrito");
    location.reload();
  });
});
