import usuarios from "../models/Usuarios.js";
export async function login (req, res, next) {

  // recibo el usuario y contraseña del formulario de login {usuario, contraseña}
  let {username, password} = req.body
  

  // validar que username:string y password:string
  if (!username || !password) {
    return res.status(400).send('Ingrese usuario y contraseña.')
  } else {
    
    // los busco en la base de datos
    try {
      let usuario =  await usuarios.search({en:"username", buscar: username, traer:["username", "password"]})
      usuario = usuario[0]
      // si coincide el usuario y la contraseña, retorna true, sino false
      if (usuario.username !== username || usuario.password !== password) {
        return res.status(400).send('Usuario o contraseña incorrectos.')
      } else {

        res.status(200).send(true)
      }
      
    } catch (error) {
      console.log(error)
      res.status(500).json({code: error.code ,error:error.message})
    }
  
    
    // si no coincide, lo redirijo al login y aumento el contador en uno
    // al tercer intento se hace esperar al usuario 30 min para poder reintentar
  

  }
}

export async function register (req, res, next){
  // recibo los datos del formulario de registro {nombre, mail, partner, username, password, tipo}
  let {nombre, mail, partner, username, password, tipo} = req.body
  
  // verifico si el usuario ya existe

  // si existe respondo que ya existe
  // si no existe lo registro en la base de datos (usuarios.add) y lo reenvio al login

  res.status(200).json({status, message})
}
export default {login, register}