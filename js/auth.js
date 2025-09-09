document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  
  // ALTERNAR LOGIN & REGISTER
  showRegister.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
  });
  
  showLogin.addEventListener('click', function(e) {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
  });
  
  // FORMULARIO LOGIN
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // GET USER
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // SEARCH USER
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // INICIAR SESION
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('¡Inicio de sesión exitoso!');
      window.location.href = 'index.html';
    } else {
      alert('Correo electrónico o contraseña incorrectos.');
    }
  });
  
  // REGISTER
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const birthdate = document.getElementById('regBirthdate').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // VALIDACIONES
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    
    //  AGE
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18) {
      alert('Debes ser mayor de 18 años para registrarte.');
      return;
    }
    
    // GET USER 
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // VALIDAR
    if (users.find(user => user.email === email)) {
      alert('Este correo electrónico ya está registrado.');
      return;
    }
    
    // CREATE USER
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      birthdate,
      password,
      isDuoc: email.toLowerCase().endsWith('@duocuc.cl'),
      points: 0,
      level: 1,
      joinDate: new Date().toISOString()
    };
    
    // ADD + SAVE USER
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // INIT
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    alert('¡Registro exitoso! Ahora estás conectado.');
    window.location.href = 'index.html';
  });
});