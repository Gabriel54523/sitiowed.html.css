 // Ejemplo de productos
const products = [
  { id: 1, name: 'Zapato Deportivo', price: 40, image: 'shoe1.jpg' },
  { id: 2, name: 'Camisa Formal', price: 20, image: 'shirt1.jpg' },
  { id: 3, name: 'Pantalón de Mezclilla', price: 25, image: 'pants1.jpg' },
  // Agregar más productos aquí
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  renderCart();
  
  // Eventos de inicio de sesión y registro
  document.getElementById('loginBtn').addEventListener('click', showLogin);
  document.getElementById('registerBtn').addEventListener('click', showRegister);
  document.getElementById('checkoutBtn').addEventListener('click', showOrderForm);

  // Evento de búsqueda
  document.getElementById('search').addEventListener('input', searchProducts);
  
  // Evento de envío del formulario de pedido
  document.getElementById('orderFormContent')?.addEventListener('submit', handleOrderSubmit);
});

// Función para mostrar productos
function renderProducts(products) {
  const categoryDiv = document.getElementById('product-category');
  categoryDiv.innerHTML = '';

  products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Precio: $${product.price}</p>
          <button onclick="addToCart(${product.id})">Agregar al carrito</button>
      `;
      categoryDiv.appendChild(productElement);
  });
}

// Función para agregar productos al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Función para renderizar carrito
function renderCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';

  cart.forEach(product => {
      const cartItem = document.createElement('li');
      cartItem.textContent = `${product.name} - $${product.price}`;
      cartList.appendChild(cartItem);
  });
}

// Función para mostrar el formulario de pedido
function showOrderForm() {
  document.getElementById('orderForm').classList.remove('hidden');
}

// Función para manejar el envío del formulario
function handleOrderSubmit(event) {
  event.preventDefault();

  const order = {
      fullName: document.getElementById('fullName').value,
      idNumber: document.getElementById('idNumber').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phoneNumber').value
  };

  localStorage.setItem('order', JSON.stringify(order));
  alert('Pedido realizado con éxito');
  cart = []; // Limpiar carrito
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  document.getElementById('orderForm').classList.add('hidden');
}

// Función de búsqueda de productos
function searchProducts(event) {
  const query = event.target.value.toLowerCase();
  const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query)
  );
  renderProducts(filteredProducts);
}

// Funciones de inicio de sesión y registro (por ahora solo muestran alertas)
function showLogin() {
  alert('Mostrar formulario de inicio de sesión');
}

function showRegister() {
  alert('Mostrar formulario de registro');
}
