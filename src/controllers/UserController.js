const {User} =require ("../models/Users")// requiero los usuarios de models
const {Patient} =require ("../models/Patients")// requiero los pacientes de models
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const { users } = require('../data/users');

const UserController={

    async getHomePage (req,res){
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
                <a href="/">Home</a>
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
                <h1>HomePage</h1>
                <form action="/logout" method="post">
                    <button type="submit">Cerrar sesión</button> 
                        </form>
                <a href="/login"><button>Login</button></a>
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

}

module.exports= UserController;