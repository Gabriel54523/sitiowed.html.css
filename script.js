 // Mostrar u ocultar contenido según sesión
window.onload = () => {
  const user = localStorage.getItem("user");
  if (user) {
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("auth").classList.add("hidden");
  } else {
    document.getElementById("auth").classList.remove("hidden");
    document.getElementById("app").classList.add("hidden");
  }
};

// Registro
function register() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);
    document.getElementById("auth-msg").textContent = "Registrado correctamente. Ahora inicia sesión.";
  } else {
    document.getElementById("auth-msg").textContent = "Completa todos los campos.";
  }
}

// Login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const storedUser = localStorage.getItem("user");
  const storedPass = localStorage.getItem("pass");

  if (user === storedUser && pass === storedPass) {
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("auth").classList.add("hidden");
  } else {
    document.getElementById("auth-msg").textContent = "Usuario o contraseña incorrectos.";
  }
}

// Cerrar sesión
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("pass");
  location.reload();
});
