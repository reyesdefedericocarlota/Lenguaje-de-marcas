const lista = document.getElementById("integrantes");

const nuevoAlbum = document.createElement("li");
nuevoAlbum.textContent = "Trompetista";
lista.appendChild(nuevoAlbum);

const items = lista.getElementsByTagName("li");
let itemEliminado = false;

for (let i = 0; i < items.length && !itemEliminado; i++) {
  if (items[i].textContent == "Batería") {
    lista.removeChild(items[i]);
    itemEliminado = true;
  }
}
