const primerBoton = document.querySelector(".boton");
primerBoton.style.backgroundColor = "lightgreen";

const botonResaltar = document.getElementById("cambiarEstilo");
const todosLosBotones = document.querySelectorAll(".boton");

botonResaltar.addEventListener("click", function () {
  todosLosBotones.forEach((boton) => {
    boton.style.backgroundColor = "orange";
    boton.style.border = "2px dashed blue"
  });
});
