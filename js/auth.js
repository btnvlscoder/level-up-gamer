// js/auth.js

// Función para verificar si un usuario está autenticado
function isAuthenticated() {
  return localStorage.getItem('currentUser') !== null;
}

// Función para obtener el usuario actual
function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

// Función para verificar si un correo es de Duoc
function isDuocEmail(email) {
  return email.toLowerCase().endsWith('@duocuc.cl');
}

// Función para verificar si es mayor de 18 años
function isOver18(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18;
}

// Función para actualizar la interfaz según el estado de autenticación
function updateAuthUI() {
  const authMenuItem = document.getElementById('auth-menu-item');
  const user = getCurrentUser();
  
  if (authMenuItem) {
    if (user) {
      authMenuItem.innerHTML = `
        <div class="boton-menu">
          <i class="bi bi-person"></i> ${user.name}
          ${user.isDuoc ? '<span class="duoc-badge">DUOC</span>' : ''}
          <a href="#" id="logout-link" style="margin-left: 10px; color: var(--clr-accent-red);">
            <i class="bi bi-box-arrow-right"></i>
          </a>
        </div>
      `;
      
      document.getElementById('logout-link').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        updateAuthUI();
        window.location.href = 'index.html';
      });
    } else {
      authMenuItem.innerHTML = `
        <a class="boton-menu" href="./login.html"><i class="bi bi-person"></i> Iniciar Sesión</a>
      `;
    }
  }
}

// Inicializar la autenticación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  // Solo ejecutar si estamos en la página de login/registro
  if (window.location.pathname.endsWith('login.html')) {
    // Cambiar entre pestañas de login y registro
    document.getElementById('login-tab').addEventListener('click', function() {
      document.getElementById('login-tab').classList.add('active');
      document.getElementById('register-tab').classList.remove('active');
      document.getElementById('login-form').classList.add('active');
      document.getElementById('register-form').classList.remove('active');
    });
    
    document.getElementById('register-tab').addEventListener('click', function() {
      document.getElementById('register-tab').classList.add('active');
      document.getElementById('login-tab').classList.remove('active');
      document.getElementById('register-form').classList.add('active');
      document.getElementById('login-form').classList.remove('active');
    });
    
    // Cambiar entre formularios
    document.getElementById('switch-to-register').addEventListener('click', function() {
      document.getElementById('register-tab').click();
    });
    
    document.getElementById('switch-to-login').addEventListener('click', function() {
      document.getElementById('login-tab').click();
    });
    
    // Validar email Duoc en tiempo real
    document.getElementById('register-email').addEventListener('blur', function() {
      const email = this.value;
      const duocNotice = document.getElementById('duoc-notice');
      
      if (isDuocEmail(email)) {
        duocNotice.style.display = 'block';
      } else {
        duocNotice.style.display = 'none';
      }
    });
    
    // Validar edad en tiempo real
    document.getElementById('register-birthdate').addEventListener('change', function() {
      const ageError = document.getElementById('age-error');
      
      if (!isOver18(this.value)) {
        ageError.style.display = 'block';
      } else {
        ageError.style.display = 'none';
      }
    });
    
    // Validar coincidencia de contraseñas
    document.getElementById('register-confirm-password').addEventListener('blur', function() {
      const password = document.getElementById('register-password').value;
      const confirmPassword = this.value;
      const passwordError = document.getElementById('password-error');
      
      if (password !== confirmPassword) {
        passwordError.style.display = 'block';
      } else {
        passwordError.style.display = 'none';
      }
    });
    
    // Manejar envío del formulario de registro
    document.getElementById('register-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const birthdate = document.getElementById('register-birthdate').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      const referralCode = document.getElementById('referral-code').value;
      
      // Validaciones
      if (!isOver18(birthdate)) {
        alert('Debes ser mayor de 18 años para registrarte.');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      
      // Obtener usuarios existentes
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar si el usuario ya existe
      if (users.find(user => user.email === email)) {
        alert('Este correo electrónico ya está registrado.');
        return;
      }
      
      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        birthdate,
        password, // En una aplicación real, esto debería estar encriptado
        isDuoc: isDuocEmail(email),
        referralCode,
        points: 0,
        level: 1,
        joinDate: new Date().toISOString()
      };
      
      // Agregar usuario y guardar
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Iniciar sesión automáticamente
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      alert('¡Registro exitoso! Ahora estás conectado.');
      window.location.href = 'index.html';
    });
    
    // Manejar envío del formulario de login
    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // Obtener usuarios
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Buscar usuario
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Iniciar sesión
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('¡Inicio de sesión exitoso!');
        window.location.href = 'index.html';
      } else {
        alert('Correo electrónico o contraseña incorrectos.');
      }
    });
  }
  
  // Actualizar la UI de autenticación en todas las páginas
  updateAuthUI();
});

