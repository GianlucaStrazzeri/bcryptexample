const {User} =require ("../models/Users")// requiero los usuarios de models

const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const { users } = require('../data/users');

const UserController={

    async getHomePage (req,res){
        if (req.session.token) {
            res.send(`
        <div style="
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        ">
            <h1>Bienvenido a la Home</h1>
              <a href="/dashboard">Ir al dashboard</a>
              <form action="/logout" method="post">
                <button type="submit">Cerrar sesión</button>
              </form>
        </div> 

              
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
              <div style="
              text-align:center;
              ">
                <label for="username">Usuario:</label>
                </div>
                <div>
                <input type="text" id="username" name="username" placeholder="usuario1" required >
                <br>
                </div>
                <br>
              <div style="
              text-align:center;
              ">
                <label for="password">Contraseña:</label>
                </div>
                <div>
                <input type="password" id="password" name="password" placeholder="contraseña1" required><br>
              </div>
              <br>
        <div style="
        display:flex;
        justify-content:center;
        ">
        
        <button type="submit">Iniciar sesión</button>
        </div>
                
              </form>
              
              </div>
            `;
        
            res.send(loginForm);
          }
        
    },

    async createToken (req,res){
        const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = generateToken(user);
    req.session.token = token;
    res.redirect('/dashboard');
  } else {
    res.send(
        `
        <p>El usuario o la contraseña son incorrectos</p>
        <a href="/">Vuelve a identificarte</a>
        <a href="/login/create">Crea un usuario</a>
        `
    )
  }
    },

    async createUser (req,res){
        try{
            res.send(
                `
                <div style="display:flex; flex-direction:column; align-items:center;">
                <a href="/dashboard">Home</a>
                <h1>Crea un usuario</h1>
                <a href="/"> Have you got an account? </a>
                
                <form action="/user/create" method="POST">
                <input type="text" name="username" placeholder="username"></input>
                <input type="password" name="contraseña" placeholder="password"></input>
                <button>Crea</button>
                </form>
                <p> Do you need to Sign up? </p>
                <button>Register with Google</button>
                <button>Register with Email </button>
                </div>

                `
            )
        }catch(error){console.log(error)}
    },

    async createNewUser (req,res){
        try {
            const user= await User.create({...req.body})
            res.send(`
            
            <h2 style="
            display:flex; justify-content:center;
            ">
            Bienvenido: ${user.username} Creado con exito!
            </h2>
            
            <div style="display:flex; justify-content:center; gap:20px;">
            <ul>
            <li>UserName: ${user.username} </li>
            <li>Passwoord: ${user.contraseña} </li>
            
            </div>


            <div style="display:flex; justify-content:center; gap:20px;">
            <a href="/patients/ssr" >Vuelve a la home</a>
            <a href="/patient/create/form" >Crea otro paciente</a>
            <a href="/login" >Crea otro user</a>
            <a href="/user/ssr" >All Users</a>
            </div>
            `)
        res.status(201).json(user)
        }catch(error){console.log(error)}
    },

    async getAllUsersSsr(req,res){
        try{
            const users=await User.find();
            
            res.send(
                `
                
                <div style="
                display:flex;
                flex-direction:column;
                align-items:center;
                ">
                <a href="/dashboard"><button>Home</button></a>
                <form action="/logout" method="post">
                    <button type="submit">Cerrar sesión</button> 
                        </form>
                <a href="/login/create"><button>Crea nuevo Usuario</button></a>
                <a href="/patient/create/form"><button>Crea nuevo paciente</button></a>
                <h2>Todos los usuarios </h2>
                
                </div>

                <ol>
                ${users.map(user=> {
                    return(
                        `
                        <div 
                        style=
                        "
                        display:flex;
                        justify-content:center;
                        gap:20px;
                        padding: 2px 2px 2px 2px;
                        margin: 2px 2px 2px 2px;
                        ">
                    
                    <a href="/user/ssr/${user._id}">${user.username} </a>
                        </div>
                    `
                )}).join('')}
            
                
                </ol>
                `
            )
        }catch (error){
            console.error(error);
        }
    },

    async getOneUserSsr (req,res){
      try {
        const id = req.params._id;
        const user = await User.findById(id)//Find es un metodo de mongo que te permite encontrar todos los productos en este caso
        res.send(
          `
          <!DOCTYPE html>
                <html lang="es">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  
                  <title>Paciente</title>
                </head>
                <body>
                
          <div style="
          display:flex; 
          flex-direction:column; 
          align-items:center;
          border: 1px solid black;
          ">
          <a href="/dashboard">Home</a>
          <ul>
          <li>Nombre: ${user.nombre}</li>
          <li>Username: ${user.username}</li>
          <li>Contraseña: ${user.contraseña}</li>
          </ul>
          <form action="/patient/update/${id}" method="post">
          <label for="name">Nombre</label>
            <input type="text"placeholder="Nombre" name="nombre"></input>
            <button type="submit">Modificar Datos</button>
          </form>

          <form action="/user/${id}" method="POST">
            <button type="submit">Borrar</button>
          </form>
          </div>
          `
        );
    } catch (error) {
        console.error(error);
    }
    },

    async verifyTokens(req,res){
        const userId = req.user;
  const user = users.find((user) => user.id === userId);
  if (user) {
    res.send(`
    <div style="
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    ">
      <h1>Bienvenido, ${user.name}</h1>
      <p>ID: ${user.id}</p>
      <p>UserName: ${user.username}</p>
<div>
      <button><a href="/">HOME</a></button>
</div>
<div>
      <button><a href="/patients/ssr">Todos los Pacientes</a></button>
      <button><a href="/user/ssr">Todos los usuarios</a></button>
</div>
<div>
      <button><a href="/patient/create/form"> Crea nuevo Paciente</a></button>
      <button><a href="/login/create"> Crea nuevo Usuario</a></button>
</div>
      <form action="/logout" method="post">
        <button type="submit">Cerrar sesión</button> 
      </form>
      </div>
    `);
  } else {
    res.status(401).json({ mensaje: 'Usuario no encontrado' });
  }
  },
    
   async destroySession (req,res){
    req.session.destroy();
  res.redirect('/');

   },

   async deleteUser (req, res) {
    try {
      const id = req.params._id
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
        return res.status(404).json({message: "User with that id not found"})
      }  
    
      res.send(
        `
        <p>  User deleted successfully, ${deletedUser}</p>
      <a href="/patients/ssr">Home</a>
      <a href="/patient/create/form"><button>Crea un nuevo paciente</button></a>
      `)
      
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
}
}

module.exports= UserController;