Phis dashboard
La aplicación pretende crear eliminar y modificuar un listado de pacientes 


Tabla de Contenidos
Introducción
Características
Instalación
Uso
Contribución
Créditos
Licencia


Características
Lista de las principales características y funcionalidades de la aplicación. Por ejemplo:


Seguimiento de historiales clínicos de pacientes.
Visualización de estadísticas y métricas relevantes.
Seguridad de datos y acceso controlado.


Instalación
Para iniciar el servidor poner en la terminal npm start
Si todo funciona saldrá la frase:
Servidor en http://localhost:3000
Base de datos conectada con éxito


Instrucciones para iniciar sesión.
Hay dos usuarios para acceder a la aplicación

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