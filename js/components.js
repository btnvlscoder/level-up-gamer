document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("productos-container");

    productos.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("col-md-4");

        div.innerHTML = `
            <div class="card h-100 p-3">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">${prod.descripcion}</p>
                <p class="text-success fw-bold">$${prod.precio.toLocaleString()} CLP</p>
                <button class="btn btn-custom w-100">Agregar al Carrito</button>
            </div>
        `;

        contenedor.appendChild(div);
    });
});
