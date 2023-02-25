
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
let estanteria = []
//dos posibilidades que en storage exista algo o que no exista
//condicional que evalue si hay algo
if(localStorage.getItem("estanteria")){
    //si existe algo en el storage entra al if
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
}else{
    //si no existe, entra al else
    console.log("Seteamos por primera vez, entra sólo en la primera vez")
    estanteria.push(libro1, libro2, libro3, libro4, libro5, libro6)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}
console.log(estanteria)

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
        // console.log(agregarBtn)
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
    //guardar en storage:
    localStorage.setItem("estanteria", JSON.stringify(array))
    verCatalogo(array)
    let formAgregarLibro = document.getElementById("formAgregarLibro")
    //revisar objeto form, tiene bastante métodos para profundizar
    // console.log(formAgregarLibro)
    // console.log(formAgregarLibro[0])
    // console.log(formAgregarLibro[1])
    // console.log(formAgregarLibro[2])
    // console.log(formAgregarLibro[0].value)
    // console.log(formAgregarLibro[1].value)
    // console.log(formAgregarLibro[2].value)
    formAgregarLibro.reset()
 }

 guardarLibroBtn.addEventListener("click", ()=>{
    cargarLibro(estanteria)
 })

//probar evento input
let inputBuscador = document.querySelector("#buscador")
// console.log(inputBuscador)
//por cada evento, averiguar su funcionamiento, luego pasarle function con instrucciones a realizar
inputBuscador.addEventListener("input", ()=>{
    console.log(inputBuscador.value)
})


//CLASE N°6 STORAGE

//local
//para cargar/ setear utilizamos el setItem
//recibe dos parámetros
//primero clave, segundo valor 
// localStorage.setItem("cursoCoder", "34150")
// localStorage.setItem("comidaFav", "asado")
// //cuando accedo o manipula la misma clave (sobreescribe el valor)
// localStorage.setItem("comidaFav", "fideos")

//para captura o traerme del storage
//método getItem
//tiene un sólo parámetro y es la clave que deseo captura

// // console.log(localStorage.getItem("cursoCoder"))
// let curso = localStorage.getItem("cursoCoder")
// //en la variable se guarda el valor 
// console.log(curso)
// console.log(localStorage.getItem("comidaFav"))
// console.log(localStorage.getItem("deporteFav"))

// //sessionStorage
// sessionStorage.setItem("cancion", "Viva la vida")
// sessionStorage.setItem("banda", "Coldplay")

// console.log(sessionStorage.getItem("banda"))
// //dos lugares distintos de almacenamiento
// console.log(sessionStorage.getItem("comidaFav"))

//set un objeto o un array de objetos
// Si utilizamos objeto JSON
//para setear stringify
// localStorage.setItem("primerLibro", JSON.stringify(libro1))
// localStorage.setItem("misLibros", JSON.stringify(estanteria))
// // console.log(estanteria);

// //método transforme de texto plano a la notación nativa de JS
// //JSON.parse
// console.log(localStorage.getItem("primerLibro"))
// console.log(localStorage.getItem("misLibros"))

// console.log(JSON.parse(localStorage.getItem("primerLibro")))
// console.log(JSON.parse(localStorage.getItem("misLibros")))

//DARK MODE:
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")
let eliminarMode = document.getElementById("eliminarMode")
//captura la info
let modoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
console.log(modoOscuro)
//hacer un condicional que se pregunte por el valor de la clave modoOscuro y según el valor, ponga el sitio en oscuro o claro
if(modoOscuro == true){
    document.body.classList.add("darkMode")
}

botonDarkMode.addEventListener("click", ()=>{
    console.log("Btn oscuro funciona")
    //classList add
    document.body.classList.add("darkMode")
    //quiero guardar algo, uso setItem
    localStorage.setItem("modoOscuro", true)
})

botonLightMode.addEventListener("click", ()=>{
    console.log("Btn claro funciona")
    document.body.classList.remove("darkMode")
    localStorage.setItem("modoOscuro", false)
})
eliminarMode.addEventListener("click", ()=>{
    //remueve la clave y su valor, elimina
    localStorage.removeItem("modoOscuro")
})