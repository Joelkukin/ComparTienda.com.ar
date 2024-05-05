import dbCuentas from "../base de datos/cuentas.json"
import ItemDB from "./ItemDB.js";
class UsuarioModel  extends ItemDB{
    id; nombre; partner; username; password; mail; tipo;	
    saldo = 0;
    transacciones = []
    constructor(campos){
        
        this.usuario = campos.usuario;
        this.contraseña = campos.contraseña;
        this.partners = campos.partners;
        this.saldo = 0;

    }
    getUsuarios(){}
    getUsuarioById(){}
    addUsuario(product){}
    updateUsuario(id, product) {}
    deleteUsuario(id) {}

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

}