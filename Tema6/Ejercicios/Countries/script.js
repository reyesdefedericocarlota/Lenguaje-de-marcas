async function obtenerPais(nombre) {
  const apiUrl = `https://restcountries.com/v3.1/name/${nombre}`;

  try {
    const respuesta = await fetch(apiUrl);

    if (!respuesta.ok) {
      throw new Error("No se encontró el país");
    }

    const datos = await respuesta.json();
    mostrarPais(datos[0]);
  } catch (error) {
    mostrarError("No se encontró el país o hubo un error");
  }
}

function mostrarPais(pais) {
  const contenedor = document.getElementById("resultado-nombre");

  // Convertimos los idiomas de objeto a array
  const idiomas = Object.values(pais.languages).join(", ");

  // Convertimos las monedas de objeto a array
  const monedas = Object.values(pais.currencies).map((moneda) => moneda.name) .join(", ");

  contenedor.innerHTML = `
      <img src="${pais.flags.png}" alt="bandera">
      <h2>${pais.name.common}</h2>
      <p><strong>Nombre oficial:</strong> ${pais.name.official}</p>
      <p><strong>Capital:</strong> ${pais.capital?.join(", ") || "No disponible"}</p>
      <p><strong>Región:</strong> ${pais.region}</p>
      <p><strong>Subregión:</strong> ${pais.subregion}</p>
      <p><strong>Población:</strong> ${pais.population}</p>
      <p><strong>Idiomas:</strong> ${idiomas}</p>
      <p><strong>Monedas:</strong> ${monedas}</p>
  `;
}

function mostrarError(mensaje) {
  const contenedor = document.getElementById("resultado-nombre");
  contenedor.innerHTML = `<p class="error">${mensaje}</p>`;
}

const form = document.getElementById("form-nombre");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const input = document.getElementById("input-nombre").value.trim();

  if (input) {
    obtenerPais(input);
  }
});
