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
if(localStorage.getItem("pedido")){
    pedido = JSON.parse(localStorage.getItem("pedido"))
}else{
    localStorage.setItem("pedido", JSON.stringify(pedido))
}
console.log (pedido)

//declaracion al Dom
let plantilla = document.getElementById("container")
let carritoproductos = document.getElementById("contenedorPedido")
let totalCompra = document.getElementById("total")

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

catalogoProductos(productos)


class Carrito {
    constructor(producto, cantidad) {
        this.producto = producto,
        this.cantidad = cantidad
    }
    sumaproducto() {
        this.cantidad = this.cantidad + 1
    }
}



function agregarAlCarrito(car) {
    let busquedaCarrito = pedido.find(m => m.producto == car)

    if (busquedaCarrito != undefined) {
        let ubicar = pedido.findIndex(e => e.producto == busquedaCarrito.producto)
        pedido[ubicar].sumaproducto
        console.log(pedido)
        Toast.fire({
            icon: 'success',
            title: `El producto  se agregó al carrito :3`
        })

    }
    else {
        const agregar = new Carrito(car, 1)
        pedido.push(agregar)
        console.log(pedido)
        localStorage.setItem("pedido", JSON.stringify (pedido))
        Toast.fire({
            icon: 'success',
            title: `El producto se agregó al carrito :3`
        })
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
        
        card.className = "orden"
        card.innerHTML = ` <div>
        <div class="infoCarrito">
        <h4>${informacionProducto.producto}</h4>
        <p>Llevas  una cantidad de ${item.cantidad}, con un valor de ${informacionProducto.precio} pesos</p>
        </div>
        </div>`
        carritoproductos.append(card)
    }
    compraTotal(pedido)

}

function cerrarCarrito(){
    document.getElementById("mostrarCarrito").style.display ="none"
}
function comprar(){
    document.getElementById("mostrarCarrito").style.display = "flex"

    pedido.length >=1 ?  document.getElementById("SinProductos").style.display ="none" : document.getElementById("SinProductos").style.display ="inherit"
    
    verCarrito(pedido)
}
function compraTotal(pedido){
    totalCompra.innerHTML = ""
    let totalPedido = 0
    
    for (item of pedido){
    let informacionProducto = productos.find(fruta => fruta.id === item.producto)
    totalPedido = totalPedido + informacionProducto.precio
        totalPedido == 0 ? totalCompra.innerHTML = `No hay productos en el carrito` : totalCompra.innerHTML = `El total del carrito es <strong></strong>`
        totalCompra.append(totalPedido)
}
    
    // let sumatoria = document.createElement("div")
    // sumatoria.innerHTML = ``
}





    // let totalCompra = comp.reduce((acc, pedido)=> acc + pedido.precio ,0)
    // console.log("Acc con reduce " + totalCompra)

























//Storage y JSON
//localStorage.setItem("Pedido Guardado", JSON.stringify(pedido))

