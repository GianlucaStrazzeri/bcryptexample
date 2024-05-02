const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const { users } = require('../data/users');

// Verifica si el usuario está logado
router.get('/', (req, res) => {
  if (req.session.token) {
    res.send(`
      <h1>Bienvenido al Dashboard</h1>
      <a href="/dashboard">Ir al dashboard</a>
      <form action="/logout" method="post">
        <button type="submit">Cerrar sesión</button>
      </form>
    `);
  } else {
    const loginForm = `
    <div style="
    display:flex; 
    flex-direction:column; 
    align-items:center;
    border: 1px solid blue;
    ">
    <h1>Login Page</h1>
      <form action="/login" method="post">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" required><br>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br>
<div style="
display:flex;
justify-content:center;
">
<button type="submit">Iniciar sesión</button>
</div>
        
      </form>
      <a href="/dashboard">dashboard</a>
      </div>
    `;

    res.send(loginForm);
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = generateToken(user);
    req.session.token = token;
    res.redirect('/dashboard');
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

router.get('/dashboard', verifyToken, (req, res) => {
  const userId = req.user;
  const user = users.find((user) => user.id === userId);
  if (user) {
    res.send(`
      <h1>Bienvenido, ${user.name}</h1>
      <p>ID: ${user.id}</p>
      <p>UserName: ${user.username}</p>
      <a href="/">HOME</a>
      <a href="/patients/ssr">Pacientes</a>
      <form action="/logout" method="post">
        <button type="submit">Cerrar sesión</button> 
      </form>
    `);
  } else {
    res.status(401).json({ mensaje: 'Usuario no encontrado' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
