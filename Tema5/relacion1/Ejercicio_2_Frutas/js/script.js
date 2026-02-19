const elementosLista = document.getElementsByTagName("li");

for (const elemento of elementosLista) {
  elemento.style.border = "2px solid orange";
}

let botonResaltar = document.getElementById("marcarFrutas");

botonResaltar.addEventListener("click", function () {
  for (const elemento of elementosLista) {
    elemento.style.backgroundColor = "lightpink";

    if (!elemento.textContent.includes("✅")) {
      elemento.textContent += " ✅";
    }
  }
});
