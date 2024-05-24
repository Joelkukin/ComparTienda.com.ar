import TablaDB from "./ORM.js";
const usuarios = new TablaDB({
    nombre:"usuarios",
    id:"id",
    campos: {
        id:"INT AUTO_INCREMENT",
        nombre:"VARCHAR(50)",
        mail:"VARCHAR(50)",
        partner:"INT",
        username:"VARCHAR(50)",
        password:"VARCHAR(50)",
        tipo:"VARCHAR(50)",
    }
    //,foraneas:{}
})

export default usuarios
/* class Usuario extends TablaDB{
    id; nombre; partner; username; password; mail; tipo;	
    constructor({id, nombre, mail, partner, username, password, tipo}){
        this.id=id || "id";
        this.nombre=nombre || "nombre";
        this.mail=mail || "mail";
        this.partner=partner || "partner";
        this.username=username || "username";
        this.password=password || "password";
        this.tipo=tipo || "tipo";
        
    }
    set(params){
        this.tabla.update(this.id,params)
    }
    delete(){
        this.tabla.delete(this.id)
    }
    comprar(nombre_producto, tienda){
        let tienda = dbCuentas.find(cuenta=> cuenta.tipo === "tienda")
        // elegir producto
        // find: por cada elemento del array, devuelve el elemento que cumpla la condicion indicada en el callback
        let producto = tienda.productos.find(item => item.nombre == nombre_producto);
        
        // procesar el pago
        saldo -= producto.precio
        tienda.saldo += producto.precio

        // registrar la compra
    }
    
    ver_transacciones(){
        // generar interfaz
        // mostrar por consola
    }

} */