// Inicializar la autenticación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  // Solo ejecutar si estamos en la página de login/registro
  if (window.location.pathname.endsWith('login.html')) {
    // Cambiar entre pestañas de login y registro
    document.getElementById('login-tab').addEventListener('click', function() {
      document.getElementById('login-tab').classList.add('active');
      document.getElementById('register-tab').classList.remove('active');
      document.getElementById('login-form').classList.add('active');
      document.getElementById('register-form').classList.remove('active');
    });
    
    document.getElementById('register-tab').addEventListener('click', function() {
      document.getElementById('register-tab').classList.add('active');
      document.getElementById('login-tab').classList.remove('active');
      document.getElementById('register-form').classList.add('active');
      document.getElementById('login-form').classList.remove('active');
    });
    
    // Cambiar entre formularios
    document.getElementById('switch-to-register').addEventListener('click', function() {
      document.getElementById('register-tab').click();
    });
    
    document.getElementById('switch-to-login').addEventListener('click', function() {
      document.getElementById('login-tab').click();
    });
    
    // Validar email Duoc en tiempo real
    document.getElementById('register-email').addEventListener('input', function() {
      const email = this.value;
      const duocNotice = document.getElementById('duoc-notice');
      
      if (isDuocEmail(email)) {
        duocNotice.style.display = 'block';
      } else {
        duocNotice.style.display = 'none';
      }
    });
    
    // Validar edad en tiempo real
    document.getElementById('register-birthdate').addEventListener('change', function() {
      const ageError = document.getElementById('age-error');
      
      if (!isOver18(this.value)) {
        ageError.style.display = 'block';
      } else {
        ageError.style.display = 'none';
      }
    });
    
    // Validar coincidencia de contraseñas
    const passwordField = document.getElementById('register-password');
    const confirmPasswordField = document.getElementById('register-confirm-password');
    
    const validatePasswordMatch = () => {
      const password = passwordField.value;
      const confirmPassword = confirmPasswordField.value;
      const passwordError = document.getElementById('password-error');
      
      if (confirmPassword && password !== confirmPassword) {
        passwordError.style.display = 'block';
        confirmPasswordField.style.borderColor = '#ff4444';
      } else {
        passwordError.style.display = 'none';
        confirmPasswordField.style.borderColor = password ? '#39FF14' : '#1E90FF';
      }
    };
    
    passwordField.addEventListener('input', validatePasswordMatch);
    confirmPasswordField.addEventListener('input', validatePasswordMatch);
    
    // Manejar envío del formulario de registro
    document.getElementById('register-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const birthdate = document.getElementById('register-birthdate').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      const referralCode = document.getElementById('referral-code').value;
      
      // Resetear estilos de error
      document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
      });
      
      document.querySelectorAll('input').forEach(input => {
        input.style.borderColor = '';
      });
      
      // Validaciones
      let isValid = true;
      
      if (!name) {
        document.getElementById('register-name').style.borderColor = '#ff4444';
        isValid = false;
      }
      
      if (!email) {
        document.getElementById('register-email').style.borderColor = '#ff4444';
        isValid = false;
      }
      
      if (!birthdate) {
        document.getElementById('register-birthdate').style.borderColor = '#ff4444';
        isValid = false;
      } else if (!isOver18(birthdate)) {
        document.getElementById('age-error').style.display = 'block';
        document.getElementById('register-birthdate').style.borderColor = '#ff4444';
        isValid = false;
      }
      
      if (!password) {
        document.getElementById('register-password').style.borderColor = '#ff4444';
        isValid = false;
      }
      
      if (!confirmPassword) {
        document.getElementById('register-confirm-password').style.borderColor = '#ff4444';
        isValid = false;
      } else if (password !== confirmPassword) {
        document.getElementById('password-error').style.display = 'block';
        document.getElementById('register-confirm-password').style.borderColor = '#ff4444';
        isValid = false;
      }
      
      if (!isValid) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
      }
      
      // Obtener usuarios existentes
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar si el usuario ya existe
      if (users.find(user => user.email === email)) {
        alert('Este correo electrónico ya está registrado.');
        document.getElementById('register-email').style.borderColor = '#ff4444';
        return;
      }
      
      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        birthdate,
        password, // En una aplicación real, esto debería estar encriptado
        isDuoc: isDuocEmail(email),
        referralCode,
        points: 0,
        level: 1,
        joinDate: new Date().toISOString()
      };
      
      // Agregar usuario y guardar
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Iniciar sesión automáticamente
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      alert('¡Registro exitoso! Ahora estás conectado.');
      window.location.href = 'index.html';
    });
    
    // Manejar envío del formulario de login
    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // Resetear estilos de error
      document.getElementById('login-email').style.borderColor = '';
      document.getElementById('login-password').style.borderColor = '';
      
      // Validaciones
      if (!email) {
        document.getElementById('login-email').style.borderColor = '#ff4444';
        alert('Por favor, ingresa tu correo electrónico.');
        return;
      }
      
      if (!password) {
        document.getElementById('login-password').style.borderColor = '#ff4444';
        alert('Por favor, ingresa tu contraseña.');
        return;
      }
      
      // Obtener usuarios
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Buscar usuario
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Iniciar sesión
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('¡Inicio de sesión exitoso!');
        window.location.href = 'index.html';
      } else {
        alert('Correo electrónico o contraseña incorrectos.');
        document.getElementById('login-email').style.borderColor = '#ff4444';
        document.getElementById('login-password').style.borderColor = '#ff4444';
      }
    });
  }
  
  // Actualizar la UI de autenticación en todas las páginas
  updateAuthUI();
});