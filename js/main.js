// ================================
// LIST DE PROD
// ================================
const productos = [
  {
    codigo: "JM001",
    categoria: "Juegos de Mesa",
    marca: "Devir",
    nombre: "Catan",
    precio: 29990,
    descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan.",
    imagenes: [
      "img/productos/catan/1.jpg",
      "img/productos/catan/2.jpg",
      "img/productos/catan/3.jpg"
    ]
  },
  {
    codigo: "JM002",
    categoria: "Juegos de Mesa",
    marca: "Hans im Glück",
    nombre: "Carcassonne",
    precio: 24990,
    descripcion: "Juego de colocación de fichas donde los jugadores construyen el paisaje medieval de Carcassonne.",
    imagenes: [
      "img/productos/carcassonne/1.jpg",
      "img/productos/carcassonne/2.jpg",
      "img/productos/carcassonne/3.jpg"
    ]
  },
  {
    codigo: "AC001",
    categoria: "Accesorios",
    marca: "Microsoft",
    nombre: "Controlador Inalámbrico Xbox Series X",
    precio: 59990,
    descripcion: "Experiencia de juego cómoda con botones mapeables y respuesta táctil mejorada.",
    imagenes: [
      "img/productos/Controlador-Inalámbrico-Xbox-Series-X/1.jpg",
      "img/productos/Controlador-Inalámbrico-Xbox-Series-X/2.jpg",
      "img/productos/Controlador-Inalámbrico-Xbox-Series-X/3.jpg",
      "img/productos/Controlador-Inalámbrico-Xbox-Series-X/4.jpg",
      "img/productos/Controlador-Inalámbrico-Xbox-Series-X/5.jpg",
    ]
  },
  {
    codigo: "AC002",
    categoria: "Accesorios",
    marca: "HyperX",
    nombre: "Auriculares Gamer HyperX Cloud II",
    precio: 79990,
    descripcion: "Sonido envolvente de calidad con micrófono desmontable y almohadillas ultra cómodas.",
    imagenes: [
      "img/productos/Auriculares-Gaming-HyperX/1.jpg",
      "img/productos/Auriculares-Gaming-HyperX/2.jpg",
      "img/productos/Auriculares-Gaming-HyperX/3.jpg",
      "img/productos/Auriculares-Gaming-HyperX/4.jpg",
    ]
  },
  {
    codigo: "CO001",
    categoria: "Consolas",
    marca: "Sony",
    nombre: "PlayStation 5",
    precio: 549990,
    descripcion: "Consola de última generación de Sony con gráficos impresionantes y carga ultrarrápida.",
    imagenes: [
      "img/productos/PlayStation-5/1.jpg",
      "img/productos/PlayStation-5/2.jpg",
      "img/productos/PlayStation-5/3.jpg",
      "img/productos/PlayStation-5/4.jpg"
    ]
  },
  {
    codigo: "CG001",
    categoria: "Computadores Gamers",
    marca: "ASUS",
    nombre: "PC Gamer ASUS ROG Strix",
    precio: 1299990,
    descripcion: "Potente equipo diseñado para gamers exigentes, con rendimiento excepcional en cualquier juego.",
    imagenes: [
      "img/productos/PC-Gamer-ASUS-ROG-Strix/1.jpg",
      "img/productos/PC-Gamer-ASUS-ROG-Strix/2.jpg",
      "img/productos/PC-Gamer-ASUS-ROG-Strix/3.jpg",
      "img/productos/PC-Gamer-ASUS-ROG-Strix/4.jpg"
    ]
  },
  {
    codigo: "SG001",
    categoria: "Sillas Gamers",
    marca: "Secretlab",
    nombre: "Silla Gamer Secretlab Titan",
    precio: 349990,
    descripcion: "Máximo confort y soporte ergonómico para sesiones largas de juego.",
    imagenes: [
      "img/productos/Silla-GamerSecretlab-Titan/1.jpg",
      "img/productos/Silla-GamerSecretlab-Titan/2.jpg",
      "img/productos/Silla-GamerSecretlab-Titan/3.jpg",
      "img/productos/Silla-GamerSecretlab-Titan/4.jpg",
      "img/productos/Silla-GamerSecretlab-Titan/5.jpg",
      "img/productos/Silla-GamerSecretlab-Titan/6.jpg",
      "img/productos/Silla-GamerSecretlab-Titan/7.jpg",
      "img/productos/Silla-GamerSecretlab-Titan/8.jpg",
      "img/productos/Silla-GamerSecretlab-Titan/9.jpg",
    ]
  },
  {
    codigo: "MS001",
    categoria: "Mouse",
    marca: "Logitech",
    nombre: "Mouse Gamer Logitech G502 HERO",
    precio: 49990,
    descripcion: "Sensor de alta precisión y botones personalizables para un control preciso.",
    imagenes: [
      "img/productos/Mouse-Gamer-Logitech-G502-HERO/1.jpg",
      "img/productos/Mouse-Gamer-Logitech-G502-HERO/2.jpg",
      "img/productos/Mouse-Gamer-Logitech-G502-HERO/3.jpg",
      "img/productos/Mouse-Gamer-Logitech-G502-HERO/4.jpg",
    ]
  },
  {
    codigo: "MP001",
    categoria: "Mousepad",
    marca: "Razer",
    nombre: "Mousepad Razer Goliathus Extended Chroma",
    precio: 29990,
    descripcion: "Área amplia de juego con iluminación RGB personalizable.",
    imagenes: [
      "img/productos/Mousepad-Razer-Goliathus-Extended-Chroma/1.jpg",
      "img/productos/Mousepad-Razer-Goliathus-Extended-Chroma/2.jpg",
      "img/productos/Mousepad-Razer-Goliathus-Extended-Chroma/3.jpg",
    ]
  },
  {
    codigo: "PP001",
    categoria: "Poleras Personalizadas",
    marca: "Level-Up",
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    precio: 14990,
    descripcion: "Camiseta cómoda y estilizada, personalizable con tu gamer tag o diseño favorito.",
    imagenes: [
      "img/productos/Poleras-Personalizadas/1.png",
      "img/productos/Poleras-Personalizadas/2.png",
      "img/productos/Poleras-Personalizadas/3.png"
    ]
  }
];

