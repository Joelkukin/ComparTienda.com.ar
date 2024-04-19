import dbCuentas from "../base de datos/cuentas.json"
class UsuarioModel {
    usuario;
    contraseña;
    partners = {
        partner_padre,
        partner_abuelo
    };
    afiliados;
    saldo = 0;
    transacciones = []
    constructor(registro){

        this.usuario = registro.usuario;
        this.contraseña = registro.contraseña;
        this.partners = registro.partners;
        this.saldo = 0;

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

}