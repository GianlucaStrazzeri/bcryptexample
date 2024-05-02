const express = require('express');
const session = require('express-session');
const { hashedSecret } = require('./src/crypto/config');
const routes = require('./src/routes');
const cors =require ("cors")
const {dbConnection}= require("./src/config/db.js") //requiero connexión database 
const app = express();
const PORT=process.env.PORT||3000;//defino el puerto de esta forma para que pueda luego exportarlo para la conexión base de datos
dbConnection() //invoco la función antes de cualquier middleware para que no se reconecte a cada request
app.disable('x-powered-by');//practica de seguridad para que no recibir ataques en cabeceras de express
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

app.use(cors())//nos va a permitir acceder de otros ip diferentes

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
