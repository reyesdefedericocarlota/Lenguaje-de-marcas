const contenedor = document.getElementById("contenedor");

const noticias = [
  "Descubren una nueva especie en la selva amazónica.",
  "Avances tecnológicos revolucionan la industria de la salud.",
  "El mercado financiero experimenta grandes cambios.",
];


for (let i = 0; i < noticias.length; i++) {
  const parrafo = document.createElement("p");
  parrafo.textContent = noticias[i];
  contenedor.appendChild(parrafo);
}