/* 

if(localStorage.getItem("pedido")){
    pedido = JSON.parse(localStorage.getItem("pedido"))
}else{
    //si no existe, entra al else
    console.log("Seteamos por primera vez, entra sólo en la primera vez")
    estanteria.push()
    localStorage.setItem("pedido", JSON.stringify(pedido))
}














localStorage.setItem("Pedido Guardado", JSON.stringify (pedido))




proceso anterior
// solicitud de nombre
function saludo() {
    let nombreIngresado = prompt(`¡Hola! estamos muy cotentos que nos visites, nos gustaría saber cómo quieres que te llamemos"`)
    console.log(`El cliente se llama ${nombreIngresado}`)
    return nombreIngresado
}
//let nombre = saludo()
// funciones Menu pulpas
function pedidoChontaduro(pedido) {
    let agregarChontaduro = parseInt(prompt(`cuentanos cauntas libras de ${producto1.producto} vas llevar`))
    const pedido1 = new Productos("Pulpa", "Chontaduro", "Región Occidental de la Cuenca Amazónica", 5000 * agregarChontaduro)
    pedido.push(pedido1)
    console.log(`agregaste al carrito ${agregarChontaduro} libras de ${producto1.producto} con un valor de ${pedido1.precio}`)
}
function pedidoCamuCamu(pedido) {
    let agregarCamuCamu = parseInt(prompt(`cuentanos cauntas libras de ${producto2.producto} vas llevar`))
    const pedido2 = new Productos("Pulpa", "Camu Camu", "Amazonía occidental", 6300 * agregarCamuCamu)
    pedido.push(pedido2)
    console.log(`agregaste al carrito ${agregarCamuCamu} libras de ${producto2.producto} con un valor de ${pedido2.precio}`)
}
function pedidoGulupa(pedido) {
    let agregarGulupa = parseInt(prompt(`cuentanos cauntas libras de ${producto3.producto} vas llevar`))
    const pedido3 = new Productos("Pulpa", "Gulupa", "Amazonía brasileña", 5800 * agregarGulupa)
    pedido.push(pedido3)
    console.log(`agregaste al carrito ${agregarGulupa} libras de ${producto3.producto} con un valor de ${pedido3.precio}`)
}
function pedidoGuama(pedido) {
    let agregarGuama = parseInt(prompt(`cuentanos cauntas libras de ${producto4.producto} vas llevar`))
    const pedido4 = new Productos("Pulpa", "Guama", "Centroamérica", 6700 * agregarGuama)
    pedido.push(pedido4)
    console.log(`agregaste al carrito ${agregarGuama} libras de ${producto4.producto} con un valor de ${pedido4.precio}`)
}
function pedidoAsai(pedido) {
    let agregarAsai = parseInt(prompt(`cuentanos cauntas libras de ${producto5.producto} vas llevar`))
    const pedido5 = new Productos("Pulpa", "Asaí", "Región Amazonica Colombiana", 6900 * agregarAsai)
    pedido.push(pedido5)
    console.log(`agregaste al carrito ${agregarAsai} libras de ${producto5.producto} con un valor de ${pedido5.precio}`)
}
// cantidad de pedidos pulpas
function pedidosPulpas() {
    let menuPulpas = parseInt(prompt(`Con tu apoyo estás aportando al conocimiento y el sostenimiento de las frutas nativas del país, por ello estamos contentos de mostrarte nuestro menu de pulpas
    1 - Chontaduro x 1Libra
    2 - Camu Camu x 1 libra
    3 - Gulupa x 1 libra
    4 - Guama x 1 libras
    5 - asai x 1 libra`))
    switch (menuPulpas) {
        case 1:
            pedidoChontaduro(pedido)
            break
        case 2:
            pedidoCamuCamu(pedido)
            break
        case 3:
            pedidoGulupa(pedido)
            break
        case 4:
            pedidoGuama(pedido)
            break
        case 5:
            pedidoAsai(pedido)
            break
        default:
            alert("Ups, creo que te equivocaste intenta de nuevo")
            break
    }

}
// funciones Menu Helados
function pedidoChontaduroHelado(pedido) {
    let agregarChontaduroHelado = parseInt(prompt(`cuentanos cauntas libras de ${producto6.producto} vas llevar`))
    const pedido6 = new Productos("Helado", "Chontaduro con queso", "Región Occidental de la Cuenca Amazónica", 8500 * agregarChontaduroHelado)
    pedido.push(pedido6)
    console.log(`agregaste al carrito ${agregarChontaduroHelado} litros de ${producto6.producto} con un valor de ${pedido6.precio}`)
}
function pedidoCamuCamuHelado(pedido) {
    let agregarCamuCamuHelado = parseInt(prompt(`cuentanos cauntas libras de ${producto7.producto} vas llevar`))
    const pedido7 = new Productos("Helado", "Camu Camu y arequipe", "Amazonía occidental", 8000 * agregarCamuCamuHelado)
    pedido.push(pedido7)
    console.log(`agregaste al carrito ${agregarCamuCamuHelado} libras de ${producto7.producto} con un valor de ${pedido7.precio}`)
}
function pedidoGulupaHelado(pedido) {
    let agregarGulupaHelado = parseInt(prompt(`cuentanos cauntas libras de ${producto3.producto} vas llevar`))
    const pedido8 = new Productos("Helado", "Gulupa con chocolate", "Amazonía brasileña", 8800 * agregarGulupaHelado)
    pedido.push(pedido8)
    console.log(`agregaste al carrito ${agregarGulupaHelado} libras de ${producto8.producto} con un valor de ${pedido8.precio}`)
}
function pedidoGuamaHelado(pedido) {
    let agregarGuamaHelado = parseInt(prompt(`cuentanos cauntas libras de ${producto9.producto} vas llevar`))
    const pedido9 = new Productos("Helado", "Guama con leche condensada", "Centroamérica", 9300 * agregarGuamaHelado)
    pedido.push(pedido9)
    console.log(`agregaste al carrito ${agregarGuama} libras de ${producto9.producto} con un valor de ${pedido9.precio}`)
}
function pedidoAsaiHelado(pedido) {
    let agregarAsaiHelado = parseInt(prompt(`cuentanos cauntas libras de ${producto10.producto} vas llevar`))
    const pedido10 = new Productos("Helado", "Asaí con galleta", "Región Amazonica Colombiana" * agregarAsaiHelado)
    pedido.push(pedido10)
    console.log(`agregaste al carrito ${agregarAsaiHelado} libras de ${producto5.producto} con un valor de ${pedido10.precio}`)
}

// pedido de helados
function pedidosHelados() {
    let menuHelados = parseInt(prompt(`Con tu apoyo estás aportando al conocimiento y el sostenimiento de las frutas nativas del país, por ello estamos contentos de mostrarte nuestro menu de pulpas
    1 - Chontaduro con queso x 1 Litro
    2 - Camu Camu y arequipe x 1 Litro
    3 - Gulupa con chocolate x 1 Litro
    4 - Guama con leche condensada X 1 Litro
    5 - asai con galleta x 1 Litro`))

    switch (menuHelados) {
        case 1:
            pedidoChontaduroHelado(pedido)
            break
        case 2:
            pedidoCamuCamuHelado(pedido)
            break
        case 3:
            pedidoGulupaHelado(pedido)
            break
        case 4:
            pedidoGuamaHelado(pedido)
            break
        case 5:
            pedidoAsai(pedido)
            break
        default:
            alert("Ups, creo que te equivocaste intenta de nuevo")
            break

    }

}
function Vincular(array) {
    let tipoDeProducto = prompt(`Cuentanos que tipo de producto quieres que se venda la fruta: Helado o Pulpa`)
    let ProductoDeVenta = prompt(`Cuentanos cual es el nombre de la fruta`)
    let OrigenDeFruta = prompt(`Cuentanos de donde es el orogen de la fruta`)
    let PecioFruta = prompt(`Cuentanos cual es costo por libra de la fruta`)

    const nuevaFruta = new Productos(tipoDeProducto, ProductoDeVenta, OrigenDeFruta, PecioFruta)
    console.log(`agregaste ${ProductoDeVenta} de origen de ${OrigenDeFruta} con un valor de ${PecioFruta}`)
    array.push(nuevaFruta)
}
function MenuRepetitivo() {
    let salirMenu = false
    do {
        salirMenu = Menu(salirMenu)
    } while (!salirMenu)
}

function Menu(salirDeMenu) {
    do {
        let menuOpciones = parseInt(prompt(`${nombre} cuentanos que se antoja
    1 - Pulpas de frutas nativas de la región
    2 - Helados de combinaciones épicas
    3 - Vincular una fruta nativa de la región
    0 - terminar de pedir`))

        switch (menuOpciones) {
            case 1:
                pedidosPulpas(pedido)
                break
            case 2:
                pedidosHelados(pedido)
                break
            case 3:
                Vincular(productos)
            case 0:
                alert(`${nombre} gracias por tu compra`)
                console.log("pedido finalizado")
                salirDeMenu = true
                return salirDeMenu
                break
            default:
                console.log("inetnta de nuevo")

                break
        }
    } while (salirDeMenu)
}
//MenuRepetitivo()


 */