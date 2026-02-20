const frutas = document.getElementsByTagName("li");

for (const fruta of frutas) {
  fruta.style.border = "2px solid orange";
}

const botonResaltar = document.getElementById("marcarFrutas");

botonResaltar.addEventListener("click", function () {
  for (const fruta of frutas) {
    fruta.style.backgroundColor = "lightpink";

    if (!fruta.textContent.includes("✅")) {
      fruta.textContent += " ✅";
    }
  }
});
