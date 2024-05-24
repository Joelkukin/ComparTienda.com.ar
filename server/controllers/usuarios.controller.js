import usuarios from "../models/Usuarios.js";

export async function getAll () { 
  let resultado;
  try {
    resultado = await usuarios.getAll();
  } catch (error) {
    resultado = error.message
  }
  
  console.log("controller: ",resultado)
  return resultado
}

export async function search ({en, buscar, traer = null}) { 
  let params = {en, buscar};
  if (traer !== null) {
    params.traer = traer;
  }
  let resultado;
  try {
    resultado = await usuarios.search(params);
  } catch (error) {
    resultado = error.message
  }
  
  console.log("controller: ",resultado)
  return resultado
}

export async function getById (id) { 
  let resultado;
  try {
    resultado = await usuarios.getById(id);
  } catch (error) {
    resultado = error.message
  }
  console.log("controller: ",resultado)
  return resultado
}

export async function add (item) { 
  
  let resultado;
  try {
    resultado = await usuarios.add(item);
  } catch (error) {
    resultado = error.message
  }
  
  console.log("controller: ",resultado)
  return resultado
}
export async function update (id, modificaciones) { 
  let resultado;
  try {
    resultado = await usuarios.update(id, modificaciones);
  } catch (error) {
    resultado = error.message
  }
  
  console.log("controller: ",resultado)
  return resultado
}
export async function remove (id) {
  let itemABorrar = await getById(id) 
  //alert("Estás seguro que deseas borrar ",itemABorrar)
  let resultado;
  try {
    resultado = await usuarios.remove(id);
  } catch (error) {
    resultado = error.message
  }
  
  console.log("controller: ",resultado)
  return resultado
}

export default { getAll, search, getById, add, update, remove }