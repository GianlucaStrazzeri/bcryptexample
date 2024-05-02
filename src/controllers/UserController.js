const {User} =require ("../models/Users")// requiero los usuarios de models
const {Patient} =require ("../models/Patients")// requiero los pacientes de models

const UserController={
    async getLogin (req,res){
        try{
            res.send(
                `
                <div style="display:flex; flex-direction:column; align-items:center;">
                <a href="/patients/ssr">Home</a>
                <h1>Login</h1>
                <p> Have you got an account? </p>
                
                <form action="/user/create" method="POST">
                <input type="text" name="username" placeholder="username"></input>
                <input type="password" name="contraseña" placeholder="password"></input>
                <button>Enter</button>
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