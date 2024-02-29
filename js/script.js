// variables globales
let diccionario = ["APPLE", "ANGEL", "BURRO", "PERRO", "FENIX"];
let intentos = 6;
let palabra;

const btn = document.getElementById("guess-button");
const GRID = document.getElementById("grid");
const msn = document.getElementById("guesses");
const error = document.getElementById("error");

// al cargar la página, se selecciona una palabra
window.addEventListener("load", init);

// evento click del botón
btn.addEventListener("click", intentar);

// función de inicialización
function init() {
    traerPalabraApi();
    // Seleccionar una palabra al azar al iniciar la carga de la página
}

// función para intentar adivinar la palabra
function intentar() {
    error.style.display = "block";
    const intento = leerIntento();

    // mostrar la palabra intento
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

// función para mostrar la palabra
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
            if (intento[i] === palabra[i]) {
                span.innerHTML = intento[i];
                span.style.backgroundColor = "#79b851";
            } else if (palabra.includes(intento[i])) {
                span.innerHTML = intento[i];
                span.style.backgroundColor = "#f3c237";
            } else {
                span.innerHTML = intento[i];
                span.style.backgroundColor = "#a4aec4";
            }
            row.appendChild(span);
        }
        GRID.appendChild(row);
    }
}

// función para leer el intento
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    // convertir a mayúsculas
    intento = intento.toUpperCase();
    return intento;
}

// función para terminar el juego
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

// función para seleccionar una palabra al azar
function traerPalabraApi() {
    error.style.display = "none"
    const url = "https://random-word-api.herokuapp.com/word?length=5&lang=es";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            console.log(palabra);
        })
        .catch(error => {
            console.log(error);
            // En caso de error, obtener una palabra del diccionario local
            palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
        });
}
