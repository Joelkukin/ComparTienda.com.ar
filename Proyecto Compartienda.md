# Compartienda

## Descripción general

Este proyecto tiene como objetivo la creación de un marketplace que se destaca por su sistema de marketing de afiliados, lo que facilita que los negocios puedan vender sus productos sin tener que pagar por los las visitas que no se convierten en compradores reduciendo asi el coste de la publicidad

este sistema de marketing de afiliados se enfoca en incentivar la recomendación boca a boca basado en que la recomendación de un amigo o conocido tiene más credibilidad que la recomendación de un anuncio publicitario

# 

```js
permisos: {
  mayus: usuario
  minus: automatizado
}
```

### ¿que partes componen a este marketplace?

1. sistema de login y registro

2. sistema de afiliados

3. sistema de productos

4. sistema de carrito de compras

### ¿que diferencias tienen con un crud normal?

login: el frontend del usuario comun solo tiene acceso al "buscador" para buscar si el usuario tiene acceso o no. no tiene acceso al crud completo, solo la cuenta master)

productos: es un CRUD en toda regla, solo varia el formato en el que se muestran los productos y el front del usuario comun no puede editar los productos

sistema de afiliados: cualquiera puede escribir (registrarse) pero solo los afiliados pueden leer los registros debajo suyo

carrito de compras: al enviar se sigue un formulario para el pago

### parece que todos son instancias de CRUD (Cada punto es un controller)

1- sistema de login y registro

```
    a) CRUD "registro de usuarios"
        PERMISOS: "C"

    b) CRUD "login"
        PERMISOS: "R"
```

2- sistema de productos

```
    a) CRUD "buscador/listado de productos" 
        PERMISOS: "Ru" 
        MOD_BY: "carrito de compras"
        FILTRO: "$categoria", "$precio"

    b) CRUD "cargador de productos" (solo cuentas "tienda") 
        PERMISOS: "CRUD"

    c) CRUD "carrito de compras" 
        PERMISOS: "cRUD"
        MODIFY: "buscador/listado de productos", "registro de ventas"
        AFTER: "pagina de gracias", "sistema de seguimiento de paqueteria" (averiguar api de correo argentino y demás logisticas)
```

3- sistema de afiliados

```
    a) CRUD "registro de ventas" (vendedor, usuario, lista:[productos]) // solo cuentas "tienda"
        PERMISOS: "cR" 
        MOD_BY: "carrito de compras"
        FILTRO: "$afiliado", "$precio"

```

### Caracteristicas de un CRUD

1. interactua con una tabla de la BD (Create, Read, Update, Delete)

2. puede ser accedido por diferentes vistas

Vistas CRUD:
    a- como tabla 
    b- como galeria

Formas de modificar los datos en cada item:
    a- con un formulario popup
    b- en el mismo registro
    c- con un boton especifico para cada acción que muestre un popup con un formulario

viendolo como clases seria: 

```js
  class ItemCRUD{
    //create
    constructor(){} 
    //read
    get(){},
    //update
    set(){},
    //delete
    delete(){}
  }

  class CRUD {
    constructor(props /* object */){
      this.props;
    }
    objects:  [/* ItemCRUDs */] 

    renderTabla(){/* retornar vista como Tabla */}
    renderGaleria(){/* retornar vista como Galeria */}
  }
```

# 
