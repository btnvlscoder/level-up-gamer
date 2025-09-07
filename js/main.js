
const productos = [

    {
        codigo: "JM001",
        categoria: "Juegos de Mesa",
        marca: "CATAN",
        nombre: "Catan",
        precio: 29990,
        descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan.",
        imagen: "img/productos/catan/1.jpg"
    },
    {
        codigo: "JM002",
        categoria: "Juegos de Mesa",
        marca: "CARCASSONNE",
        nombre: "Carcassonne",
        precio: 24990,
        descripcion: "Juego de colocación de fichas donde los jugadores construyen el paisaje medieval de Carcassonne.",
        imagen: "img/productos/carcassonne/1.jpg"
    },

    {
        codigo: "AC001",
        categoria: "Accesorios",
        marca: "MICROSOFT",
        nombre: "Controlador Inalámbrico Xbox Series X",
        precio: 59990,
        descripcion: "Experiencia de juego cómoda con botones mapeables y respuesta táctil mejorada.",
        imagen: "img/productos/Controlador-Inalámbrico-Xbox-Series-X/1.jpg"
    },
    {
        codigo: "AC002",
        categoria: "Accesorios",
        marca: "HYPERX",
        nombre: "Auriculares Gamer HyperX Cloud II",
        precio: 79990,
        descripcion: "Sonido envolvente de calidad con micrófono desmontable y almohadillas ultra cómodas.",
        imagen: "img/productos/Auriculares-Gaming-HyperX/1.jpg"
    },

    {
        codigo: "CO001",
        categoria: "Consolas",
        marca: "SONY",
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
        marca: "SECRET LAB",
        nombre: "Silla Gamer Secretlab Titan",
        precio: 349990,
        descripcion: "Máximo confort y soporte ergonómico para sesiones largas de juego.",
        imagen: "img/productos/Silla-Gamer-Secretlab Titan/1.jpg"
    },

    {
        codigo: "MS001",
        categoria: "Mouse",
        marca: "LOGITECH",
        nombre: "Mouse Gamer Logitech G502 HERO",
        precio: 49990,
        descripcion: "Sensor de alta precisión y botones personalizables para un control preciso.",
        imagen: "img/productos/Mouse-Gamer-Logitech-G502-HERO/1.jpg"
    },

    {
        codigo: "MP001",
        categoria: "Mousepad",
        marca: "RAZER",
        nombre: "Mousepad Razer Goliathus Extended Chroma",
        precio: 29990,
        descripcion: "Área amplia de juego con iluminación RGB personalizable.",
        imagen: "img/productos/Mousepad-Razer-Goliathus-Extended-Chroma/1.jpg"
    },

    {
        codigo: "PP001",
        categoria: "Poleras Personalizadas",
        marca: "LEVEL-UP GAMER",
        nombre: "Polera Gamer Personalizada 'Level-Up'",
        precio: 14990,
        descripcion: "Camiseta cómoda y estilizada, personalizable con tu gamer tag o diseño favorito.",
        imagen: "img/productos/Poleras-Personalizadas/1.png"
    }
];

//PRODUCTOS
//LOAD 
const contenedorProductos = document.querySelector(".contenedor-productos");

function renderizarProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <div>
                <p class="producto-marca">${prod.marca}</p>
                <h3 class="producto-titulo">${prod.nombre}</h3>
                <p class="precio">$${prod.precio.toLocaleString("es-CL")}</p>
                <button class="producto-agregar" data-codigo="${prod.codigo}">
                    <i class="bi bi-cart"></i>
                </button>
            </div>
        `;
        contenedorProductos.appendChild(div);
    });
}


// EXECUTE
renderizarProductos();
