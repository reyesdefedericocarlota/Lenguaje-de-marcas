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
    mostrarError("No se encontró el país", "resultado-nombre");
  }
}

function mostrarPais(pais) {
  const contenedor = document.getElementById("resultado-nombre");

  // Convertimos los idiomas de objeto a array
  const idiomas = Object.values(pais.languages).join(", ");

  // Convertimos las monedas de objeto a array
  const monedas = Object.values(pais.currencies)
    .map((moneda) => moneda.name)
    .join(", ");

  contenedor.innerHTML = `
      <img src="${pais.flags.png}" alt="bandera">
      <h2>${pais.name.common}</h2>
      <p><strong>Nombre oficial:</strong> ${pais.name.official}</p>
      <p><strong>Capital:</strong> ${pais.capital?.join(", ") || "No existe"}</p>
      <p><strong>Región:</strong> ${pais.region}</p>
      <p><strong>Subregión:</strong> ${pais.subregion}</p>
      <p><strong>Población:</strong> ${pais.population}</p>
      <p><strong>Idiomas:</strong> ${idiomas}</p>
      <p><strong>Monedas:</strong> ${monedas}</p>
  `;
}

function mostrarError(mensaje, id) {
  const contenedor = document.getElementById(id);

  if (contenedor) {
    contenedor.innerHTML = `<p class="error">${mensaje}</p>`;
  }
}
const form = document.getElementById("form-nombre");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const input = document.getElementById("input-nombre").value.trim();

  if (input) {
    obtenerPais(input);
  }
});

async function obtenerPaises(region) {
  const apiUrl = `https://restcountries.com/v3.1/region/${region}`;

  try {
    const respuesta = await fetch(apiUrl);

    if (!respuesta.ok) {
      throw new Error("No se encontraron países");
    }

    const datos = await respuesta.json();
    mostrarPaises(datos);
  } catch (error) {
    mostrarError(
      "No se encontraron paises o hubo un error",
      "resultado-region",
    );
  }
}

function mostrarPaises(paises) {
  const contenedor = document.getElementById("resultado-region");

  contenedor.innerHTML = "";

  for (const pais of paises) {
    contenedor.innerHTML += `
      <div class="tarjeta">
        <img src="${pais.flags.png}" alt="bandera">
        <h3>${pais.name.common}</h3>
        <p><strong>Capital:</strong> ${pais.capital?.[0] || "No disponible"}</p>
        <p><strong>Población:</strong> ${pais.population}</p>
      </div>
    `;
  }
}

const botones = document.querySelectorAll(".btn-region");

for (const boton of botones) {
  boton.addEventListener("click", () => {
    const region = boton.dataset.region;
    obtenerPaises(region);
  });
}

const formCapital = document.getElementById("form-capital");

formCapital.addEventListener("submit", function (event) {
  event.preventDefault();

  const input = document.getElementById("input-capital").value.trim();

  if (input) {
    obtenerCapital(input);
  }
});

async function obtenerCapital(capital) {
  const apiUrl = `https://restcountries.com/v3.1/capital/${capital}`;

  try {
    const respuesta = await fetch(apiUrl);

    if (!respuesta.ok) {
      throw new Error("No se encontró la capital");
    }

    const datos = await respuesta.json();
    mostrarCapital(datos[0]);
  } catch (error) {
    mostrarError(
      "No se encontró la capital o hubo un error",
      "resultado-capital",
    );
  }
}

function mostrarCapital(capital) {
  const contenedor = document.getElementById("resultado-capital");

  contenedor.innerHTML = `
      <img src="${capital.flags.png}" alt="bandera">
      <h2>${capital.name.common}</h2>
      <p><strong>Nombre oficial:</strong> ${capital.name.official}</p>
      <p><strong>Capital:</strong> ${capital.capital?.join(", ") || "No existe"}</p>
      <p><strong>Región:</strong> ${capital.region}</p>
      <a href="${capital.maps.googleMaps}" target="_blank">Ver mapa</a>
      `;
}

const formCodigo = document.getElementById("form-codigo");

formCodigo.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("input-codigo").value.trim();

  if (input) {
    obtenerPaisCodigo(input);
  }
});

async function obtenerPaisCodigo(code) {
  const apiUrl = `https://restcountries.com/v3.1/alpha/${code}`;

  try {
    const respuesta = await fetch(apiUrl);

    if (!respuesta.ok) {
      throw new Error("No se encontró ningún país con ese código");
    }

    const datos = await respuesta.json();
    mostrarPaisCodigo(datos[0]);
  } catch (error) {
    mostrarError(
      "No se encontró ningún país con ese código",
      "resultado-codigo",
    );
  }
}

function mostrarPaisCodigo(codigo) {
  const contenedor = document.getElementById("resultado-codigo");

  contenedor.innerHTML = `
      <img src="${codigo.flags.png}" alt="bandera">
      <h2>${codigo.name.common}</h2>
      <p><strong>Código cca2:</strong> ${codigo.cca2}</p>
      <p><strong>Código cca3:</strong> ${codigo.cca3}</p>
      <p><strong>Continente:</strong> ${codigo.continents[0]}</p>
      <p><strong>Zona horaria:</strong> ${codigo.timezones[0]}</p>
      `;
}
