import express from "express"
import shortlinks from "../models/shortlinks.js";
import {procesarUrl} from "../utils/validaciones.js";
const router = express.Router()

router.get('//:id_shortlink', async (req, res) => {
  let redirectUrl = await shortlinks.search({buscar:req.params.id_shortlink, en:"id_shortlink"})
  if(redirectUrl[0]){
    res.status(200).redirect(procesarUrl(redirectUrl[0].link)) 
  }else{
    res.send('crear nuevo shortlink')
  }
})

export default router