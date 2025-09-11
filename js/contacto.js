document.addEventListener('DOMContentLoaded', function() {
  const contactoForm = document.querySelector('.contacto-form-simple');
  
  contactoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
    const numerito = document.querySelector(".numerito");


    alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
    contactoForm.reset();
  });
});