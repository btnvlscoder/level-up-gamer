// js/main.js

// Lista de productos
const productos = [
  {
    codigo: "JM001",
    categoria: "Juegos de Mesa",
    marca: "Devir",
    nombre: "Catan",
    precio: 29990,
    descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan.",
    imagen: "img/productos/catan/1.jpg"
  },
  {
    codigo: "JM002",
    categoria: "Juegos de Mesa",
    marca: "Hans im Glück",
    nombre: "Carcassonne",
    precio: 24990,
    descripcion: "Juego de colocación de fichas donde los jugadores construyen el paisaje medieval de Carcassonne.",
    imagen: "img/productos/carcassonne/1.jpg"
  },
  {
    codigo: "AC001",
    categoria: "Accesorios",
    marca: "Microsoft",
    nombre: "Controlador Inalámbrico Xbox Series X",
    precio: 59990,
    descripcion: "Experiencia de juego cómoda con botones mapeables y respuesta táctil mejorada.",
    imagen: "img/productos/Controlador-Inalámbrico-Xbox-Series-X/1.jpg"
  },
  {
    codigo: "AC002",
    categoria: "Accesorios",
    marca: "HyperX",
    nombre: "Auriculares Gamer HyperX Cloud II",
    precio: 79990,
    descripcion: "Sonido envolvente de calidad con micrófono desmontable y almohadillas ultra cómodas.",
    imagen: "img/productos/Auriculares-Gaming-HyperX/1.jpg"
  },
  {
    codigo: "CO001",
    categoria: "Consolas",
    marca: "Sony",
    nombre: "PlayStation 5",
    precio: 549990,
    descripcion: "Consola de última generación de Sony con gráficos impresionantes y carga ultrarrápida.",
    imagen: "img/productos/PlayStation-5/1.jpg"
  },
  {
    codigo: "CG001",
    categoria: "Computadores Gamers",
    marca: "ASUS",
    nombre: "PC Gamer ASUS ROG Strix",
    precio: 1299990,
    descripcion: "Potente equipo diseñado para gamers exigentes, con rendimiento excepcional en cualquier juego.",
    imagen: "img/productos/PC-Gamer-ASUS-ROG-Strix/1.jpg"
  },
  {
    codigo: "SG001",
    categoria: "Sillas Gamers",
    marca: "Secretlab",
    nombre: "Silla Gamer Secretlab Titan",
    precio: 349990,
    descripcion: "Máximo confort y soporte ergonómico para sesiones largas de juego.",
    imagen: "img/productos/Silla-GamerSecretlab-Titan/1.jpg"
  },
  {
    codigo: "MS001",
    categoria: "Mouse",
    marca: "Logitech",
    nombre: "Mouse Gamer Logitech G502 HERO",
    precio: 49990,
    descripcion: "Sensor de alta precisión y botones personalizables para un control preciso.",
    imagen: "img/productos/Mouse-Gamer-Logitech-G502-HERO/1.jpg"
  },
  {
    codigo: "MP001",
    categoria: "Mousepad",
    marca: "Razer",
    nombre: "Mousepad Razer Goliathus Extended Chroma",
    precio: 29990,
    descripcion: "Área amplia de juego con iluminación RGB personalizable.",
    imagen: "img/productos/Mousepad-Razer-Goliathus-Extended-Chroma/1.jpg"
  },
  {
    codigo: "PP001",
    categoria: "Poleras Personalizadas",
    marca: "Level-Up",
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    precio: 14990,
    descripcion: "Camiseta cómoda y estilizada, personalizable con tu gamer tag o diseño favorito.",
    imagen: "img/productos/Poleras-Personalizadas/1.png"
  }
];

// Helpers de carrito
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito-levelup")) || [];
}
function guardarCarrito(carrito) {
  localStorage.setItem("carrito-levelup", JSON.stringify(carrito));
}

const contenedorProductos = document.querySelector(".contenedor-productos");
const numerito = document.querySelector(".numerito");
let carrito = obtenerCarrito();

// Renderizar productos
function renderizarProductos() {
  if (!contenedorProductos) return;
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

// Manejo de clicks
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

// Actualizar numerito
function actualizarNumerito() {
  const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  if (numerito) numerito.textContent = totalItems;
}

// Init
renderizarProductos();
actualizarNumerito();
