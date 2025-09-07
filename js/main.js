// js/main.js
const contenedorProductos = document.querySelector(".contenedor-productos");
const numerito = document.querySelector(".numerito");

let carrito = obtenerCarrito();

function renderizarProductos() {
  if (!contenedorProductos || !Array.isArray(productos)) return;

  contenedorProductos.innerHTML = productos.map(prod => `
    <div class="producto">
      <img class="producto-imagen" src="${prod.imagen}" alt="${prod.nombre}">
      <div class="producto-detalles">
        ${prod.marca ? `<p class="producto-marca">${prod.marca}</p>` : ""}
        <h3 class="producto-titulo">${prod.nombre}</h3>
        <p class="precio">$${Number(prod.precio).toLocaleString("es-CL")}</p>
        <button class="producto-agregar" data-codigo="${prod.codigo}">
          <i class="bi bi-cart"></i> Agregar
        </button>
      </div>
    </div>
  `).join("");
}

document.addEventListener("click", (e) => {
  const boton = e.target.closest(".producto-agregar");
  if (!boton) return;

  const codigo = boton.dataset.codigo;
  const prodBase = productos.find(p => p.codigo === codigo);
  if (!prodBase) return;

  const existente = carrito.find(p => p.codigo === codigo);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...prodBase, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarNumerito();
});

function actualizarNumerito() {
  const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  if (numerito) numerito.textContent = totalItems;
}

// Init
renderizarProductos();
actualizarNumerito();
