
//PROYECTO
//class constructora
class Libro {
    constructor(id, autor, titulo, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.autor = autor,
        this.titulo = titulo,
        this.precio = precio, 
        this.imagen = imagen

    }
    //métodos
    mostrarInfoLibro(){
        console.log(`El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`)
    }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

const libro1 = new Libro(1,"Jorge Luis Borges","Aleph", 900, "AlephBorges.jpg")

const libro2 = new Libro(2,"Gabriel García Marquez","Cien años de Soledad", 4500, "CienSoledadMarquez.jpg")

const libro3 = new Libro(3,"Isabel Allende", "Paula", 2800, "PaulaAllende.jpg")

const libro4 = new Libro(4,"Jorge Luis Borges","Ficciones", 1400, "FiccionesBorges.jpg")

const libro5 = new Libro(5,"Mario Benedetti", "Andamios", 2200, "AndamiosBenedetti.jpg")

const libro6 = new Libro(6, "Mario Vargas Llosa", "La ciudad y los perros", 2400, "CiudadPerrosVargasLlosa.jpg")

//crear un array de objetos: 
//2 formas de cargar un array:
//con método push
const estanteria = []
estanteria.push(libro1, libro2, libro3, libro4, libro5, libro6)

//FUNCTIONS proyecto:
//functions para el menú:
function agregarLibro(array){
    let autorIngresado = prompt("Ingrese el nombre del autor")
    let tituloIngresado = prompt("Ingrese el titulo del libro")
    let precioIngresado = parseInt(prompt("Ingrese el precio del libro"))
    
   //hacerlo con la function constructora
    const nuevoLibro = new Libro(array.length+1, autorIngresado, tituloIngresado,precioIngresado)
    console.log(nuevoLibro)

   //pushearlo o sumarlo al array
    array.push(nuevoLibro)
    mostrarCatalogo(array)
}

function mostrarCatalogo(array){
    console.log("Los libros disponibles son:")
    for(let elemento of array){
        console.log(elemento.id, elemento.titulo, elemento.autor, elemento.precio)
        
    }
}

function mostrarCatalogoForEach(arr){
    console.log("Nuestro catalogo es con forEach")
    arr.forEach(
        (libro)=>{
            console.log(`${libro.id} - ${libro.titulo} del autor/a ${libro.autor} que vale ${libro.precio}`)
        }
    )
}


function buscarPorTitulo(array){
    let tituloBuscado = prompt("Ingrese el nombre del titulo que desea buscar")
    let tituloEncontrado = array.find(
        (book) => book.titulo.toLowerCase() == tituloBuscado.toLowerCase() 
    )
    if(tituloEncontrado == undefined){
        console.log(`${tituloBuscado} no se encuentra en nuestro stock`)
    }else{
        console.log(tituloEncontrado)
    }
}


function buscarPorAutor(ar){
    let autorBuscado = prompt("Ingrese el nombre del autor que está buscando")
    let busqueda = ar.filter(
        (libro) => libro.autor.toLowerCase() == autorBuscado.toLowerCase()
    )
    if(busqueda.length == 0){
        console.log(`Para ${autorBuscado} no hay libros en stock`)
    }else{
        mostrarCatalogo(busqueda)
    }
}


//SORT -- ATENCIÓN METODO QUE DESTRUYE (AFECTA) AL ARRAY ORIGINAL -- en el after lo seguimos
// //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// // https://davidyero.medium.com/ordenar-arreglo-de-objetos-por-propiedad-o-atributo-javascript-56f74fc48906

function ordenarMenorMayor(array){
    //copia array original, para no modificar estanteria
    const menorMayor = [].concat(array)
    menorMayor.sort((param1, param2)=> param1.precio - param2.precio)
    mostrarCatalogo(menorMayor)
}
// ordenarMenorMayor(estanteria)
function ordenarMayorMenor(array){
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a,b)=> b.precio - a.precio)
    mostrarCatalogo(mayorMenor)
    
}
// ordenarMayorMenor(estanteria)
function ordenarAlfabeticamenteTitulo(array){
        const ordenadoAlfabeticamente = [].concat(array)
        //ordenar algo que tiene un dato string
        //forma de la a-z ascendente
        ordenadoAlfabeticamente.sort((a, b) => {
            if (a.titulo > b.titulo) {
                return 1
            }
            if (a.titulo < b.titulo) {
                return -1
            }
            // a es igual b
            return 0
            })
            mostrarCatalogo(ordenadoAlfabeticamente)
}

