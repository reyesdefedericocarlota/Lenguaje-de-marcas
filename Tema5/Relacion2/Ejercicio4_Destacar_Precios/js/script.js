const precios = document.getElementsByClassName("precio");

for (let i = 0; i < precios.length; i++) {
  precios[i].style.fontWeight = "bold";

  if (precios[i].textContent >= 50) {
    precios[i].style.color = "red";
  }
}
