let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
const productos = [
  { id: 1, nombre: "Zapatos deportivos", categoria: "zapatos", precio: 50 },
  { id: 2, nombre: "Zapatos elegantes", categoria: "zapatos", precio: 80 },
  { id: 3, nombre: "Camiseta", categoria: "ropa", precio: 25 },
  { id: 4, nombre: "Pantalón", categoria: "ropa", precio: 40 },
  { id: 5, nombre: "Smartphone", categoria: "electronica", precio: 600 },
  { id: 6, nombre: "Laptop", categoria: "electronica", precio: 1000 },
  { id: 7, nombre: "Pan", categoria: "alimentos", precio: 2 },
  { id: 8, nombre: "Leche", categoria: "alimentos", precio: 3 }
];

function mostrarRegistro() {
  document.getElementById('login').classList.add('hidden');
  document.getElementById('registro').classList.remove('hidden');
}

function mostrarLogin() {
  document.getElementById('registro').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}

function registrarUsuario(event) {
  event.preventDefault();
  const usuario = document.getElementById('registro-usuario').value;
  const clave = document.getElementById('registro-clave').value;
  if (usuarios[usuario]) {
    alert("Este usuario ya existe.");
    return;
  }
  usuarios[usuario] = clave;
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert("Usuario registrado correctamente.");
  mostrarLogin();
}

function iniciarSesion(event) {
  event.preventDefault();
  const usuario = document.getElementById('login-usuario').value;
  const clave = document.getElementById('login-clave').value;
  if (usuarios[usuario] && usuarios[usuario] === clave) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('tienda').classList.remove('hidden');
    mostrarProductos();
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

function mostrarProductos() {
  const categorias = {
    zapatos: document.getElementById("productos-zapatos"),
    ropa: document.getElementById("productos-ropa"),
    electronica: document.getElementById("productos-electronica"),
    alimentos: document.getElementById("productos-alimentos"),
  };

  for (let key in categorias) categorias[key].innerHTML = '';

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `<h3>${p.nombre}</h3><p>$${p.precio}</p><button onclick="agregarAlCarrito(${p.id})">Agregar</button>`;
    categorias[p.categoria].appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert("Producto agregado al carrito.");
}

function verCarrito() {
  const lista = document.getElementById("carrito-lista");
  lista.innerHTML = '';
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    lista.appendChild(li);
  });
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  document.getElementById("total-carrito").textContent = `Total: $${total}`;
  document.getElementById("tienda").classList.add("hidden");
  document.getElementById("carrito").classList.remove("hidden");
}

function realizarPago() {
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  if (total === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  document.getElementById("monto-total").textContent = `$${total}`;
  document.getElementById("carrito").classList.add("hidden");
  document.getElementById("seccion-pago").classList.remove("hidden");
}

function confirmarPago(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre-titular").value;
  const confirmacion = document.getElementById("numero-confirmacion").value;
  if (!nombre || !confirmacion) {
    alert("Completa todos los campos.");
    return;
  }
  alert("✅ Pago confirmado. Gracias por tu compra.");
  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
  document.getElementById("seccion-pago").classList.add("hidden");
  document.getElementById("tienda").classList.remove("hidden");
  mostrarProductos();
}

function cancelarPago() {
  document.getElementById("seccion-pago").classList.add("hidden");
  document.getElementById("carrito").classList.remove("hidden");
}

function volverATienda() {
  document.getElementById("carrito").classList.add("hidden");
  document.getElementById("tienda").classList.remove("hidden");
}

function cambiarTema() {
  const tema = document.getElementById("theme").value;
  if (tema === "oscuro") {
    document.body.style.backgroundColor = "#222";
    document.body.style.color = "#fff";
  } else if (tema === "claro") {
    document.body.style.backgroundColor = "#f0f0f0";
    document.body.style.color = "#000";
  } else {
    document.body.style.backgroundColor = "#ff6f61";
    document.body.style.color = "#333";
  }
}