//ordenar un menu para decidir de qué manera quiere ordenar:
function ordenar(array){
    let opcion = parseInt(prompt(`
    1 - Ordenar de menor a mayor:
    2 - Ordenar de mayor a menor:
    3 - Ordenar alfabeticamente por título:`))
    switch(opcion){
        case 1:
            ordenarMenorMayor(array)
        break
        case 2:
            ordenarMayorMenor(array)
        break
        case 3:
            ordenarAlfabeticamenteTitulo(array)
        break
        default:
        console.log(`${opcion} no es válido para ordenar`)
        break
    }
}

//function borrar libro
function borrarLibro(array){
    console.log(`A partir del cátalogo ingrese el id del libro que desea eliminar:`)
    for(let elem of array){
        console.log(`${elem.id} - ${elem.titulo} del autor/a ${elem.autor}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))
    //map: copiar un array con sólo los indices
    let arrayID = array.map(book => book.id)
    //indexOf para averiguar la posición del elemento que queremos
    let indice = arrayID.indexOf(idEliminar)
    //splice para una vez localizado el elemento, borrarlo
    
    array.splice(indice,1)
    mostrarCatalogo(array)
}

function menu(){
    let salirMenu = false
    do{
        salirMenu = preguntarOpcion(salirMenu)
    }while(!salirMenu)
} 

function preguntarOpcion(salir){
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
            1 - Agregar libro
            2 - Borrar libro
            3 - Consultar catálogo
            4 - Encontrar por titulo:
            5 - Buscar libros de un mismo autor:
            6 - Ordenar libros:
            0 - Salir del menu`))
    
        switch(opcionIngresada){
            case 1:
                agregarLibro(estanteria)
            break
            case 2:
                borrarLibro(estanteria)
            break
            case 3:
                mostrarCatalogo(estanteria)
            break
            case 4:
                buscarPorTitulo(estanteria)
            break
            case 5:
                buscarPorAutor(estanteria)
            break
            case 6:
                ordenar(estanteria)
            break
            case 0:
                console.log("gracias por utilizar nuestra app")
                salir = true
                return salir
            break
            default:
                console.log("Ingrese una opción correcta")
            break
        }
}

//código
// menu()

//----------------------------------------------------------------------------------------
//PROYECTO CON DOM:

//capturo divLibros
let librosDiv = document.getElementById("libros")
let verCatalogoBtn = document.getElementById("verCatalogo")
let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo")

let guardarLibroBtn = document.getElementById("guardarLibroBtn")


//FUNCTIONS PROYECTO DOM
//imprimiendo los objetos en el DOM
function verCatalogo(array){
    //antes que se vuelva a imprimir, resear el div
    librosDiv.innerHTML = ""

    for(let libro of array){
    //código para imprimir el array
        //creamos un div padre de la card
        let nuevoLibroDiv = document.createElement("div")
        nuevoLibroDiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoLibroDiv.innerHTML = `
        <div id="${libro.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
            <div class="card-body">
                <h4 class="card-title">${libro.titulo}</h4>
                <p>Autor: ${libro.autor}</p>
                <p class="">Precio: ${libro.precio}</p>
                <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div> 
        `
        librosDiv.appendChild(nuevoLibroDiv)
        let agregarBtn = document.getElementById(`agregarBtn${libro.id}`)
        console.log(agregarBtn)
        agregarBtn.onclick = ()=>{
            console.log(libro)
            console.log(`El producto ${libro.titulo} de ${libro.autor} ha sido agregado al carrito y vale ${libro.precio}`)
        }
    }
}

//adjuntar eventos
verCatalogoBtn.onclick = function(){
    verCatalogo(estanteria)

}

ocultarCatalogoBtn.addEventListener("dblclick", ()=>{
    librosDiv.innerHTML =""
})


function cargarLibro(array){
    let inputAutor = document.getElementById("autorInput")
    let inputTitulo = document.getElementById("tituloInput")
    let inputPrecio = document.getElementById("precioInput")
    
    //hacerlo con la function constructora
    const nuevoLibro = new Libro(array.length+1, inputAutor.value, inputTitulo.value,parseInt(inputPrecio.value), "libroNuevo.jpg")
    console.log(nuevoLibro)
 
    //pushearlo o sumarlo al array
    array.push(nuevoLibro)
    verCatalogo(array)
    inputAutor.value =""
    inputTitulo.value =""
    inputPrecio.value =""    
 }

 guardarLibroBtn.addEventListener("click", ()=>{
    cargarLibro(estanteria)
 })

//probar evento input
let inputBuscador = document.querySelector("#buscador")
console.log(inputBuscador)
//por cada evento, averiguar su funcionamiento, luego pasarle function con instrucciones a realizar
inputBuscador.addEventListener("input", ()=>{
    console.log(inputBuscador.value)
})


//---------------------------------------------------------------------------------------------
//CLASE N° 5 

