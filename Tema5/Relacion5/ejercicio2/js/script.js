const nombreProducto = document.getElementById("inputNombreProducto");
const precioProducto = document.getElementById("inputPrecioProducto");
const anadirProducto = document.getElementById("btnAniadirProducto");
const lista = document.getElementById("listaProductos");
const totalCompra = document.getElementById("totalCompraH2");
let sumaCompra = 0;

anadirProducto.addEventListener("click", function () {
  const nuevoElemento = document.createElement("li");
  const nombre = nombreProducto.value.trim();
  const precio = Number(precioProducto.value);

  if (nombre != "" && precio > 0) {
    nuevoElemento.textContent = nombre + " - " + precio + "€";
    lista.appendChild(nuevoElemento);
    sumaCompra += precio;
    totalCompra.textContent = sumaCompra + "€";
  }
});
