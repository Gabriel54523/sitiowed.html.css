 // Variables globales
let productos = [];

// Función para iniciar sesión
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Aquí puedes agregar un sistema de validación de login (puedes almacenar en el localStorage)
  if (username && password) {
    localStorage.setItem("usuario", username);
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("main-container").classList.remove("hidden");
    document.getElementById("user-name").textContent = username;
  } else {
    alert("Por favor, ingresa tu nombre de usuario y contraseña.");
  }
}

// Función para cerrar sesión
function logout() {
  localStorage.removeItem("usuario");
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("main-container").classList.add("hidden");
}

// Función para mostrar/ocultar el formulario de producto
function toggleProductForm() {
  const form = document.getElementById("product-form");
  form.classList.toggle("hidden");
}

// Función para agregar un producto
function addProduct() {
  const productName = document.getElementById("product-name").value;
  const productPrice = document.getElementById("product-price").value;
  const productCategory = document.getElementById("product-category").value;
  const productDescription = document.getElementById("product-description").value;
  const productImage = document.getElementById("product-image").files[0];

  // Validar los campos
  if (productName && productPrice && productCategory) {
    const newProduct = {
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDescription,
      image: productImage ? URL.createObjectURL(productImage) : null,
    };

    productos.push(newProduct);
    updateProductList();
    resetProductForm();
  } else {
    alert("Por favor, completa todos los campos obligatorios.");
  }
}

// Función para resetear el formulario de producto
function resetProductForm() {
  document.getElementById("product-name").value = '';
  document.getElementById("product-price").value = '';
  document.getElementById("product-category").value = '';
  document.getElementById("product-description").value = '';
  document.getElementById("product-image").value = '';
  document.getElementById("product-form").classList.add("hidden");
}

// Función para actualizar la lista de productos
function updateProductList() {
  const productList = document.getElementById("product-list");
  const productCount = document.getElementById("product-count");

  // Limpiar la lista actual
  productList.innerHTML = '';

  // Agregar productos a la lista
  productos.forEach((product, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h4>${product.name}</h4>
      <p>${product.category} - $${product.price}</p>
      <p>${product.description}</p>
      ${product.image ? `<img src="${product.image}" alt="${product.name}" width="100">` : ''}
      <button onclick="deleteProduct(${index})">Eliminar</button>
    `;
    productList.appendChild(li);
  });

  // Actualizar el contador de productos
  productCount.textContent = productos.length;
}

// Función para eliminar un producto
function deleteProduct(index) {
  productos.splice(index, 1);
  updateProductList();
}

// Función para buscar productos
function searchProduct() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredProducts = productos.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );

  // Actualizar la lista con los productos filtrados
  const productList = document.getElementById("product-list");
  productList.innerHTML = '';

  filteredProducts.forEach((product, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h4>${product.name}</h4>
      <p>${product.category} - $${product.price}</p>
      <p>${product.description}</p>
      ${product.image ? `<img src="${product.image}" alt="${product.name}" width="100">` : ''}
      <button onclick="deleteProduct(${index})">Eliminar</button>
    `;
    productList.appendChild(li);
  });

  // Actualizar el contador de productos
  document.getElementById("product-count").textContent = filteredProducts.length;
}

// Función para eliminar todos los productos
function clearAllProducts() {
  productos = [];
  updateProductList();
}
