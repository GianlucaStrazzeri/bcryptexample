//Aquí estará el modelo de estructura de un paciente para la conexión a base de datos (mongo atlas)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del paciente
const patientSchema = new Schema({
  nombre: {
    type: String,
    required: false
  },
  apellido: {
    type: String,
    required: false
  },
  edad: {
    type: Number,
    required: false
  },
  genero: {
    type: String,
    required: false
  },
  direccion: {
    type: String,
    required: false,
    default:" "
  },
  telefono: {
    type: Number,
    required: false
  },
  historialMedico: {
    type: String,
    default: ''
  },
  correoElectronico:{
    type: String,
    default:""
  },
  fecha:{
    type:String,
    default:""
  }
  
});

// Crear el modelo de Paciente basado en el esquema definido
const Patient = mongoose.model('Paciente', patientSchema);

module.exports = {Patient};