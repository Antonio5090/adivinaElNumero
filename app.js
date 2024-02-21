//Obtener elementos del DOM(Document Object Model) en html para hacer una interfaz dinamica de forma manual
/* 
const titulo = document.querySelector("h1");
const parrafo = document.querySelector("p");
titulo.innerHTML = "Adivina el número secreto";
parrafo.innerHTML = "Indica un número del 1 al 10";
*/

let numeroSecreto = 0;
let numeroIntentos = 0;
let listaNumeroSorteados = [];
let numeroMaximo = 10;

//Asignar un evento a un elemento del DOM con funciones y evitar duplicidad (escalable)
function asignarTextoElemento(elemento, texto) {
    const elementoDOM = document.querySelector(elemento);
    elementoDOM.innerHTML = texto;
    //Buenas practicas, aunque no siempre la funcion retornara algo
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    if (numeroDeUsuario == numeroSecreto) {
        asignarTextoElemento("h1", `Adivinaste el número secreto en ${numeroIntentos} ${numeroIntentos > 1 ? "intentos" : "intento"}`);
        asignarTextoElemento("p","¡Felicidades!")
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento("p", "El número secreto es menor");
        } else {
            asignarTextoElemento("p", "El número secreto es mayor");
        }
        numeroIntentos++;
        limpiarCaja();
    }
    return;
}
function generarNumeroSecreto() {
    /* const numeroSecreto = Math.floor(Math.random() * 10) + 1;
    // Cuando la funcion se ejecute nos va a retornar un valor
    return numeroSecreto; */
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    //Si ya se sortearon todos los numeros, reinicia la lista
    if (listaNumeroSorteados.length === numeroMaximo) {
        listaNumeroSorteados = [];
    }
    //Si el numero generado ya existe en la lista de numeros sorteados, genera uno nuevo
    if (listaNumeroSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    }else {
        listaNumeroSorteados.push(numeroGenerado);
        return numeroGenerado;
    }

}
function limpiarCaja() {
    document.getElementById("valorUsuario").value = "";
    return;
    
}
function condiconesInciales() {
    numeroSecreto = generarNumeroSecreto();
    numeroIntentos = 1;
    document.getElementById("reiniciar").setAttribute("disabled", true);
    asignarTextoElemento("h1", "Adivina el número secreto");
    asignarTextoElemento("p", `Adivina un número del 1 al ${numeroMaximo}`);
    return;
}
function nuevoJuego() {
    //Limpiar caja
    limpiarCaja();
    //Generar nuevo numero secreto
    //Reiniciar intentos
    //Deshabilitar boton
    //Cambiar texto
    condiconesInciales();
    return;


}
//Llamar a la funcion para asignar texto a los elementos del DOM
/* asignarTextoElemento("h1", "Adivina el número secreto");
asignarTextoElemento("p", "Indica un número del 1 al 10"); */
condiconesInciales();