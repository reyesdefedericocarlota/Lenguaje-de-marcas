const inputs = document.getElementsByTagName("input");
const selectProducto = document.getElementById("producto");

for (const input of inputs) {
  input.addEventListener("focus", function () {
    this.style.outline = "2px solid green";
  });

  input.addEventListener("blur", function () {
    this.style.outline = "";
  });
}


selectProducto.addEventListener("change", function () {
  console.log("Producto seleccionado:", this.value);
});

document.getElementById("pedidoForm").addEventListener("submit", function(event) {
   // ⬅️ siempre

  let nombre = document.getElementById("nombre").value.trim();
  let email = document.getElementById("email").value.trim();
  let cantidad = Number(document.getElementById("cantidad").value);

  if (nombre === "" || email === "" || cantidad <= 0) {
    console.log("Error: Todos los campos son obligatorios y la cantidad debe ser mayor a 0");
    event.preventDefault();
  } else {
    console.log("Formulario enviado correctamente");
  }
});