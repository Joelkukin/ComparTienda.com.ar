import TablaDB from "./ORM.js";
const shortlinks = new TablaDB({
    nombre:"shortlinks",
    id:"id_shortlink",
    campos: {
        id_shortlink:"INT(10) AUTO_INCREMENT",
        link:"VARCHAR(45)"
    }
    //,foraneas:{}
})

/* Testing */

// let itemsShortlink = await shortlinks.getAll()
// console.log(itemsShortlink)

// console.log("shortlinks: ")
// let nuevoShortlink = await shortlinks.add({link:"https://www.youtube.com"})
// console.log() //?
// let shortlinkList = await shortlinks.search({buscar:"54", en:"id_shortlink"})
// let modified = await shortlinkList[0].update({link:"https://www.facebook.com"})
//  console.log("Objeto modificado: ", modified)



export default shortlinks