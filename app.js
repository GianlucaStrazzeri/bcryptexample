const express = require('express');
const session = require('express-session');
const { hashedSecret } = require('./src/crypto/config');
const routes = require('./src/routes');

const app = express();
const PORT=process.env.PORT||3000;//defino el puerto de esta forma para que pueda luego exportarlo para la conexión base de datos

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: hashedSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
