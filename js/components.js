// componentes.js

// Función para formatear el precio
function formatearPrecio(precio) {
    if (precio === 0) return "Agotado";
    return precio.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

// Función para crear y renderizar los productos
function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = ""; // Limpiar contenedor antes de insertar

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-md-6", "col-lg-4");

        card.innerHTML = `
            <div class="card h-100">
                <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <span class="precio fw-bold">${formatearPrecio(producto.precio)}</span>
                    <button class="btn btn-sm boton-personalizado">Agregar</button>
                </div>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);
});
