import { useState } from 'react'

async function loguear (e) {
  e.preventDefault();
  
  let usuarios = await fetch("http://localhost:3000/login", {
    method: 'POST', // o 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // data es tu objeto de datos
  })
  let resJson = await usuarios.json()
  resJson.forEach(row => {
    
  });
  console.log(resJson)
  return resJson
}

function Login
() {

  return (
    <>
    
    <form action="" method="post" className=''>
      <label htmlFor="email">email: </label>
      <input type="email" name="email" id="" />

      <label htmlFor="password">password: </label>
      <input type="text" name="password" id="" />
      <button type="submit" onClick={loguear}>login</button>
      <div id="resLogin">

      </div>
    </form>
     
    </>
  )
}

export default Login
