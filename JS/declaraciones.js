//Constantes
pulpas = 5000
helados = 8000
malteadas = 14000
Postres = 12000
iva = 1.19

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
    })

// Funcion constructora
class Productos {
    constructor(id, tipo, producto, origen, precio) {
        this.id = id,
        this.tipo = tipo,
        this.producto = producto
        this.origen = origen,
         this.precio = precio
    }
    informacionProducto() {
        console.log(` es produto es ${this.producto} y ayudarás a los campesinos e indigenas de ${this.origen}`)
    }
}

class Carrito {
    constructor(producto, cantidad) {
        this.producto = producto,
        this.cantidad = cantidad
    }
    sumaProducto() {
        this.cantidad = this.cantidad + 1
    }
    restaproducto(){
        this.cantidad = this.cantidad - 1
    }
}

const CargaProductos = async () =>{
    const resp = await fetch("JS/productos.json")
    const data = await resp.json()
    console.log(data)
    for (let fruta of data){
        let produtoNuevo = new Productos (fruta.id, fruta.tipo, fruta.producto, fruta.origen, fruta.precio)
        productos.push(produtoNuevo)
        localStorage.setItem("productos", JSON.stringify(productos))

        }
} 

let productos = []
if (localStorage.getItem("productos")) {
    productos = JSON.parse(localStorage.getItem("productos"))
    console.log (productos)
} else {
    CargaProductos()
}


let pedido = []
if (localStorage.getItem("pedido")) {
    for (let fruta of JSON.parse(localStorage.getItem("pedido"))){
    let productoPedido = new Carrito (fruta.producto, fruta.cantidad)
    console.log (productoPedido)
    pedido.push(productoPedido)}
} else {
    CargaProductos()
    localStorage.setItem("pedido", JSON.stringify(pedido))
}
console.log(pedido)

//declaracion al Dom
let plantilla = document.getElementById("container")
let carritoproductos = document.getElementById("contenedorPedido")
let totalCompra = document.getElementById("total")
let loader = document.getElementById("loader")
let encuentro = document.querySelector("#encuentro")
let noCoincidencia = document.getElementById("noCoincidencia")