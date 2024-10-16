import TablaDB from "./TablaDB.js";
const productos = new TablaDB({
    nombre:"usuarios",
    id:"id",
    campos: {
        id_prod:"INT AUTO_INCREMENT",
        nombre:"VARCHAR(50)",
        mail:"VARCHAR(50)",
        partner:"INT",
        username:"VARCHAR(50)",
        password:"VARCHAR(50)",
        tipo:"VARCHAR(50)",
    }
    //,foraneas:{}
})
export default productos