// PROD A LS
localStorage.setItem("productos-data", JSON.stringify(productos));

// ================================
// HELPERS DE CARRO
// ================================
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito-levelup")) || [];
}
function guardarCarrito(carrito) {
  localStorage.setItem("carrito-levelup", JSON.stringify(carrito));
}

const contenedorProductos = document.querySelector(".contenedor-productos");
const numerito = document.querySelector(".numerito");
let carrito = obtenerCarrito();

// ================================
// RENDERIZAR PRODUCTOS (GRID)
// ================================
function renderizarProductos() {
  if (!contenedorProductos) return;
  contenedorProductos.innerHTML = productos.map(prod => `
    <div class="producto">
      <a href="detalle-producto.html?codigo=${prod.codigo}">
        <img class="producto-imagen" src="${prod.imagenes[0]}" alt="${prod.nombre}">
      </a>
      <div class="producto-detalles">
        ${prod.marca ? `<p class="producto-marca">${prod.marca}</p>` : ""}
        <h3 class="producto-titulo">
          <a href="detalle-producto.html?codigo=${prod.codigo}">${prod.nombre}</a>
        </h3>
        <p class="precio">$${Number(prod.precio).toLocaleString("es-CL")}</p>
        <button class="producto-agregar" data-codigo="${prod.codigo}">
          <i class="bi bi-cart"></i> Agregar
        </button>
      </div>
    </div>
  `).join("");
}

// ================================
// CLICKS
// ================================
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
    carrito.push({
      ...prodBase,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  actualizarNumerito();
  mostrarMensajeExito('Producto agregado al carrito');
});

// ================================
// COUNT DE CARRO
// ================================
function actualizarNumerito() {
  const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  if (numerito) numerito.textContent = totalItems;
}

// ================================
// MENSAJE OK
// ================================
function mostrarMensajeExito(mensaje) {
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
  mensajeElemento.style.boxShadow = '0 4px 15px var(--clr-main)';
  mensajeElemento.style.zIndex = '1000';
  mensajeElemento.style.display = 'flex';
  mensajeElemento.style.alignItems = 'center';
  mensajeElemento.style.gap = '0.5rem';
  mensajeElemento.style.animation = 'slideIn 0.5s ease';
  
  document.body.appendChild(mensajeElemento);
  
  setTimeout(() => {
    mensajeElemento.style.animation = 'slideOut 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(mensajeElemento);
    }, 500);
  }, 3000);
}

// ANIMACIONES DE MSG
const estilosAnimacion = document.createElement('style');
estilosAnimacion.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(estilosAnimacion);

// ================================
// INIT
// ================================
renderizarProductos();
actualizarNumerito();
