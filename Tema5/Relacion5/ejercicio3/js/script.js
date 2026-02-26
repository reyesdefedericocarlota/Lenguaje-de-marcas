const btnSumar = document.getElementById("btnSumar");
const btnRestar = document.getElementById("btnRestar");
const btnMultiplicar = document.getElementById("btnMultiplicar");
const btnDividir = document.getElementById("btnDividir");

const inputNumero1 = document.getElementById("numero1");
const inputNumero2 = document.getElementById("numero2");
const resultado = document.getElementById("resultado");

btnSumar.addEventListener("click", function () {
  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);

  resultado.textContent = numero1 + numero2;
});

btnRestar.addEventListener("click", function () {
  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);

  resultado.textContent = numero1 - numero2;
});

btnMultiplicar.addEventListener("click", function () {
  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);

  resultado.textContent = numero1 * numero2;
});

btnDividir.addEventListener("click", function () {
  const numero1 = Number(inputNumero1.value);
  const numero2 = Number(inputNumero2.value);

  resultado.textContent = numero1 / numero2;
});