//PRIMERA PARTE DOM
//DOS FORMAS DE CAPTURAR/ACCEDER a elementos del DOM

//Primera getElement/s

//Dentro de getElement tenemos tres maneras
////acceder mediante etiquetas (tags)

// let etiquetas = document.getElementsByTagName("h5")
// //devuelve un HTML COllection (es como un array)
// for(let nodo of etiquetas){
//     console.log(nodo.innerText)
// }

// //Segunda forma con getElement by class
// //nos devuelve un HTML collection
// let fecha = document.getElementsByClassName("fecha")
// console.log(fecha)
// //acceder a un elemento puntual del htmlCollection igual que array
// console.log(fecha[0].innerText)

// //tercera forma con id
// //no me devuelve un htmlCollection sino el elemento/etiqueta
// let tituloDOM = document.getElementById("titulo")
// console.log(tituloDOM)
// console.log(tituloDOM.innerText)

// //Segunda forma de acceder al DOM
// //querySelector --sintaxis similar a CSS

// //captura algo por id
// let jornada = document.querySelector("#jornada")
// console.log(jornada)
// let listaPaises =document.querySelector("#listaPaises")

// //captura por class
// //si son varios para capturar todos necesitamos querySelectorAll -- sino captura sólo el primero
// // let paises =document.querySelector(".paises")
// let paises =document.querySelectorAll(".paises")
// console.log(paises)

// //para tag
// let listaLi =document.querySelectorAll("li")
// console.log(listaLi)

// //modificar texto de un nodo 
// tituloDOM.innerText = `Nuevo texto Clase 5 - DOM y Eventos`

// //innerHTML
// let listaCiudades = document.getElementById("listaCiudades")
// // un = reescribimos esa etiqueta
// //queremos que se sume
// listaCiudades.innerHTML += `
// <li class="nuevaCiudad">Santiago del Estero</li>`
// listaCiudades.innerHTML+= `
// <li id="ultimaCiudad"> Córdoba</li>
// <p>Fin del listado</p>
// `

// //una de las formas de agregar una class a cierto nodo
// listaCiudades.className = "lista formato"

// //CREAR ELEMENTO
// let nuevoLi = document.createElement("li")
// //elemento creado agregarle texto
// nuevoLi.innerText = `Argentina`
// nuevoLi.className = "nuevoPais"

// console.log(nuevoLi)

// //append y appendChild
// //sirve para agregar un nodo
// //me lo agrega al final
// // listaPaises.append(nuevoLi)

// //prepend me lo agrega como primer hijo
// listaPaises.prepend(nuevoLi)

// //remove() --> elimina nodos

// //eliminar nodo/ etiqueta:
// tituloDOM.remove()

// let ciudades = document.getElementsByClassName("ciudades")
// console.log(ciudades)
// //eliminar BS AS
// ciudades[0].remove()


//SEGUNDA PARTE -- EVENTOS
//Son los mecánimos que tenemos en JS para controlar acciones del usuario y definir el comportamiento del sitio
//handler event: funciones manejadoras de eventos (la funciones cuando el evento se ejecuta)
//la handler event pueden ser:
//tradicionales
//arrow
//anonima

// function saludoComi34150(){
//     console.log("Que tenga un feliz sábado")
//     alert("Nuestro primer evento")
// }

// function saludarAlumno(nombre){
//     alert(`Hola ${nombre}`)
// }

// //Segunda forma, semántica SOLO le podemos pasar una function a ese evento
// //Capturar
// let botonSemantico = document.getElementById("evento-semantico")
// let inputAlumno = document.getElementById("nombreAlumno")
// console.log(botonSemantico)
// console.log(inputAlumno)



//adjuntarle evento 
//qué se le asigna una function handler
//asignamos una function directamente, va sin los paretensis
// botonSemantico.onclick = saludoComi34150
// //otro evento a btn Semantico
// //function anonima o arrow, envuelvo function con parámetro para buena ejecución
// botonSemantico.onclick = function(){
//     saludarAlumno(inputAlumno.value)
//     inputAlumno.value = ""

// }
// botonSemantico.onclick = ()=>{console.log("Toma el último respetando cascada")}


// //Primera forma -- más recomendado
// //podemos pasar eventos múltiples 

// let eventoMultiple = document.getElementById("evento-multiple")

// //addEventListener
// //dos parametros
// //primero el evento que quiero que escuche
// //segundo parametro function handler
// // eventoMultiple.addEventListener("click", saludoComi34150)

// eventoMultiple.addEventListener("click", (event)=>{
//     saludarAlumno(inputAlumno.value)
//     console.log(event)
//     console.log(event.target)
//     console.log(event.type)
// })
// // eventoMultiple.addEventListener("click", function(){
// //     console.log("tercer evento asociado")
// // })

