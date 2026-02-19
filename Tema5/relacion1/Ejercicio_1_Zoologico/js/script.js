let animales = document.getElementsByClassName("animal");

for (let animal of animales) {
  animal.style.backgroundColor = "lightyellow";
}

let botonResaltar = document.getElementById("resaltarAnimales");

botonResaltar.addEventListener("click", function () {
  for (let animal of animales) {
    animal.style.backgroundColor = "lightgreen";
    animal.style.fontSize = "20px";
  }
});
