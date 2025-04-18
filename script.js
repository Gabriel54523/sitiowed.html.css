  // Llamamos a las secciones del HTML
const authSection = document.getElementById('auth-section');
const storeSection = document.getElementById('store');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

// Carrito de compras
let cart = [];

// Función para registrar al usuario
function register() {
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;

  // Verificamos si los campos están llenos
  if (username && password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert('Registro exitoso!');
    showStore();
  } else {
    alert('Por favor, ingresa todos los datos');
  }
}

// Función para iniciar sesión
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Verificamos si el usuario y contraseña coinciden
  if (username === storedUsername && password === storedPassword) {
    alert('Inicio de sesión exitoso!');
    showStore();
  } else {
    alert('Credenciales incorrectas');
  }
}

// Función para mostrar la tienda
function showStore() {
  // Ocultamos el formulario de inicio de sesión y registro
  authSection.style.display = 'none';

  // Mostramos la tienda con una animación
  storeSection.classList.remove('hidden');
  storeSection.classList.add('fade-in');
}

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
  const product = { name: productName, price: productPrice };
  cart.push(product);
  updateCart();
}

// Función para actualizar la lista del carrito
function updateCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';

  cart.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });
}
