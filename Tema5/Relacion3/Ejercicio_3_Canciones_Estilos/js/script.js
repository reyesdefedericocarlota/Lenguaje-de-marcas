const canciones = document.getElementsByTagName("li");

for (const cancion of canciones) {
  cancion.style.color = "green";

  if (!cancion.textContent.includes(" 🎶")) {
    cancion.textContent += "  🎶";
  }
}
