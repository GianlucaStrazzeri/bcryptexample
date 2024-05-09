const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/PatientController.js') //requiero PatientController para hacer funcionar los controladores
const UserController= require ("../controllers/UserController.js") //requiero UserController para hacer funcionar los controladores
const { users } = require('../data/users');
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');




router.get('/patients', PatientController.getAllPatients )//Devuelve  todos los pacientes
router.get('/patients/ssr', PatientController.getAllPatientsSsr )//Devuelve  todos los pacientes
router.get("/patient/:_id",PatientController.getOnePatient)//Devuelve un paciente por su id
router.get("/patient/ssr/:_id",PatientController.getOnePatientSsr)//Devuelve un paciente por su id
router.get("/patient/create/form",PatientController.createNewPatientForm)//Formulario para crear nuevos Pacientes
router.post("/patient/create", PatientController.createNewPatient)//Crea un nuevo paciente
router.post("/patients/:_id",PatientController.deletePatient)//Elimina un paciente desde su pagina,
router.put('/patient/update/:_id', PatientController.updatePatientNameByID) //Debe de modificar el nombre de un paciente 
//No Funciona




router.get('/dashboard', verifyToken, UserController.verifyTokens)// Verifica el token
router.get("/", UserController.getHomePage)//Da Acceso a la HomePage y verifica si el usuario está logado
router.get("/login/create",UserController.createUser)//Get login al darle al boton crea un usuario
router.get('/user/ssr', UserController.getAllUsersSsr )//Devuelve  todos los Usuarios
router.get("/user/ssr/:_id",UserController.getOneUserSsr)//Devuelve un usuario por su id
router.post("/login",UserController.createToken) //Crea un token si el username y el passwoord son correctos
router.post("/user/create", UserController.createNewUser)//Crea un nuevo usuario
router.post("/logout",UserController.destroySession) //destruye la sesión
router.post("/user/:_id",UserController.deleteUser)//Elimina un usuario desde su pagina, los formularios en html, solo tienen dos métodos:get y post por eso no se utilza router.delete







module.exports = router;
