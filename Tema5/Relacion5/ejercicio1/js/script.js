const lista = document.getElementById("lista");
const btnAniadir = document.getElementById("btnAniadir");
const btnBorrar = document.getElementById("btnBorrar");
const btnEditar = document.getElementById("btnEditar");

btnAniadir.addEventListener("click", function () {
  const nuevoElemento = document.createElement("li");

  const numero = lista.childElementCount;
  nuevoElemento.textContent = "Elemento " + (numero + 1);

  lista.appendChild(nuevoElemento);
});

btnBorrar.addEventListener("click", function () {
  lista.lastElementChild.remove();
});

btnEditar.addEventListener("click", function () {
  lista.lastElementChild.textContent = "Elemento editado";
});
