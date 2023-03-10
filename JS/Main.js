
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
    //console.log(plantilla)
}
setTimeout(()=>{
    loader.innerHTML=""
    loader.remove()
catalogoProductos(productos)
},4000)

//Funcion para agregar al array carrito

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

// funcion toogle navbar

window.addEventListener("scroll", function () {
    let header = document.querySelector("header")
    header.classList.toggle("claro", window.scrollY > 0)
})

// funcion platilla carrito

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
        totalPedido = totalPedido + (informacionProducto.precio * item.cantidad)
        totalPedido == 0 ? totalCompra.innerHTML = `No hay productos en el carrito` : totalCompra.innerHTML = `El total del carrito es <strong></strong>`
        totalCompra.append(totalPedido)
    }
}
function finalizarCompra(){

    if (pedido.length <= 0){
        
        Swal.fire(
            'No hay productos en carrito',
            'el carrito esta vacio :c',
            'info'
        )
        
    }else{
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
                vaciarCarrito()
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

// evento del buscador

encuentro.addEventListener("input", ()=>{
    buscarProducto(encuentro.value, productos)
})

// function del buscador

function buscarProducto(busqueda, productos){
    plantilla.innerHTML = ""
    let busquedaComida = productos.filter(
    (product) => product.producto.toLowerCase().includes(busqueda) || product.tipo.toLowerCase().includes(busqueda)
)
    if (busquedaComida.length == 0){
        noCoincidencia.innerHTML = `No hay coincidencias`
        catalogoProductos(busquedaComida) 

    }  else{
        noCoincidencia.innerHTML = ``
        catalogoProductos(busquedaComida) 
    }

}
