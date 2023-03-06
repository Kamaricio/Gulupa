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
const producto1 = new Productos(1, "Pulpa", "Chontaduro", "Región Occidental de la Cuenca Amazónica", 5000)
const producto2 = new Productos(2, "Pulpa", "Camu Camu", "Amazonía occidental", 6300)
const producto3 = new Productos(3, "Pulpa", "Gulupa", "Amazonía brasileña", 5800)
const producto4 = new Productos(4, "Pulpa", "Guama", "Centroamérica", 6700)
const producto5 = new Productos(5, "Pulpa", "Asaí", "Región Amazonica Colombiana", 6900)
const producto6 = new Productos(6, "Helado", "Chontaduro con queso", "Región Occidental de la Cuenca Amazónica", 8500)
const producto7 = new Productos(7, "Helado", "Camu Camu y arequipe", "Amazonía occidental", 8000)
const producto8 = new Productos(8, "Helado", "Gulupa con chocolate", "Amazonía brasileña", 8800)
const producto9 = new Productos(9, "Helado", "Guama con leche condensada", "Centroamérica", 9300)
const producto10 = new Productos(10, "Helado", "Asaí con galleta", "Región Amazonica Colombiana", 9100)

// construccion del array
const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10]
const pulpasArray = [producto1, producto2, producto3, producto4, producto5]
const heladosArray = [producto6, producto7, producto8, producto9, producto10]
let pedido = []
if (localStorage.getItem("pedido")) {
    pedido = JSON.parse(localStorage.getItem("pedido"))
    console.log (pedido)
} else {
    localStorage.setItem("pedido", JSON.stringify(pedido))
}
console.log(pedido)

//declaracion al Dom
let plantilla = document.getElementById("container")
let carritoproductos = document.getElementById("contenedorPedido")
let totalCompra = document.getElementById("total")
let loader = document.getElementById("loader")

//plantilla catalogo de productos

function catalogoProductos(productos) {

    for (let fruta of productos) {
        let plantillaCard = document.createElement("div")
        plantillaCard.className = ""
        plantillaCard.innerHTML = ` <div class="card" id="card${fruta.id}">
                                    <div class="cajaImagen">
                                        <img src="imagenes/Gulupa.jpg" alt="imagen de ${fruta.producto}">
                                    </div>
                                    <div class="contenido">
                                        <div class="detalles">
                                            <h5>${fruta.producto}</h5>
                                            <p>Fruta proveniente de ${fruta.origen} y tiene un precio de ${fruta.precio}</p>
                                        </div>
                                    <div class="botonCarrito">
                                        <input type="button" OnClick ="agregarAlCarrito(${fruta.id})" value="Agregar al Carrito">
                                    </div>
                                </div>`

        let CapturaProductos = document.getElementById("container")
        CapturaProductos.append(plantillaCard)

    }
    console.log(plantilla)
}
setTimeout(()=>{
    loader.innerHTML=""
    loader.remove()
catalogoProductos(productos)
},4000)


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


function agregarAlCarrito(car) {
    let busquedaCarrito = pedido.find(m => m.producto == car)
    
    
    if (busquedaCarrito != undefined) {
        
        let ubicar = pedido.findIndex(e => e.producto == busquedaCarrito.producto)
        console.log(ubicar)
        pedido[ubicar].sumaProducto()
        console.log(pedido)
        Toast.fire({
            icon: 'success',
            title: `El producto  se agregó al carrito :3`
        })

    }
    else {
        const agregar = new Carrito(car, 1)
        localStorage.setItem("pedido", JSON.stringify(pedido))
        Toast.fire({
            icon: 'success',
            title: `El producto se agregó al carrito :3`
        })
        pedido.push(agregar)
        console.log(pedido)
    }
}


window.addEventListener("scroll", function () {
    let header = document.querySelector("header")
    header.classList.toggle("claro", window.scrollY > 0)
})

function verCarrito() {
    carritoproductos.innerHTML = ""
    for (item of pedido) {
        let informacionProducto = productos.find(fruta => fruta.id === item.producto)
        let card = document.createElement("div")
        card.id = `producto${item.producto}`
        card.className = "orden"
        card.innerHTML = `
        <div class="infoCarrito">
        <h4>${informacionProducto.producto}</h4>
        <p>Llevas  una cantidad de ${item.cantidad}, con un valor de ${informacionProducto.precio} pesos</p>
        </div>
        <button class="basurita" id="eliminarProducto${item.producto}" >
            <img src="imagenes/trash-can-solid.svg" alt="imagen de contenedor de basura">
            </button>
        `
        carritoproductos.append(card)


}

    compraTotal(pedido)
    menosUno(pedido)

}

function cerrarCarrito() {
    document.getElementById("mostrarCarrito").style.display = "none"
}
function comprar() {
    document.getElementById("mostrarCarrito").style.display = "flex"

    pedido.length >= 1 ? document.getElementById("SinProductos").style.display = "none" : document.getElementById("SinProductos").style.display = "inherit"

    verCarrito(pedido)
}

function menosUno(array){
    array.forEach(item => {
        
        document.getElementById(`eliminarProducto${item.producto}`).addEventListener("click", ()=>{
            let numeroOrden = document.getElementById(`producto${item.producto}`)
            numeroOrden.remove()
            let busquedaCarrito = pedido.find(m => m.producto == numeroOrden)
            let index = pedido.indexOf(busquedaCarrito)
            pedido.splice(index, 1)
            pedido.length >= 1 ? document.getElementById("SinProductos").style.display = "none" : document.getElementById("SinProductos").style.display = "inherit"
            localStorage.setItem("pedido", JSON.stringify(pedido))
            compraTotal(pedido)


        })
    });
        
    
}


function vaciarCarrito() {
    pedido = []
    pedido.length >= 1 ? document.getElementById("SinProductos").style.display = "none" : document.getElementById("SinProductos").style.display = "inherit"
    localStorage.setItem("pedido", JSON.stringify(pedido))
    compraTotal(pedido)
    carritoproductos.innerHTML = ""

}
function compraTotal(pedido) {
    totalCompra.innerHTML = ""
    let totalPedido = 0

    for (item of pedido) {
        let informacionProducto = productos.find(fruta => fruta.id === item.producto)
        totalPedido = totalPedido + informacionProducto.precio
        totalPedido == 0 ? totalCompra.innerHTML = `No hay productos en el carrito` : totalCompra.innerHTML = `El total del carrito es <strong></strong>`
        totalCompra.append(totalPedido)
    }
}
function finalizarCompra(){

    if (pedido.length = 0){
        Swal.fire(
            'No hay productos en carrito',
            'el carrito esta vacio :c',
            'info'
          )
    }else{
        pedido = []
        swalWithBootstrapButtons.fire({
            title: '¿Deseas finalizar la compra?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: '¡Sí, lo quiero ya!',
            cancelButtonText: '¡No, lo pensaré!',
            cancelButtonColor: `#ff7f50`,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    '¡Gracias!',
                    'Tu compra ha sido Exitosa :3',
                    'success'
                )
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            '¡Ohhhh, no!',
            'tu compra no ha sido exitosa',
            'error'
            )
        }
    })
}
}


