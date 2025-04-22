 // Cargar usuario activo al iniciar
window.onload = () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    showMainPage(currentUser);
  }
};

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (!user || !pass) {
    alert('Ingrese usuario y contraseña');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || {};

  if (!users[user]) {
    users[user] = { password: pass, products: [] };
  } else if (users[user].password !== pass) {
    alert('Contraseña incorrecta');
    return;
  }

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', user);
  showMainPage(user);
}

function logout() {
  localStorage.removeItem('currentUser');
  location.reload();
}

function showMainPage(user) {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('main-container').classList.remove('hidden');
  document.getElementById('user-name').innerText = user;
  loadProducts();
}

function toggleProductForm() {
  document.getElementById('product-form').classList.toggle('hidden');
}

function addProduct() {
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const category = document.getElementById('product-category').value;
  const description = document.getElementById('product-description').value;
  const imageInput = document.getElementById('product-image');

  if (!name || !price || !category) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imageData = reader.result;

    const user = localStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users'));

    users[user].products.push({
      name,
      price,
      category,
      description,
      image: imageData
    });

    localStorage.setItem('users', JSON.stringify(users));
    clearForm();
    loadProducts();
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onload();
  }
}

function clearForm() {
  document.getElementById('product-name').value = '';
  document.getElementById('product-price').value = '';
  document.getElementById('product-category').value = '';
  document.getElementById('product-description').value = '';
  document.getElementById('product-image').value = '';
}

function loadProducts(filter = '') {
  const user = localStorage.getItem('currentUser');
  let users = JSON.parse(localStorage.getItem('users'));
  let products = users[user].products;

  if (filter) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const list = document.getElementById('product-list');
  const count = document.getElementById('product-count');
  list.innerHTML = '';
  count.innerText = products.length;

  products.forEach((prod, index) => {
    let item = document.createElement('li');
    item.innerHTML = `
      <strong>${prod.name}</strong>
      <span>Precio: $${prod.price}</span>
      <span>Categoría: ${prod.category}</span>
      <span>${prod.description}</span>
      ${prod.image ? `<img src="${prod.image}" alt="Imagen del producto">` : ''}
      <div class="product-buttons">
        <button class="edit" onclick="editProduct(${index})">Editar</button>
        <button onclick="deleteProduct(${index})">Eliminar</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function deleteProduct(index) {
  if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

  const user = localStorage.getItem('currentUser');
  let users = JSON.parse(localStorage.getItem('users'));
  users[user].products.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(users));
  loadProducts();
}

function editProduct(index) {
  const user = localStorage.getItem('currentUser');
  let users = JSON.parse(localStorage.getItem('users'));
  let prod = users[user].products[index];

  document.getElementById('product-name').value = prod.name;
  document.getElementById('product-price').value = prod.price;
  document.getElementById('product-category').value = prod.category;
  document.getElementById('product-description').value = prod.description;

  document.getElementById('product-form').classList.remove('hidden');

  deleteProduct(index);
}

function searchProduct() {
  const query = document.getElementById('search').value;
  loadProducts(query);
}

function clearAllProducts() {
  if (!confirm("¿Eliminar TODOS los productos? Esta acción no se puede deshacer.")) return;

  const user = localStorage.getItem('currentUser');
  let users = JSON.parse(localStorage.getItem('users'));
  users[user].products = [];
  localStorage.setItem('users', JSON.stringify(users));
  loadProducts();
}
