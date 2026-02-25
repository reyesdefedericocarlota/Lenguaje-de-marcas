// Ejercicio 1
const boton = document.getElementById("imgClick");
boton.addEventListener("click", function () {
  alert("¡Siente la Energía de Burn!");
});

// Ejercicio 2
const imagen = document.getElementById("imgHover");

// Guardamos la imagen original
const fotoOriginal = imagen.src;

imagen.addEventListener("mouseenter", function () {
  imagen.src = "https://picsum.photos/200?random=99";
});

imagen.addEventListener("mouseleave", function () {
  imagen.src = fotoOriginal;
});

// Ejercicio 3
const tecla = document.getElementById("campoTexto");

tecla.addEventListener("keydown", function (event) {
  console.log("Tecla presionada: " + event.key);
});

// Ejercicio 4
const formulario = document.getElementById("formulario");
const inputNombre = document.getElementById("nombre");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener el valor del input
  const nombre = inputNombre.value;

  // Mostrar mensaje personalizado
  resultado.textContent = "Energía recargada, " + nombre + "!";
});

// Ejercicio 5
const input = document.getElementById("codigo");
const parrafo = document.getElementById("mensaje");

input.addEventListener("focus", function () {
  this.style.outline = "none";
  this.style.border = "2px solid green";
  parrafo.textContent = "Introduce tu código de energía";
});

input.addEventListener("blur", function () {
  this.style.border = "";
  parrafo.textContent = "";
});
