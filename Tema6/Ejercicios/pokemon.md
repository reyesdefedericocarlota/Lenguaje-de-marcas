# Tutorial: Uso de `fetch` en JavaScript con la API de PokeAPI

En este tutorial aprenderás a usar `fetch` en JavaScript para obtener información sobre Pokémon desde la API pública de PokeAPI.

## 1. Creación del Proyecto

Crea una carpeta para el proyecto y dentro de ella, los siguientes archivos:

```
/proyecto-pokemon
  ├── index.html
  ├── script.js
  ├── styles.css
```

## 2. Estructura HTML

Crea un archivo `index.html` y añade el siguiente código:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PokeAPI Fetch</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Busca un Pokémon</h1>
    <form id="pokemon-form">
        <input type="text" id="pokemon-input" placeholder="Nombre o ID del Pokémon">
        <button type="submit">Buscar</button>
    </form>
    <div id="pokemon-info"></div>
    <script src="script.js"></script>
</body>
</html>
```

## 3. Estilos CSS

Crea un archivo `styles.css` con este contenido:

```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
}

#pokemon-info img {
    width: 150px;
}
```

## 4. Código JavaScript

Añade el siguiente código en `script.js`:

```javascript
// script.js

// URL base de la API
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Función para obtener datos de un Pokémon por su nombre o ID
async function obtenerPokemon(nombreOId) {
    try {
        const respuesta = await fetch(`${apiUrl}${nombreOId}`);
        if (!respuesta.ok) {
            throw new Error("No se encontró el Pokémon");
        }
        const datos = await respuesta.json();
        mostrarPokemon(datos);
    } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
    }
}

// Función para mostrar los datos del Pokémon en la página
function mostrarPokemon(datos) {
    const contenedor = document.getElementById("pokemon-info");
    contenedor.innerHTML = `
        <h2>${datos.name.toUpperCase()}</h2>
        <img src="${datos.sprites.front_default}" alt="Imagen de ${datos.name}">
        <p><strong>ID:</strong> ${datos.id}</p>
        <p><strong>Altura:</strong> ${datos.height / 10} m</p>
        <p><strong>Peso:</strong> ${datos.weight / 10} kg</p>
        <p><strong>Tipos:</strong> ${datos.types.map(tipo => tipo.type.name).join(", ")}</p>
    `;
}

// Manejo del formulario de búsqueda
document.getElementById("pokemon-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("pokemon-input").value.trim().toLowerCase();
    if (input) {
        obtenerPokemon(input);
    }
});
```


## 5. Prueba el Proyecto

1. Abre `index.html` en un navegador.
2. Escribe el nombre o ID de un Pokémon y presiona "Buscar".
3. Verás los datos del Pokémon en pantalla.
4. Muestra los stats de cada pokemon junto a su base_stats

