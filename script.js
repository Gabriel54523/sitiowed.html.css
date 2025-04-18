document.addEventListener('DOMContentLoaded', () => {
  // Si ya ha iniciado sesión antes
  if (localStorage.getItem('loggedIn') === 'true') {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('store').classList.remove('hidden');
    initStore();
  }

  // 🔐 Registro
  function register() {
    const user = document.getElementById('reg-username').value;
    const pass = document.getElementById('reg-password').value;
    if (user && pass) {
      localStorage.setItem('user', JSON.stringify({ user, pass }));
      alert('✅ Registro exitoso. Ahora inicia sesión.');
    } else {
      alert('❌ Completa todos los campos.');
    }
  }
  window.register = register;

  // 🔐 Login
  function login() {
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;
    const stored = JSON.parse(localStorage.getItem('user'));

    if (stored && user === stored.user && pass === stored.pass) {
      localStorage.setItem('loggedIn', 'true');
      document.getElementById('auth-section').classList.add('hidden');
      document.getElementById('store').classList.remove('hidden');
      initStore();
    } else {
      alert('❌ Usuario o contraseña incorrectos.');
    }
  }
  window.login = login;

  // 🛒 Carrito
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // 🧺 Categorías y productos
  const categories = {
    Zapatos: [],
    Ropa: [],
    Accesorios: []
  };

  // Generar 10 productos por categoría
  Object.keys(categories).forEach(cat => {
    for (let i = 1; i <= 10; i++) {
      categories[cat].push({
        id: `${cat}-${i}`,
        name: `${cat} ${i}`,
        price: (Math.random() * 100 + 10).toFixed(2),
        image: 'https://via.placeholder.com/150'
      });
    }
  });

  function initStore() {
    renderAllCategories();
    renderCart();
  }

  // 🔍 Búsqueda
  document.getElementById('search').addEventListener('input', function () {
    const term = this.value.toLowerCase();
    renderAllCategories(term);
  });

  function renderAllCategories(filter = "") {
    Object.entries(categories).forEach(([catName, products]) => {
      const container = document.getElementById(`cat-${catName.toLowerCase()}`);
      container.innerHTML = "";

      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(filter)
      );

      filtered.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('product');
        item.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>$${product.price}</p>
          <button onclick="addToCart('${product.id}')">Agregar al carrito</button>
        `;
        container.appendChild(item);
      });
    });
  }

  window.addToCart = function(productId) {
    const product = findProductById(productId);
    if (product) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  };

  function findProductById(id) {
    for (let cat in categories) {
      const product = categories[cat].find(p => p.id === id);
      if (product) return product;
    }
    return null;
  }

  function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} - $${p.price}`;
      cartList.appendChild(li);
    });
  }

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    document.getElementById('orderForm').classList.remove('hidden');
  });

  document.getElementById('orderFormContent').addEventListener('submit', function (e) {
    e.preventDefault();
    const order = {
      fullName: document.getElementById('fullName').value,
      idNumber: document.getElementById('idNumber').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      cart: cart
    };

    localStorage.setItem('order', JSON.stringify(order));
    alert('✅ Pedido enviado con éxito');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    this.reset();
    document.getElementById('orderForm').classList.add('hidden');
  });

});
