//Aquí estará el modelo de estructura de un paciente para la conexión a base de datos (mongo atlas)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del paciente
const userSchema = new Schema({
    nombre: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: false
    },
    contraseña:{
      type: String,
      required: false
    }
   
    
  });
  
  // Crear el modelo de Paciente basado en el esquema definido
  const User = mongoose.model('User', userSchema);
  
  module.exports = {User};
  