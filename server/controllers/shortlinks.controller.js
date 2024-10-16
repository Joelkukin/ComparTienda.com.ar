
import shortlinks from "../models/shortlinks.js";
export async function getAll (req, res, next) {
  let queryResult = await shortlinks.getAll()
  console.log("queryResult",queryResult)
  if(queryResult[0]){
    res.status(200).send(queryResult) 
  }else{
    res.send(false)
  }
}

export async function getById (req, res, next) {

  let queryResult = await shortlinks.getById(req.params.id_shortlink)
  // console.log(queryResult.result.link)
  if(queryResult){
    res.status(200).redirect(procesarUrl(redirectUrl.result.link)) 
    // res.status(200).send(queryResult.result.link) 
  }else{
    res.send(false)
  }
}

// DESARROLLAR
export async function crear (req, res, next) {
  /* let queryResult = await shortlinks.getAll()
  console.log("queryResult",queryResult)
  if(queryResult[0]){
    res.status(200).send(queryResult) 
  }else{
    res.send(false)
  } */
}
export default {getAll, getById, crear}