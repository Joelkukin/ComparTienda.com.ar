import TablaDB from "./TablaDB.js";
const transacciones = new TablaDB({
    name:"transacciones",
    id:"id_transaccion",
    campos: {
        id_transaccion:"INT(10) AUTO_INCREMENT",
        comprador:"VARCHAR(45)",
        vendedor:"VARCHAR(45)",
        articulos:"LONGTEXT",
        total: "int(15)"
    }
    //,foraneas:{}
})
export default transacciones