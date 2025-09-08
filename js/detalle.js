// js/detalle.js
const productos = JSON.parse(localStorage.getItem("productos-data")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito-levelup")) || [];

// Código desde la URL
const params = new URLSearchParams(window.location.search);
const codigo = params.get("codigo");
const producto = productos.find(p => p.codigo === codigo);

// Refs
const sliderContainer = document.querySelector(".slider-container");
const titulo = document.querySelector(".producto-titulo-detalle");
const marca = document.querySelector(".producto-marca-detalle");
const codigoElem = document.querySelector(".producto-codigo");
const descripcion = document.querySelector(".producto-descripcion");
const precio = document.querySelector(".producto-precio");
const btnAgregar = document.querySelector("#agregar-detalle");
const numerito = document.querySelector(".numerito");

// Render
if (producto) {
  titulo.textContent = producto.nombre;
  marca.textContent = producto.marca || "";
  codigoElem.textContent = `Código: ${producto.codigo}`;
  descripcion.textContent = producto.descripcion;
  precio.textContent = `$${producto.precio.toLocaleString("es-CL")}`;

  producto.imagenes.forEach(img => {
    const imgTag = document.createElement("img");
    imgTag.src = img;
    imgTag.classList.add("slider-img");
    sliderContainer.appendChild(imgTag);
  });
}

// Slider simple
let index = 0;
function mostrarImagen(idx) {
  const imgs = document.querySelectorAll(".slider-img");
  imgs.forEach((img, i) => img.style.display = i === idx ? "block" : "none");
}
document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + producto.imagenes.length) % producto.imagenes.length;
  mostrarImagen(index);
});
document.querySelector(".next").addEventListener('click', () => {
  index = (index + 1) % producto.imagenes.length;
  mostrarImagen(index);
});
mostrarImagen(index);

// Helpers
function guardarCarrito(data) {
  localStorage.setItem("carrito-levelup", JSON.stringify(data));
}
function actualizarNumerito() {
  const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  if (numerito) numerito.textContent = totalItems;
}

// Agregar desde DETALLE (aquí sí manejamos el click)
btnAgregar.addEventListener("click", () => {
  const existe = carrito.find(p => p.codigo === producto.codigo);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardarCarrito(carrito);
  actualizarNumerito();
  alert("Producto agregado al carrito ✅");
});

// Init numerito
actualizarNumerito();