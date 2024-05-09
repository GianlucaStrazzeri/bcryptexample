Phis dashboard
La aplicación pretende crear eliminar y modificar un listado de pacientes 


Tabla de Contenidos
-Características
-Instalación
-Estructura de Archivos
-Uso
-Recursos Externos empleados


Características
Lista de las principales características y funcionalidades de la aplicación. Por ejemplo:

Instalación
Para iniciar el servidor poner en la terminal npm start
Si todo funciona saldrá la frase:
Servidor en http://localhost:3000
Base de datos conectada con éxito

Instrucciones para iniciar sesión.
Hay dos usuarios para acceder a la aplicación


Estructura de Archivos
-src
--config
---config/db.js --> Código de la conexión a la base de datos.
--controllers
---controllers/PatientController.js -->Funcionalidades relacionadas con la visualización creación modificación eliminación de los pacientes
---controllers/UserController.js -->Funcionalidades relacionadas con la visualización creación modificación eliminación de los usuarios
--crypto
---crypto/config.js --> Trasforma el secreo y crea un hash del secreto
--data
---data/users.js --> Define los usuarios que tienen acceso a la aplicación
--images
---images/descarga.png --> imagenes para la aplicación
--middlewares
---middlewares/authMiddleware.js --> Crea un token , verifica el token y descodifca el usuario
--models
---models/Patients.js -->Modelo de Paciente para la creación de datos en Mongo
---models/Users.js -->Modelo de usuario para la creación de datos en Mongo
--routes
---routes/index.js --> Todas las rutas cuya funcionalidad está en los controladores
.env --> archivos de entorno
.gitignore --> Archivo con documentos para no subir a github
app.js --> Archivo en el que se levanta el servidor, se inicializa la conexión a base de datos,se utilizan middlewares globales con app.use como cors, static, session,urlencoded, se redirige el enrutamiento a routes
readme.md


Uso
Seguimiento de historiales clínicos de pacientes.
Seguridad de datos y acceso controlado.


Descripción de las diferentes secciones y funcionalidades.
Apartado de Login: Permite tener acceso a la aplicación


Recursos externos utilizados.
-Bcrypt: Función de hash de contraseñas y derivación de claves para contraseñas basada en el cifrado Blowfish.
-Body-parser:librería de Node. js que se utiliza con Express para analizar y procesar los datos de solicitudes HTTP, como JSON o datos de formulario.
-Cors: Libreria que permite el uso compartido de recursos entre orígenes (CORS) ampliación de la política del mismo origen. 
-Dotenv:Módulo de dependencia cero que carga las variables de entorno desde un archivo . env en process. env .
-express: framework backend para construir aplicaciones web 
-express-session: middleware que almacena los datos de sesión en el servidor; sólo guarda el ID de sesión en la propia cookie.
-jsonwebtoken:cadena de texto que tiene tres partes (header, payload y signature) codificadas en Base64
-mongoose:Librería para Node.js que nos permite escribir consultas para una base de datos de MongooDB, con características como validaciones, construcción de queries, middlewares, conversión de tipos y algunas otras, que enriquecen la funcionalidad de la base de datos.