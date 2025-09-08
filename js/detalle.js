// js/detalle.js

// Función para obtener parámetros de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Función para formatear precios
function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);
}

// Código principal
document.addEventListener('DOMContentLoaded', function() {
  // Obtener el código del producto desde la URL
  const codigoProducto = getQueryParam('codigo');
  
  if (!codigoProducto) {
    mostrarError('No se ha especificado un producto.');
    return;
  }
  
  // Obtener productos del localStorage - FORMA CORREGIDA
  let productos = [];
  try {
    productos = JSON.parse(localStorage.getItem('productos-data')) || [];
  } catch (e) {
    console.error('Error al cargar productos:', e);
    mostrarError('Error al cargar la información del producto.');
    return;
  }
  
  // Buscar el producto
  const producto = productos.find(p => p.codigo === codigoProducto);
  
  if (!producto) {
    mostrarError('Producto no encontrado.');
    return;
  }
  
  // Mostrar la información del producto
  mostrarProducto(producto);
  
  // Configurar el evento para agregar al carrito
  configurarEventoCarrito(producto);
  
  // Inicializar contador del carrito
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
  
  // Ocultar el slider
  const slider = document.querySelector('.producto-slider');
  if (slider) {
    slider.style.display = 'none';
  }
}

function mostrarProducto(producto) {
  // Actualizar la información del producto
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
  
  // Configurar el slider de imágenes
  configurarSliderImagenes(producto.imagenes);
}

// ... (el resto del código de detalle.js se mantiene igual)