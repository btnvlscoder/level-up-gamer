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
  // Obtener el código del producto desde la URL
  const codigoProducto = getQueryParam('codigo');
  
  if (!codigoProducto) {
    mostrarError('No se ha especificado un producto.');
    return;
  }
  
  // GET DE PROD LS
  let productos = [];
  try {
    productos = JSON.parse(localStorage.getItem('productos-data')) || [];
  } catch (e) {
    console.error('Error al cargar productos:', e);
    mostrarError('Error al cargar la información del producto.');
    return;
  }
  
  // SEARCH DE PROD
  const producto = productos.find(p => p.codigo === codigoProducto);
  
  if (!producto) {
    mostrarError('Producto no encontrado.');
    return;
  }
  
  mostrarProducto(producto);
  
  configurarEventoCarrito(producto);
  
  actualizarContadorCarrito();
});

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
  
  // HIDE
  const slider = document.querySelector('.producto-slider');
  if (slider) {
    slider.style.display = 'none';
  }
}

function mostrarProducto(producto) {
  // UPDATE INFO CARRO
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
