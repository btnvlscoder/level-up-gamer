// js/carrito.js

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito-levelup")) || [];
}
function guardarCarrito(carrito) {
  localStorage.setItem("carrito-levelup", JSON.stringify(carrito));
}

// Función para obtener el usuario actual (para el descuento)
function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

const contenedorCarrito = document.querySelector(".carrito-productos");
const carritoVacio = document.querySelector(".carrito-vacio");
const totalElemento = document.querySelector("#total");
const numerito = document.querySelector(".numerito");

let carrito = obtenerCarrito();

function renderizarCarrito() {
  if (!contenedorCarrito) return;

  if (!carrito.length) {
    carritoVacio.style.display = "block";
    contenedorCarrito.innerHTML = "";
    totalElemento.textContent = "$0";
    return;
  }

  carritoVacio.style.display = "none";

  contenedorCarrito.innerHTML = carrito.map(item => `
    <div class="carrito-producto">
      <img src="${item.imagen || (item.imagenes ? item.imagenes[0] : '')}" 
           alt="${item.nombre}" 
           class="carrito-producto-imagen">
      <div class="carrito-producto-nombre">
        <h3>${item.nombre}</h3>
        <p class="marca">${item.marca || ""}</p>
      </div>
      <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p>${item.cantidad}</p>
      </div>
      <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>$${Number(item.precio).toLocaleString("es-CL")}</p>
      </div>
      <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p>$${(item.precio * item.cantidad).toLocaleString("es-CL")}</p>
      </div>
      <button class="carrito-producto-eliminar" data-codigo="${item.codigo}">
        <i class="bi bi-trash-fill"></i>
      </button>
    </div>
  `).join("");

  actualizarTotal();
}

document.addEventListener("click", (e) => {
  const btnEliminar = e.target.closest(".carrito-producto-eliminar");
  if (btnEliminar) {
    const codigo = btnEliminar.dataset.codigo;
    carrito = carrito.filter(p => p.codigo !== codigo);
    guardarCarrito(carrito);
    renderizarCarrito();
    actualizarNumerito();
  }

  if (e.target.closest(".carrito-acciones-vaciar")) {
    carrito = [];
    guardarCarrito(carrito);
    renderizarCarrito();
    actualizarNumerito();
  }
});

function actualizarTotal() {
  const user = getCurrentUser();
  const descuento = user && user.isDuoc ? 0.2 : 0; // 20% de descuento para Duoc
  
  const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const totalConDescuento = subtotal * (1 - descuento);
  
  // Mostrar ambos valores si hay descuento
  if (descuento > 0) {
    totalElemento.innerHTML = `
      <p style="text-decoration: line-through; color: var(--clr-gray);">$${subtotal.toLocaleString("es-CL")}</p>
      <p style="color: var(--clr-accent-green);">$${totalConDescuento.toLocaleString("es-CL")}</p>
      <small style="color: var(--clr-accent-blue);">Descuento Duoc (20%) aplicado</small>
    `;
  } else {
    totalElemento.textContent = `$${subtotal.toLocaleString("es-CL")}`;
  }
  
  return totalConDescuento;
}

function actualizarNumerito() {
  const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  if (numerito) numerito.textContent = totalItems;
}

// Init
renderizarCarrito();
actualizarNumerito();