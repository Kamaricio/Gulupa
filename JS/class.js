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