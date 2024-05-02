// Código de la conexión a la base de datos.
const mongoose = require('mongoose');//requiero mongoose
require('dotenv').config(); //requiere dotenv 

const dbConnection = async() => {
try {
await mongoose.connect(process.env.MONGO_URI);//requiere la mongoURI de dotenv
console.log('Base de datos conectada con éxito');
} catch (error) {
console.error(error);
throw new Error('Error a la hora de iniciar la base de datos');
}
};

module.exports = {dbConnection}


