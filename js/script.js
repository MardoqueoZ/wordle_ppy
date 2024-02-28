// variables globales
let diccionario = ["APPLE", "ANGEL", "BURRO", "PERRO", "FENIX"]
let intentos = 6;

// se elige una palabra al azar
let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

const btn = document.getElementById("guess-button");
const GRID = document.getElementById("grid");

// creamos un div dinamicamente
const ROW = document.createElement("div");
ROW.className = "row";

let msn = document.getElementById("guesses");
let error = document.getElementById("error");

// window es un objeto global en js que representa la ventana del navegador, load es el nombre del evento que se dispara cuando la ventana se ha cargado completamente, init el nombre de la funcion
window.addEventListener("load", init);

btn.addEventListener("click", intentar);

function init() {
    const INTENTO = leerIntento();
    console.log(INTENTO);
}

// funcion contar intentos
function intentar() {
    const intento = leerIntento();
    mostrarPalabra(intento);
    
    // si adivino la palabra termina el juego
    if (intento === palabra) {
        terminar("<h1>¡QUE CRACK, SOS UN CAMPEÓN! 😀</h1>");
        msn.style.color = "green";
        return;
    }
    
    
    
   // se descuentan los intentos
   intentos--;
    // si se acaban los intentos, termina el juego
    if (intentos === 0) {
        terminar("<h1>Naa bro, perdiste, tremendo manco! 😢</h1>");
        msn.style.color = "red";
    }
}

function mostrarPalabra(intento) {
    
    const row = document.createElement("div");
    row.className = "row";
    
    if (intento == '') {
        error.style.display = "block";
        error.innerHTML = "No ingresaste nada! 😡";
    } else if (intento.length > 5 || intento.length < 5) {
        error.style.display = "block";
        error.innerHTML = "Ingresa una palabra de 5 letras!";
    } else { 
        error.style.display = "none";
        for (let i = 0; i < palabra.length; i++) {
            const span = document.createElement("span");
            span.className = "letter";
            // primer intento, la letra es igual a la letra de la palabra
            if (intento[i] === palabra[i]) {
                // se agrega la letra al span
                span.innerHTML = intento[i];
                span.style.backgroundColor = "#79b851";
    
                // si la letra esta en la palabra
            } else if (palabra.includes(intento[i])) {
                span.innerHTML = intento[i];
                span.style.backgroundColor = "#f3c237";
    
                // si la letra no esta en la palabra
            } else {
                span.innerHTML = intento[i];
                span.style.backgroundColor = "#a4aec4";
            }
            // se agrega el span al row
            row.appendChild(span);
        }
        // se agrega el row al grid
        GRID.appendChild(row);
    }
    

}


// funcion de leer intentos
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    // convertir a mayusculas
    intento = intento.toUpperCase();
    return intento;
}

// funcion de terminar el juego
function terminar(mensaje) {
    const input = document.getElementById("guess-input");
    input.disabled = true;
    btn.textContent = "Reintentar";
    btn.addEventListener("click", function() {
        location.reload();
    });
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
}
