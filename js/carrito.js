// STORAGE
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito-levelup")) || [];
}
function guardarCarrito(carrito) {
  localStorage.setItem("carrito-levelup", JSON.stringify(carrito));
}
function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

// GLOBAL CONST & VARS
const contenedorCarrito = document.querySelector(".carrito-productos");
const carritoVacio = document.querySelector(".carrito-vacio");
const totalElemento = document.querySelector("#total");
const numerito = document.querySelector(".numerito");
let carrito = obtenerCarrito();

// RENDER MAIN
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
    <div class="carrito-producto" data-codigo="${item.codigo}">
      <img src="${item.imagenes ? item.imagenes[0] : ''}" 
           alt="${item.nombre}" 
           class="carrito-producto-imagen">
      <div class="carrito-producto-info">
        <h3 class="carrito-producto-nombre">${item.nombre}</h3>
        <p class="carrito-producto-marca">${item.marca || ""}</p>
      </div>
      <div class="carrito-producto-precio-container">
        <span class="etiqueta-precio">Precio</span>
        <span class="carrito-producto-precio">$${Number(item.precio).toLocaleString("es-CL")}</span>
      </div>
      <div class="carrito-producto-cantidad-container">
        <span class="etiqueta-cantidad">Cantidad</span>
        <div class="carrito-producto-controls">
          <button class="cantidad-btn menos" data-codigo="${item.codigo}">-</button>
          <input type="number" class="cantidad-numero" value="${item.cantidad}" min="1" data-codigo="${item.codigo}">
          <button class="cantidad-btn mas" data-codigo="${item.codigo}">+</button>
        </div>
      </div>
      <div class="carrito-producto-subtotal-container">
        <span class="etiqueta-subtotal">Subtotal</span>
        <span class="carrito-producto-subtotal">$${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
      </div>
      <div class="carrito-producto-eliminar-container">
        <span class="etiqueta-eliminar">Eliminar</span>
        <button class="carrito-producto-eliminar" data-codigo="${item.codigo}">
          <i class="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  `).join("");

  // LISTENER BTN CANTIDAD
  document.querySelectorAll('.cantidad-btn.menos').forEach(btn => {
    btn.addEventListener('click', () => disminuirCantidad(btn.dataset.codigo));
  });
  document.querySelectorAll('.cantidad-btn.mas').forEach(btn => {
    btn.addEventListener('click', () => aumentarCantidad(btn.dataset.codigo));
  });
  document.querySelectorAll('.cantidad-numero').forEach(input => {
    input.addEventListener('change', (e) => {
      const codigo = e.target.dataset.codigo;
      const nuevaCantidad = parseInt(e.target.value);
      if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
        e.target.value = 1;
        actualizarCantidad(codigo, 1);
      } else {
        actualizarCantidad(codigo, nuevaCantidad);
      }
    });
  });

  // LISTENER BTN VACIAR CARRITO
  document.querySelector('.btn-vaciar').addEventListener('click', vaciarCarrito);

  // LISTENER BTN COMPRAR
  document.querySelector('.btn-comprar').addEventListener('click', comprar);

  actualizarTotal();
}

// CANTIDADES
function disminuirCantidad(codigo) {
  const item = carrito.find(item => item.codigo === codigo);
  if (item && item.cantidad > 1) {
    item.cantidad--;
    guardarCarrito(carrito);
    renderizarCarrito();
    actualizarNumerito();
  }
}
function aumentarCantidad(codigo) {
  const item = carrito.find(item => item.codigo === codigo);
  if (item) {
    item.cantidad++;
    guardarCarrito(carrito);
    renderizarCarrito();
    actualizarNumerito();
  }
}
function actualizarCantidad(codigo, nuevaCantidad) {
  const item = carrito.find(item => item.codigo === codigo);
  if (item) {
    item.cantidad = nuevaCantidad;
    guardarCarrito(carrito);
    renderizarCarrito();
    actualizarNumerito();
  }
}

// DELEGATION TO DELETE PRODS
document.addEventListener("click", (e) => {
  if (e.target.closest(".carrito-producto-eliminar")) {
    eliminarProducto(e.target.closest(".carrito-producto-eliminar").dataset.codigo);
  }
});

// CRUD CARRITO
function eliminarProducto(codigo) {
  carrito = carrito.filter(p => p.codigo !== codigo);
  guardarCarrito(carrito);
  renderizarCarrito();
  actualizarNumerito();
  mostrarMensaje('Producto eliminado del carrito');
}
function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    carrito = [];
    guardarCarrito(carrito);
    renderizarCarrito();
    actualizarNumerito();
    mostrarMensaje('Carrito vaciado');
  }
}
function comprar() {
  if (carrito.length === 0) {
    mostrarMensaje('El carrito está vacío');
    return;
  }
  generarVoucher();
  document.getElementById('voucherSimple').style.display = 'flex';
  carrito = [];
  guardarCarrito(carrito);
  renderizarCarrito();
  actualizarNumerito();
}

// VOUCHER
function generarVoucher() {
  const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const total = subtotal; // sin descuento

  const ahora = new Date();
  const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  document.getElementById('voucherDate').textContent = ahora.toLocaleDateString('es-CL', opciones);

  const voucherItems = document.getElementById('voucherItems');
  voucherItems.innerHTML = carrito.map(item => `
    <div class="voucher-item">
      <span>${item.nombre} x${item.cantidad}</span>
      <span>$${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
    </div>
  `).join('');

  document.getElementById('voucherTotal').textContent = `$${total.toLocaleString('es-CL')}`;
}

function actualizarTotal() {
  const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalElemento.textContent = `$${subtotal.toLocaleString("es-CL")}`;
}

// HELPERS
function actualizarTotal() {
  const user = getCurrentUser();
  const descuento = user && user.isDuoc ? 0.2 : 0;
  const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const total = subtotal * (1 - descuento);
  totalElemento.textContent = `$${total.toLocaleString("es-CL")}`;
}
function actualizarNumerito() {
  const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  if (numerito) numerito.textContent = totalItems;
  document.querySelectorAll('.numerito').forEach(elemento => {
    elemento.textContent = totalItems;
  });
}
function mostrarMensaje(mensaje) {
  const mensajeElemento = document.createElement('div');
  mensajeElemento.className = 'mensaje-exito';
  mensajeElemento.innerHTML = `
    <i class="bi bi-check-circle"></i>
    <span>${mensaje}</span>
  `;
  mensajeElemento.style.position = 'fixed';
  mensajeElemento.style.top = '20px';
  mensajeElemento.style.right = '20px';
  mensajeElemento.style.backgroundColor = 'var(--clr-accent-green)';
  mensajeElemento.style.color = 'var(--clr-main)';
  mensajeElemento.style.padding = '1rem 1.5rem';
  mensajeElemento.style.borderRadius = '0.5rem';
  mensajeElemento.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
  mensajeElemento.style.zIndex = '1000';
  mensajeElemento.style.display = 'flex';
  mensajeElemento.style.alignItems = 'center';
  mensajeElemento.style.gap = '0.5rem';
  mensajeElemento.style.animation = 'slideIn 0.5s ease';
  document.body.appendChild(mensajeElemento);
  setTimeout(() => {
    mensajeElemento.style.animation = 'slideOut 0.5s ease';
    setTimeout(() => {
      if (document.body.contains(mensajeElemento)) {
        document.body.removeChild(mensajeElemento);
      }
    }, 500);
  }, 3000);
}

// INIT
renderizarCarrito();
actualizarNumerito();
