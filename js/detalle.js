// HELPERS
// GET PARAMETROS URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// FORMAT PRECIO
function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);
}

// MAIN
document.addEventListener('DOMContentLoaded', function() {
  const codigoProducto = getQueryParam('codigo');
  if (!codigoProducto) {
    mostrarError('No se ha especificado un producto.');
    return;
  }

  let productos = [];
  try {
    productos = JSON.parse(localStorage.getItem('productos-data')) || [];
  } catch (e) {
    console.error('Error al cargar productos:', e);
    mostrarError('Error al cargar la información del producto.');
    return;
  }

  const producto = productos.find(p => p.codigo === codigoProducto);
  if (!producto) {
    mostrarError('Producto no encontrado.');
    return;
  }

  mostrarProducto(producto);
  configurarEventoCarrito(producto);
  actualizarContadorCarrito();
});

// RENDER PRODUCTO
function mostrarError(mensaje) {
  const productoInfo = document.querySelector('.producto-info');
  if (productoInfo) {
    productoInfo.innerHTML = `
      <div class="error-container">
        <h2>Error</h2>
        <p>${mensaje}</p>
        <a href="./productos.html" class="btn-volver"><i class="bi bi-arrow-left"></i> Volver al catálogo</a>
      </div>
    `;
  }

  const slider = document.querySelector('.producto-slider');
  if (slider) {
    slider.style.display = 'none';
  }
}

function mostrarProducto(producto) {
  const titulo = document.querySelector('.producto-titulo-detalle');
  const marca = document.querySelector('.producto-marca-detalle');
  const codigoElem = document.querySelector('.producto-codigo');
  const categoria = document.querySelector('.producto-categoria');
  const descripcion = document.querySelector('.producto-descripcion');
  const precio = document.querySelector('.producto-precio');

  if (titulo) titulo.textContent = producto.nombre;
  if (marca) marca.textContent = producto.marca;
  if (codigoElem) codigoElem.textContent = `Código: ${producto.codigo}`;
  if (categoria) categoria.textContent = `Categoría: ${producto.categoria}`;
  if (descripcion) descripcion.textContent = producto.descripcion;
  if (precio) precio.textContent = formatPrice(producto.precio);

  configurarSliderImagenes(producto.imagenes);
}

// SLIDER IMGS
function configurarSliderImagenes(imagenes) {
  const sliderContainer = document.querySelector('.slider-container');
  sliderContainer.innerHTML = ''; // Limpiar contenedor

  // CREATE & ADD IMG SLIDER
  imagenes.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Imagen ${index + 1} del producto`;
    img.classList.add('slider-img');
    if (index === 0) img.classList.add('active');
    sliderContainer.appendChild(img);
  });

  // SLIDE NAV
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentIndex = 0;

  function showImage(index) {
    const images = document.querySelectorAll('.slider-img');
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imagenes.length;
    showImage(currentIndex);
  });
}

// CARRITO
function configurarEventoCarrito(producto) {
  const botonAgregar = document.getElementById('agregar-detalle');
  botonAgregar.addEventListener('click', () => {
    let carrito = JSON.parse(localStorage.getItem("carrito-levelup")) || [];
    const existente = carrito.find(p => p.codigo === producto.codigo);
    
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({
        ...producto,
        cantidad: 1
      });
    }
    
    localStorage.setItem("carrito-levelup", JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarMensajeExito('Producto agregado al carrito');
  });
}


// UPDATE CARRITO
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito-levelup")) || [];
  const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  
  // Actualizar todos los elementos con clase 'numerito'
  document.querySelectorAll('.numerito').forEach(elemento => {
    elemento.textContent = totalItems;
  });
}