// js/carrito.js

// Helpers de carrito
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito-levelup")) || [];
}
function guardarCarrito(carrito) {
  localStorage.setItem("carrito-levelup", JSON.stringify(carrito));
}

const contenedorCarrito = document.querySelector(".carrito-productos");
const carritoVacio = document.querySelector(".carrito-vacio");
const totalElemento = document.querySelector("#total");
const numerito = document.querySelector(".numerito");

let carrito = obtenerCarrito();

function renderizarCarrito() {
  if (!contenedorCarrito) return;

  if (carrito.length === 0) {
    carritoVacio.style.display = "block";
    contenedorCarrito.innerHTML = "";
    totalElemento.textContent = "$0";
    return;
  }

  carritoVacio.style.display = "none";

  contenedorCarrito.innerHTML = carrito.map(item => `
    <div class="carrito-producto">
      <img src="${item.imagen}" alt="${item.nombre}" class="carrito-producto-imagen">
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
  if (e.target.closest(".carrito-producto-eliminar")) {
    const codigo = e.target.closest(".carrito-producto-eliminar").dataset.codigo;
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
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalElemento.textContent = `$${total.toLocaleString("es-CL")}`;
}

function actualizarNumerito() {
  const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  if (numerito) numerito.textContent = totalItems;
}

// Init
renderizarCarrito();
actualizarNumerito();
